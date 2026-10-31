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
import ChapterSummaryModal from '../components/chapter/ChapterSummaryModal';
import Modal from '../components/common/Modal';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  PlayCircle,
  FileSpreadsheet,
  FileText,
  Edit,
  Upload,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Clock,
  FolderOpen,
  FileDown,
  Eye,
  Cloud,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const ChapterView = () => {
  const { chapterId } = useParams();
  const { user, isFaculty } = useAuth();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [lessonFiles, setLessonFiles] = useState([]);
  const [presentation, setPresentation] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [progress, setProgress] = useState(null);
  const [topicGradebook, setTopicGradebook] = useState(null);

  const [activeTab, setActiveTab] = useState('presentation'); // 'presentation', 'lesson', 'quiz', 'gradebook'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals state
  const [isChapterSummaryOpen, setIsChapterSummaryOpen] = useState(false);
  const [isPresEditorOpen, setIsPresEditorOpen] = useState(false);
  const [isLessonEditorOpen, setIsLessonEditorOpen] = useState(false);
  const [isQuizImportOpen, setIsQuizImportOpen] = useState(false);
  const [reviewAttemptId, setReviewAttemptId] = useState(null);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [overrideData, setOverrideData] = useState({ studentId: '', status: 'available', reason: '' });
  const [overrideError, setOverrideError] = useState(null);
  const [overrideSuccess, setOverrideSuccess] = useState(null);
  const [copiedCitationIndex, setCopiedCitationIndex] = useState(null);

  const handleCopyCitation = (text, idx) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedCitationIndex(idx);
      setTimeout(() => setCopiedCitationIndex(null), 2500);
    }
  };

  const loadChapterData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Chapter details & access verification
      const chRes = await chaptersApi.getDetails(chapterId);
      setChapter(chRes.chapter);
      setProgress(chRes.progress);
      setQuiz(chRes.quiz);
      if (chRes.lessonFiles) {
        setLessonFiles(chRes.lessonFiles);
      }

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
        if (lessonRes.files) {
          setLessonFiles(lessonRes.files);
        }
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
    setOverrideError(null);
    setOverrideSuccess(null);

    if (!overrideData.studentId.trim()) {
      setOverrideError('Student username or ID is required.');
      return;
    }
    if (!overrideData.reason.trim()) {
      setOverrideError('Administrative justification reason is mandatory for compliance audit logging.');
      return;
    }

    try {
      await chaptersApi.overrideProgress(chapterId, overrideData);
      setOverrideSuccess('Administrative progress override applied successfully.');
      setTimeout(() => {
        setIsOverrideModalOpen(false);
        setOverrideSuccess(null);
        setOverrideError(null);
        loadChapterData();
      }, 1200);
    } catch (err) {
      setOverrideError(err.message || 'Failed to apply override.');
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
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}
              title="Manage lesson syllabus, learning objectives, and upload chapter PDF and PPT slide decks"
            >
              <Upload size={14} /> Manage Lesson & Materials
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
        className="card animate-fade-in"
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

          {isFaculty ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setIsChapterSummaryOpen(true)}
                className="btn btn-primary"
                style={{
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.88rem',
                  background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  boxShadow: '0 0 16px rgba(56, 189, 248, 0.35)'
                }}
                title="Preview and export full chapter documents dossier with sortable roster"
              >
                <FileText size={16} /> Chapter Summary & Dossier
              </button>

              <button
                onClick={() => setIsQuizImportOpen(true)}
                className="btn btn-outline"
                style={{ padding: '0.65rem 1.15rem', fontSize: '0.88rem' }}
                title="Import or replace chapter assessment questions"
              >
                <Upload size={16} /> Import Quiz
              </button>
            </div>
          ) : (
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
          )}
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
            <BookOpen size={16} /> Lesson & Materials {lessonFiles?.length > 0 ? `(${lessonFiles.length} files)` : ''}
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
          {lessonFiles && lessonFiles.length > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 1.25rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: '#e0f2fe' }}>
                <FolderOpen size={17} color="#38bdf8" />
                <span>
                  <strong>Instructor Lecture Materials:</strong> {lessonFiles.length} downloadable PowerPoint deck(s) and PDF(s)
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {lessonFiles.map((f) => {
                  const fileId = f._id || f.id;
                  const ext = f.originalFilename?.substring(f.originalFilename.lastIndexOf('.')).toLowerCase() || '';
                  const isPdf = ext === '.pdf' || f.mimeType?.includes('pdf');
                  const isPpt = ['.ppt', '.pptx'].includes(ext) || f.mimeType?.includes('presentation') || f.mimeType?.includes('powerpoint');

                  return (
                    <a
                      key={fileId}
                      href={lessonsApi.getFileDownloadUrl(fileId, false)}
                      download={f.originalFilename}
                      className="btn btn-outline btn-sm"
                      style={{
                        fontSize: '0.75rem',
                        padding: '0.3rem 0.75rem',
                        borderColor: isPdf ? 'rgba(239, 68, 68, 0.4)' : (isPpt ? 'rgba(249, 115, 22, 0.4)' : 'rgba(56, 189, 248, 0.4)'),
                        color: isPdf ? '#fca5a5' : (isPpt ? '#fdba74' : '#7dd3fc')
                      }}
                      title={`Download ${f.originalFilename}`}
                    >
                      <FileDown size={13} /> {f.originalFilename} ({formatFileSize(f.fileSize)})
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <PresentationViewer
            presentation={presentation}
            onEdit={() => setIsPresEditorOpen(true)}
            isFaculty={isFaculty}
          />
        </div>
      )}

      {/* TAB 2: DETAILED LESSON CONTENT & UPLOADED MATERIALS */}
      {activeTab === 'lesson' && lesson && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
          {/* Main Content */}
          <div className="card" style={{ padding: '2.5rem' }}>
            {/* Uploaded Chapter PDFs and PPTs Section */}
            <div
              style={{
                marginBottom: '2.25rem',
                padding: '1.5rem',
                backgroundColor: '#0a0f1d',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FolderOpen size={20} />
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                      Chapter Slide Decks & Documents ({lessonFiles.length})
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                      Official instructor lecture PowerPoint presentations (.ppt, .pptx) and PDF reference materials
                    </p>
                  </div>
                </div>

                {isFaculty && (
                  <button
                    onClick={() => setIsLessonEditorOpen(true)}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.78rem', padding: '0.4rem 0.85rem' }}
                  >
                    <Upload size={13} /> Manage / Upload Files
                  </button>
                )}
              </div>

              {lessonFiles.length === 0 ? (
                <div
                  style={{
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    color: '#94a3b8'
                  }}
                >
                  {isFaculty ? (
                    <div>
                      No PDF documents or PowerPoint decks uploaded yet for Chapter {chapter?.chapterNumber}.{' '}
                      <button
                        type="button"
                        onClick={() => setIsLessonEditorOpen(true)}
                        style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600 }}
                      >
                        Click here to upload slide decks & PDFs
                      </button>
                    </div>
                  ) : (
                    'No supplementary lecture slide decks or PDFs uploaded for this chapter.'
                  )}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                  {lessonFiles.map((file) => {
                    const fileId = file._id || file.id;
                    const ext = file.originalFilename?.substring(file.originalFilename.lastIndexOf('.')).toLowerCase() || '';
                    const isPdf = ext === '.pdf' || file.mimeType?.includes('pdf');
                    const isPpt = ['.ppt', '.pptx'].includes(ext) || file.mimeType?.includes('presentation') || file.mimeType?.includes('powerpoint');

                    return (
                      <div
                        key={fileId}
                        style={{
                          padding: '1rem',
                          backgroundColor: '#0f172a',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: '0.85rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: isPdf ? 'rgba(239, 68, 68, 0.15)' : (isPpt ? 'rgba(249, 115, 22, 0.15)' : 'rgba(56, 189, 248, 0.15)'),
                              color: isPdf ? '#ef4444' : (isPpt ? '#f97316' : '#38bdf8'),
                              border: `1px solid ${isPdf ? 'rgba(239, 68, 68, 0.35)' : (isPpt ? 'rgba(249, 115, 22, 0.35)' : 'rgba(56, 189, 248, 0.35)')}`,
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              fontFamily: 'var(--font-mono)'
                            }}
                          >
                            {isPdf ? 'PDF' : (isPpt ? 'PPT' : 'DOC')}
                          </span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: '#f8fafc',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                              title={file.originalFilename}
                            >
                              {file.originalFilename}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                              <span>{formatFileSize(file.fileSize)} • {new Date(file.createdAt).toLocaleDateString()}</span>
                              {(file.cloudinaryUrl || file.storageType === 'cloudinary') && (
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#38bdf8', fontSize: '0.7rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                                  <Cloud size={10} /> Cloudinary
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          {isPdf && (
                            <a
                              href={lessonsApi.getFileDownloadUrl(fileId, true)}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline btn-sm"
                              style={{ flex: 1, fontSize: '0.78rem', padding: '0.35rem 0.5rem', justifyContent: 'center' }}
                              title="Open PDF in browser"
                            >
                              <Eye size={13} /> View PDF
                            </a>
                          )}
                          <a
                            href={lessonsApi.getFileDownloadUrl(fileId, false)}
                            download={file.originalFilename}
                            className="btn btn-primary btn-sm"
                            style={{
                              flex: 1,
                              fontSize: '0.78rem',
                              padding: '0.35rem 0.5rem',
                              justifyContent: 'center',
                              background: isPpt ? 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)' : undefined
                            }}
                            title={`Download ${file.originalFilename}`}
                          >
                            <FileDown size={13} /> Download {isPpt ? 'PPT' : 'File'}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

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

            {/* Academic References & Citations (APA 7th Edition) */}
            {lesson.citations && lesson.citations.length > 0 && (
              <div
                style={{
                  marginTop: '2.5rem',
                  padding: '1.75rem',
                  backgroundColor: '#0a0f1d',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <BookOpen size={20} color="#38bdf8" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                      Academic References & Citations
                    </h3>
                  </div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'rgba(56, 189, 248, 0.12)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700
                    }}
                  >
                    APA 7th Edition Format
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                  The instructional concepts, algorithms, and models presented in this chapter are drawn from peer-reviewed literature, official technical standards, and canonical textbooks. All citations are formatted according to APA 7th Edition guidelines with direct clickable references:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {lesson.citations.map((cit, idx) => {
                    const sourceTypeLabels = {
                      book: 'Canonical Textbook',
                      journal: 'Peer-Reviewed Journal',
                      standard: 'Technical Standard / Spec',
                      whitepaper: 'Technical Whitepaper',
                      website: 'Authoritative Documentation'
                    };

                    return (
                      <div
                        key={idx}
                        style={{
                          padding: '1rem 1.25rem',
                          backgroundColor: '#0c1322',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifySelf: 'center',
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                                color: '#38bdf8',
                                fontSize: '0.75rem',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: 700
                              }}
                            >
                              {idx + 1}
                            </span>
                            <span
                              className="badge"
                              style={{
                                fontSize: '0.68rem',
                                fontFamily: 'var(--font-mono)',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                color: '#cbd5e1',
                                border: '1px solid rgba(255, 255, 255, 0.1)'
                              }}
                            >
                              {sourceTypeLabels[cit.sourceType] || 'Academic Source'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyCitation(cit.citationText, idx)}
                            className="btn btn-outline btn-sm"
                            style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', gap: '0.35rem' }}
                            title="Copy APA 7th citation to clipboard"
                          >
                            {copiedCitationIndex === idx ? (
                              <>
                                <Check size={12} color="#4ade80" /> <span style={{ color: '#4ade80' }}>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy size={12} /> <span>Copy Citation</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div style={{ fontSize: '0.88rem', color: '#f1f5f9', lineHeight: 1.7, paddingLeft: '0.25rem' }}>
                          {cit.citationText}
                        </div>

                        {cit.url && (
                          <div style={{ paddingTop: '0.25rem' }}>
                            <a
                              href={cit.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: '#38bdf8',
                                fontSize: '0.8rem',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'none',
                                wordBreak: 'break-all',
                                padding: '0.3rem 0.65rem',
                                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                                border: '1px solid rgba(56, 189, 248, 0.25)',
                                borderRadius: '4px',
                                transition: 'all 0.15s ease'
                              }}
                              title={`Open ${cit.url} in new tab`}
                            >
                              <ExternalLink size={12} />
                              <span>{cit.url}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Key Concepts Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Quick Materials Sidebar Widget */}
            {lessonFiles && lessonFiles.length > 0 && (
              <div className="card" style={{ padding: '1.5rem', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <FolderOpen size={16} /> Course Materials ({lessonFiles.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {lessonFiles.map((f) => {
                    const fileId = f._id || f.id;
                    const ext = f.originalFilename?.substring(f.originalFilename.lastIndexOf('.')).toLowerCase() || '';
                    const isPdf = ext === '.pdf';
                    const isPpt = ['.ppt', '.pptx'].includes(ext);

                    return (
                      <a
                        key={fileId}
                        href={lessonsApi.getFileDownloadUrl(fileId, false)}
                        download={f.originalFilename}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.55rem 0.75rem',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          borderRadius: 'var(--radius-sm)',
                          textDecoration: 'none',
                          color: '#f8fafc',
                          fontSize: '0.8rem',
                          gap: '0.5rem',
                          transition: 'all 0.15s ease'
                        }}
                        title={`Download ${f.originalFilename}`}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                          {f.originalFilename}
                        </span>
                        <FileDown size={14} color={isPdf ? '#ef4444' : (isPpt ? '#f97316' : '#38bdf8')} />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
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

            {/* Quick Academic Citations Sidebar Widget */}
            {lesson.citations && lesson.citations.length > 0 && (
              <div className="card" style={{ padding: '1.5rem', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <BookOpen size={16} /> Key Sources ({lesson.citations.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {lesson.citations.map((c, i) => (
                    <a
                      key={i}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '0.6rem 0.75rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: 'var(--radius-sm)',
                        textDecoration: 'none',
                        color: '#f8fafc',
                        fontSize: '0.78rem',
                        gap: '0.25rem',
                        transition: 'all 0.15s ease'
                      }}
                      title={c.citationText}
                    >
                      <div style={{ fontWeight: 600, color: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.4rem' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {c.title || `Source ${i + 1}`}
                        </span>
                        <ExternalLink size={12} color="#38bdf8" />
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                        {c.authors ? `${c.authors.split(',')[0]} (${c.year || 'n.d.'})` : 'APA 7th Link'}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: QUIZ & ASSESSMENT INFO */}
      {activeTab === 'quiz' && (
        <div className="card" style={{ maxWidth: '850px', margin: '0 auto', padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              backgroundColor: isFaculty ? 'rgba(56, 189, 248, 0.15)' : (isPassed ? 'rgba(16, 185, 129, 0.15)' : (isDM ? 'rgba(192, 132, 252, 0.15)' : 'rgba(56, 189, 248, 0.15)')),
              color: isFaculty ? '#38bdf8' : (isPassed ? 'var(--success)' : accentColor),
              border: `1px solid ${isFaculty ? 'rgba(56, 189, 248, 0.3)' : (isPassed ? 'rgba(16, 185, 129, 0.3)' : (isDM ? 'rgba(192, 132, 252, 0.3)' : 'rgba(56, 189, 248, 0.3)'))}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem'
            }}>
              <HelpCircle size={34} />
            </div>

            {isFaculty && (
              <span
                className="badge"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  marginBottom: '0.75rem'
                }}
              >
                FACULTY ASSESSMENT ADMINISTRATION
              </span>
            )}

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              {quiz?.title || `Chapter ${chapter?.chapterNumber} Assessment`}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '650px', margin: '0 auto' }}>
              {isFaculty
                ? `Evaluation blueprint and question management for Chapter ${chapter?.chapterNumber}. Faculty members manage curriculum questions and review student attempts. Faculty cannot take student quizzes.`
                : `Curriculum-aligned multiple-choice evaluation for Chapter ${chapter?.chapterNumber}.`}
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

          {isFaculty ? (
            <div>
              <div
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.15rem 1.35rem',
                  marginBottom: '2rem',
                  fontSize: '0.85rem',
                  color: '#bae6fd'
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={16} /> Faculty Authority Console:
                </div>
                <p style={{ margin: 0, lineHeight: 1.5 }}>
                  You have full administrative authority to preview chapter documents dossiers, import or replace assessment question banks, inspect official answer keys, and evaluate student topic gradebooks. Student quizzes are restricted from faculty attempt submission.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <button
                  onClick={() => setIsChapterSummaryOpen(true)}
                  className="btn btn-primary"
                  style={{
                    padding: '0.85rem 1.25rem',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                    boxShadow: '0 0 16px rgba(56, 189, 248, 0.35)'
                  }}
                >
                  <FileText size={18} /> Chapter Summary & Dossier
                </button>

                <button
                  onClick={() => setIsQuizImportOpen(true)}
                  className="btn btn-outline"
                  style={{ padding: '0.85rem 1.25rem', justifyContent: 'center' }}
                >
                  <Upload size={18} /> Import / Replace Questions
                </button>

                <button
                  onClick={() => setActiveTab('gradebook')}
                  className="btn btn-outline"
                  style={{ padding: '0.85rem 1.25rem', justifyContent: 'center', borderColor: '#34d399', color: '#34d399' }}
                >
                  <FileSpreadsheet size={18} /> View Topic Gradebook
                </button>
              </div>
            </div>
          ) : (
            <div>
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
        onClose={() => {
          setIsOverrideModalOpen(false);
          setOverrideError(null);
          setOverrideSuccess(null);
        }}
        title="Administrative Progress Override"
      >
        <form onSubmit={handleOverrideSubmit} noValidate>
          {overrideSuccess && (
            <div className="alert alert-success" style={{ marginBottom: '1.25rem' }}>
              <CheckCircle2 size={18} /> {overrideSuccess}
            </div>
          )}

          {overrideError && (
            <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
              <AlertTriangle size={18} /> {overrideError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Student Username or ID</label>
            <input
              type="text"
              className="form-input"
              value={overrideData.studentId}
              onChange={(e) => setOverrideData({ ...overrideData, studentId: e.target.value })}
              placeholder="e.g. 64a8c1f9... or student username"
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

      {/* Comprehensive Chapter Summary & Export Dossier Modal */}
      <ChapterSummaryModal
        isOpen={isChapterSummaryOpen}
        onClose={() => setIsChapterSummaryOpen(false)}
        chapterId={chapterId}
        chapterNumber={chapter?.chapterNumber}
        chapterTitle={chapter?.title}
      />
    </div>
  );
};

export default ChapterView;

