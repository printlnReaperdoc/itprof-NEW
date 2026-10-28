import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { chaptersApi, lessonsApi, presentationsApi, quizzesApi, gradebookApi } from '../api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusBadge from '../components/common/StatusBadge';
import PresentationViewer from '../components/presentation/PresentationViewer';
import PresentationEditorModal from '../components/presentation/PresentationEditorModal';
import LessonEditorModal from '../components/lesson/LessonEditorModal';
import QuizImportModal from '../components/quiz/QuizImportModal';
import QuizReviewModal from '../components/quiz/QuizReviewModal';
import TopicGradebookTable from '../components/gradebook/TopicGradebookTable';
import Modal from '../components/common/Modal';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  PlayCircle,
  FileSpreadsheet,
  Edit,
  Upload,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Clock
} from 'lucide-react';

const ChapterView = () => {
  const { chapterId } = useParams();
  const { user, isFaculty } = useAuth();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [presentation, setPresentation] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState(null);
  const [topicGradebook, setTopicGradebook] = useState(null);

  const [activeTab, setActiveTab] = useState('presentation'); // 'presentation', 'lesson', 'quiz', 'gradebook'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [isPresEditorOpen, setIsPresEditorOpen] = useState(false);
  const [isLessonEditorOpen, setIsLessonEditorOpen] = useState(false);
  const [isQuizImportOpen, setIsQuizImportOpen] = useState(false);
  const [reviewAttemptId, setReviewAttemptId] = useState(null);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overrideData, setOverrideData] = useState({ studentId: '', status: 'available', reason: '' });

  const loadChapterData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Chapter details & access verification
      const chRes = await chaptersApi.getDetails(chapterId);
      setChapter(chRes.chapter);
      setProgress(chRes.progress);
      setQuiz(chRes.quiz);

      // 2. Load presentation
      try {
        const presRes = await presentationsApi.getByChapter(chapterId);
        setPresentation(presRes.presentation);
      } catch (e) {
        console.warn('No presentation found for chapter:', e.message);
      }

      // 3. Load lesson
      try {
        const lessonRes = await lessonsApi.getByChapter(chapterId);
        setLesson(lessonRes.lesson);
      } catch (e) {
        console.warn('No lesson found for chapter:', e.message);
      }

      // 4. If faculty, load topic gradebook
      if (isFaculty) {
        try {
          const gbRes = await gradebookApi.getTopic(chapterId);
          setTopicGradebook(gbRes);
        } catch (e) {
          console.warn('Failed to load topic gradebook:', e.message);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load chapter content or chapter is locked.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadChapterData();
  }, [chapterId]);

  const handleStartQuiz = () => {
    navigate(`/quiz/${chapterId}`);
  };

  const handleOverrideSubmit = async (e) => {
    e.preventDefault();
    try {
      await chaptersApi.overrideProgress(chapterId, overrideData);
      alert('Administrative progress override applied successfully.');
      setIsOverrideModalOpen(false);
      loadChapterData();
    } catch (err) {
      alert('Override error: ' + err.message);
    }
  };

  if (loading) return <LoadingSpinner message="Loading chapter lesson & interactive slides..." />;

  if (error) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2.5rem' }}>
          <AlertTriangle size={48} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Access Restricted</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Course
          </button>
        </div>
      </div>
    );
  }

  const isPassed = progress?.status === 'passed';
  const isDM = chapter?.course?.courseCode?.includes('411');
  const accentColor = isDM ? 'var(--dm-accent)' : 'var(--cloud-accent)';

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Breadcrumb & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <Link
          to={`/courses/${chapter?.course?._id || chapter?.course?.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: accentColor,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Back to {chapter?.course?.courseCode} Course
        </Link>

        {isFaculty && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsOverrideModalOpen(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              <ShieldAlert size={14} /> Progress Override
            </button>
            <button
              onClick={() => setIsPresEditorOpen(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              <Edit size={14} /> Edit Slides
            </button>
            <button
              onClick={() => setIsLessonEditorOpen(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              <Edit size={14} /> Edit Lesson
            </button>
            <button
              onClick={() => setIsQuizImportOpen(true)}
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              <Upload size={14} /> Manage Quiz
            </button>
          </div>
        )}
      </div>

      {/* Chapter Title Header */}
      <div
        className="card"
        style={{
          marginBottom: '1.5rem',
          padding: '1.75rem 2rem',
          borderTop: `3px solid ${accentColor}`,
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '9999px',
                  backgroundColor: isDM ? 'rgba(192, 132, 252, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                  color: accentColor,
                  border: `1px solid ${isDM ? 'rgba(192, 132, 252, 0.3)' : 'rgba(56, 189, 248, 0.3)'}`
                }}
              >
                Module {chapter?.module?.moduleNumber}: {chapter?.module?.title}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                {chapter?.course?.courseTitle} ({chapter?.course?.courseCode})
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Chapter {chapter?.chapterNumber}: {chapter?.title}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '0.35rem', maxWidth: '800px', lineHeight: 1.6 }}>
              {chapter?.description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ textAlign: 'right' }}>
              <StatusBadge status={progress?.status || 'available'} />
              {progress?.highestScore !== undefined && progress?.highestScore !== null && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', fontFamily: 'var(--font-mono)' }}>
                  Highest: <strong style={{ color: isPassed ? 'var(--success)' : 'var(--danger)' }}>{progress.highestScore}/20</strong> ({progress.highestScorePercentage}%)
                </div>
              )}
            </div>

            <button
              onClick={handleStartQuiz}
              className="btn btn-primary"
              style={{
                padding: '0.65rem 1.35rem',
                fontSize: '0.9rem',
                background: isDM
                  ? 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)'
                  : 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                boxShadow: isDM
                  ? '0 0 16px rgba(192, 132, 252, 0.35)'
                  : '0 0 16px rgba(56, 189, 248, 0.35)'
              }}
            >
              <PlayCircle size={18} /> {isPassed ? 'Retake Quiz' : 'Start Chapter Quiz'}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.6rem',
            borderTop: '1px solid var(--border-color)',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveTab('presentation')}
            className={`btn ${activeTab === 'presentation' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              fontSize: '0.85rem',
              background: activeTab === 'presentation' ? (isDM ? 'var(--dm-accent)' : 'var(--cloud-accent)') : 'transparent',
              color: activeTab === 'presentation' ? '#070a13' : 'var(--text-main)',
              fontWeight: 600
            }}
          >
            <Sparkles size={16} /> Interactive Slides ({presentation?.slides?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab('lesson')}
            className={`btn ${activeTab === 'lesson' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              fontSize: '0.85rem',
              background: activeTab === 'lesson' ? (isDM ? 'var(--dm-accent)' : 'var(--cloud-accent)') : 'transparent',
              color: activeTab === 'lesson' ? '#070a13' : 'var(--text-main)',
              fontWeight: 600
            }}
          >
            <BookOpen size={16} /> Lesson Content & Notes
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`btn ${activeTab === 'quiz' ? 'btn-primary' : 'btn-outline'}`}
            style={{
              fontSize: '0.85rem',
              background: activeTab === 'quiz' ? (isDM ? 'var(--dm-accent)' : 'var(--cloud-accent)') : 'transparent',
              color: activeTab === 'quiz' ? '#070a13' : 'var(--text-main)',
              fontWeight: 600
            }}
          >
            <HelpCircle size={16} /> Assessment & Quiz (20 Qs)
          </button>
          {isFaculty && (
            <button
              onClick={() => setActiveTab('gradebook')}
              className={`btn ${activeTab === 'gradebook' ? 'btn-primary' : 'btn-outline'}`}
              style={{
                fontSize: '0.85rem',
                background: activeTab === 'gradebook' ? (isDM ? 'var(--dm-accent)' : 'var(--cloud-accent)') : 'transparent',
                color: activeTab === 'gradebook' ? '#070a13' : 'var(--text-main)',
                fontWeight: 600
              }}
            >
              <FileSpreadsheet size={16} /> Topic Gradebook
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: INTERACTIVE PRESENTATION */}
      {activeTab === 'presentation' && (
        <div style={{ marginBottom: '2.5rem' }}>
          <PresentationViewer
            presentation={presentation}
            onEdit={() => setIsPresEditorOpen(true)}
            isFaculty={isFaculty}
          />
        </div>
      )}

      {/* TAB 2: DETAILED LESSON CONTENT */}
      {activeTab === 'lesson' && lesson && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
          {/* Main Content */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>
              Lesson Overview & Objectives
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
              {lesson.overview}
            </p>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: accentColor, marginBottom: '0.75rem' }}>
              Learning Objectives
            </h3>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {lesson.learningObjectives?.map((obj, i) => (
                <li key={i} style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                  {obj}
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', borderTop: '1px solid var(--border-color)', paddingTop: '1.75rem', marginBottom: '1.25rem' }}>
              Detailed Instructional Content
            </h3>
            <div style={{ fontSize: '0.96rem', lineHeight: 1.85, color: '#e2e8f0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {lesson.content}
            </div>
          </div>

          {/* Key Concepts Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: accentColor, marginBottom: '1rem' }}>
                  Key Terms & Definitions
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {lesson.keyConcepts.map((kc, i) => (
                    <div key={i} style={{ borderBottom: i < lesson.keyConcepts.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                        {kc.term}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                        {kc.definition}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {lesson.studyGuide && lesson.studyGuide.length > 0 && (
              <div
                className="card"
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  borderColor: 'rgba(16, 185, 129, 0.25)'
                }}
              >
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#34d399', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} /> Review Checklist
                </h4>
                <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.85rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: 1.5 }}>
                  {lesson.studyGuide.map((sg, i) => (
                    <li key={i}>{sg}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ & ASSESSMENT INFO */}
      {activeTab === 'quiz' && (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: isPassed ? 'rgba(16, 185, 129, 0.15)' : (isDM ? 'rgba(192, 132, 252, 0.15)' : 'rgba(56, 189, 248, 0.15)'),
              color: isPassed ? 'var(--success)' : accentColor,
              border: `1px solid ${isPassed ? 'rgba(16, 185, 129, 0.3)' : (isDM ? 'rgba(192, 132, 252, 0.3)' : 'rgba(56, 189, 248, 0.3)')}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <HelpCircle size={34} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {quiz?.title || `Chapter ${chapter?.chapterNumber} Assessment`}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Curriculum-aligned multiple-choice evaluation for Chapter {chapter?.chapterNumber}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Questions</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>{quiz?.questionCount || 20}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Time Limit</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                {Math.floor((quiz?.timeLimitSeconds || 600) / 60)} Mins
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Pass Threshold</div>
              <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>
                {quiz?.passingScore || 15} / 20 (75%)
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              marginBottom: '2rem',
              fontSize: '0.85rem',
              color: '#fde68a'
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} /> Assessment Rules & Sequential Progression:
            </div>
            <ul style={{ paddingLeft: '1.25rem', margin: 0, lineHeight: 1.6, color: '#fef3c7' }}>
              <li>The 10-minute server timer begins immediately once you initiate the assessment.</li>
              <li>A score of at least 15/20 (75%) is required to unlock Chapter {Number(chapter?.chapterNumber) + 1}.</li>
              <li>You may retake failed attempts without penalty. Once passed, your passing status remains permanently recorded.</li>
            </ul>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleStartQuiz}
              className="btn btn-primary"
              style={{
                padding: '0.85rem 2.5rem',
                fontSize: '1rem',
                background: isDM
                  ? 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)'
                  : 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                boxShadow: isDM
                  ? '0 0 20px rgba(192, 132, 252, 0.4)'
                  : '0 0 20px rgba(56, 189, 248, 0.4)'
              }}
            >
              <PlayCircle size={20} /> {isPassed ? 'Retake Quiz' : 'Start Timed Assessment'}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: FACULTY TOPIC GRADEBOOK */}
      {activeTab === 'gradebook' && isFaculty && topicGradebook && (
        <div className="card" style={{ padding: '1.75rem' }}>
          <TopicGradebookTable
            records={topicGradebook.records}
            chapter={chapter}
            onReviewStudent={(sId) => console.log(sId)}
          />
        </div>
      )}

      {/* MODALS */}
      <PresentationEditorModal
        isOpen={isPresEditorOpen}
        onClose={() => setIsPresEditorOpen(false)}
        presentation={presentation}
        chapterId={chapterId}
        onSaved={loadChapterData}
      />

      <LessonEditorModal
        isOpen={isLessonEditorOpen}
        onClose={() => setIsLessonEditorOpen(false)}
        lesson={lesson}
        chapterId={chapterId}
        onSaved={loadChapterData}
      />

      <QuizImportModal
        isOpen={isQuizImportOpen}
        onClose={() => setIsQuizImportOpen(false)}
        chapterId={chapterId}
        onImported={loadChapterData}
      />

      {/* Administrative Progress Override Modal */}
      <Modal
        isOpen={isOverrideModalOpen}
        onClose={() => setIsOverrideModalOpen(false)}
        title="Administrative Progress Override"
      >
        <form onSubmit={handleOverrideSubmit}>
          <div className="form-group">
            <label className="form-label">Student Username or ID</label>
            <input
              type="text"
              className="form-input"
              value={overrideData.studentId}
              onChange={(e) => setOverrideData({ ...overrideData, studentId: e.target.value })}
              placeholder="e.g. 64a8c1f9... or student username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Progress Status</label>
            <select
              className="form-select"
              value={overrideData.status}
              onChange={(e) => setOverrideData({ ...overrideData, status: e.target.value })}
            >
              <option value="available">Available (Unlocked)</option>
              <option value="passed">Passed (Override to Complete)</option>
              <option value="locked">Locked</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Mandatory Administrative Reason (Audit Logged)</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={overrideData.reason}
              onChange={(e) => setOverrideData({ ...overrideData, reason: e.target.value })}
              placeholder="State the institutional justification for manually overriding student progression..."
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={() => setIsOverrideModalOpen(false)} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-danger">
              Apply Override
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ChapterView;

