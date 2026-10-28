const Chapter = require('../models/Chapter');
const ChapterProgress = require('../models/ChapterProgress');
const Course = require('../models/Course');
const { createAuditLog } = require('./audit.service');

/**
 * Ensure ChapterProgress records exist for a student in a course
 */
const initializeStudentCourseProgress = async (studentId, courseId, session = null) => {
  const chapters = await Chapter.find({ courseId, isPublished: true })
    .sort({ chapterNumber: 1 })
    .session(session);

  if (!chapters || chapters.length === 0) return [];

  const existingProgress = await ChapterProgress.find({
    studentId,
    courseId
  }).session(session);

  const progressMap = new Map();
  existingProgress.forEach(p => progressMap.set(p.chapterId.toString(), p));

  const progressRecords = [];

  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    const existing = progressMap.get(ch.id.toString());

    if (!existing) {
      // Chapter 1 is available by default; others locked unless preceding chapter is passed
      let defaultStatus = 'locked';
      if (ch.chapterNumber === 1) {
        defaultStatus = 'available';
      } else {
        // Check if previous chapter was passed
        const prevChapter = chapters[i - 1];
        const prevProgress = prevChapter ? progressMap.get(prevChapter.id.toString()) : null;
        if (prevProgress && prevProgress.status === 'passed') {
          defaultStatus = 'available';
        }
      }

      const newProg = new ChapterProgress({
        studentId,
        courseId,
        chapterId: ch._id,
        status: defaultStatus
      });

      if (session) {
        await newProg.save({ session });
      } else {
        await newProg.save();
      }
      progressRecords.push(newProg);
      progressMap.set(ch.id.toString(), newProg);
    } else {
      progressRecords.push(existing);
    }
  }

  return progressRecords;
};

/**
 * Check if a student is allowed to access a chapter
 */
const canAccessChapter = async (user, chapterId) => {
  if (['faculty', 'admin'].includes(user.role)) {
    return { allowed: true, reason: 'Faculty / Admin privilege' };
  }

  const chapter = await Chapter.findById(chapterId);
  if (!chapter) {
    return { allowed: false, reason: 'Chapter not found' };
  }

  // Chapter 1 is always accessible if published
  if (chapter.chapterNumber === 1 && chapter.isPublished) {
    return { allowed: true, chapter };
  }

  // Check student's progress record
  const progress = await ChapterProgress.findOne({
    studentId: user._id,
    chapterId
  });

  if (!progress) {
    // If progress hasn't been initialized yet, initialize it
    await initializeStudentCourseProgress(user._id, chapter.courseId);
    const refreshed = await ChapterProgress.findOne({
      studentId: user._id,
      chapterId
    });
    if (refreshed && ['available', 'in_progress', 'passed', 'failed'].includes(refreshed.status)) {
      return { allowed: true, chapter, progress: refreshed };
    }
    return { allowed: false, reason: 'Chapter is locked. Pass previous chapters first.', chapter };
  }

  if (progress.status === 'locked') {
    return { allowed: false, reason: 'Chapter is locked. Pass previous chapters first.', chapter, progress };
  }

  return { allowed: true, chapter, progress };
};

/**
 * Update chapter progress after a quiz attempt and unlock next chapter if passed
 */
const handleQuizAttemptResult = async ({
  studentId,
  courseId,
  chapterId,
  score, // e.g. 17 out of 20
  scorePercentage, // 85%
  isPassed, // >= 15
  session = null,
  req = null
}) => {
  let progress = await ChapterProgress.findOne({
    studentId,
    chapterId
  }).session(session);

  if (!progress) {
    progress = new ChapterProgress({
      studentId,
      courseId,
      chapterId,
      status: isPassed ? 'passed' : 'failed',
      passedAt: isPassed ? new Date() : null,
      highestScore: score,
      highestScorePercentage: scorePercentage,
      attemptsCount: 1,
      latestAttemptAt: new Date()
    });
  } else {
    progress.attemptsCount += 1;
    progress.latestAttemptAt = new Date();

    if (score > progress.highestScore) {
      progress.highestScore = score;
      progress.highestScorePercentage = scorePercentage;
    }

    if (isPassed) {
      // Once passed, status remains passed permanently
      progress.status = 'passed';
      if (!progress.passedAt) {
        progress.passedAt = new Date();
      }
    } else {
      // If student previously passed, keep 'passed'
      if (progress.status !== 'passed') {
        progress.status = 'failed';
      }
    }
  }

  if (session) {
    await progress.save({ session });
  } else {
    await progress.save();
  }

  // If passed, unlock Chapter N+1 in the SAME course
  let nextChapterUnlocked = null;
  if (isPassed) {
    const currentChapter = await Chapter.findById(chapterId).session(session);
    if (currentChapter) {
      const nextChapter = await Chapter.findOne({
        courseId: currentChapter.courseId,
        chapterNumber: currentChapter.chapterNumber + 1
      }).session(session);

      if (nextChapter) {
        let nextProg = await ChapterProgress.findOne({
          studentId,
          chapterId: nextChapter._id
        }).session(session);

        if (!nextProg) {
          nextProg = new ChapterProgress({
            studentId,
            courseId: currentChapter.courseId,
            chapterId: nextChapter._id,
            status: 'available'
          });
          if (session) {
            await nextProg.save({ session });
          } else {
            await nextProg.save();
          }
          nextChapterUnlocked = nextChapter;
        } else if (nextProg.status === 'locked') {
          nextProg.status = 'available';
          if (session) {
            await nextProg.save({ session });
          } else {
            await nextProg.save();
          }
          nextChapterUnlocked = nextChapter;
        }

        if (nextChapterUnlocked) {
          await createAuditLog({
            actorUserId: studentId,
            action: 'CHAPTER_UNLOCKED',
            entityType: 'Chapter',
            entityId: nextChapter._id,
            details: {
              courseId: currentChapter.courseId,
              chapterNumber: nextChapter.chapterNumber,
              title: nextChapter.title,
              triggeredByPassingChapter: currentChapter.chapterNumber
            },
            req,
            session
          });
        }
      }
    }
  }

  return {
    progress,
    nextChapterUnlocked
  };
};

module.exports = {
  initializeStudentCourseProgress,
  canAccessChapter,
  handleQuizAttemptResult
};

