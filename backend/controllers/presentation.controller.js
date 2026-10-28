const Presentation = require('../models/Presentation');
const Chapter = require('../models/Chapter');
const { canAccessChapter } = require('../services/progress.service');
const { createAuditLog } = require('../services/audit.service');

/**
 * Get presentation by chapter ID
 */
const getPresentationByChapter = async (req, res, next) => {
  try {
    const { chapterId } = req.params;

    const accessCheck = await canAccessChapter(req.user, chapterId);
    if (!accessCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: accessCheck.reason || 'Chapter is locked.',
        code: 'CHAPTER_LOCKED'
      });
    }

    const chapter = await Chapter.findById(chapterId)
      .populate('courseId', 'courseCode courseTitle classification');

    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    const presentation = await Presentation.findOne({ chapterId });
    if (!presentation) {
      return res.status(404).json({ success: false, message: 'Presentation not found for this chapter' });
    }

    // Sort slides by slideNumber
    presentation.slides.sort((a, b) => a.slideNumber - b.slideNumber);

    res.json({
      success: true,
      chapter: {
        id: chapter._id,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        course: chapter.courseId
      },
      presentation
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update presentation (Faculty only)
 */
const updatePresentation = async (req, res, next) => {
  try {
    const { chapterId } = req.params;
    const { title, slides, publicationStatus } = req.body;

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ success: false, message: 'Chapter not found' });
    }

    let presentation = await Presentation.findOne({ chapterId });
    const isNew = !presentation;

    if (isNew) {
      presentation = new Presentation({
        chapterId,
        title: title || `${chapter.title} Presentation`,
        slides: slides || [],
        version: 1,
        publicationStatus: publicationStatus || 'published',
        createdBy: req.user._id,
        updatedBy: req.user._id
      });
    } else {
      if (title !== undefined) presentation.title = title;
      if (slides !== undefined) {
        // Ensure continuous slideNumbers
        presentation.slides = slides.map((s, idx) => ({
          ...s,
          slideNumber: idx + 1
        }));
      }
      if (publicationStatus !== undefined) presentation.publicationStatus = publicationStatus;
      presentation.version += 1;
      presentation.updatedBy = req.user._id;
    }

    await presentation.save();

    await createAuditLog({
      actorUserId: req.user._id,
      action: isNew ? 'PRESENTATION_CREATED' : 'PRESENTATION_UPDATED',
      entityType: 'Presentation',
      entityId: presentation._id,
      details: {
        chapterId,
        chapterNumber: chapter.chapterNumber,
        slideCount: presentation.slides.length,
        version: presentation.version
      },
      req
    });

    res.json({
      success: true,
      message: 'Presentation updated successfully',
      presentation
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPresentationByChapter,
  updatePresentation
};

