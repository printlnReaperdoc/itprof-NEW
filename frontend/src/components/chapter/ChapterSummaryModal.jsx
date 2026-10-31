import React, { useState, useEffect } from 'react';
import { chaptersApi } from '../../api';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import {
  FileText,
  Printer,
  FileSpreadsheet,
  Download,
  ArrowUpDown,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Sparkles,
  Users,
  Award,
  Layers,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  ExternalLink,
  Play
} from 'lucide-react';

const ChapterSummaryModal = ({ isOpen, onClose, chapterId, chapterNumber, chapterTitle }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sorting state: 'surname' | 'score'
  const [sortBy, setSortBy] = useState('surname');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Section view filter: 'all' | 'curriculum' | 'slides' | 'quiz' | 'roster'
  const [activeSection, setActiveSection] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState(false);

  const fetchSummary = async (newSortBy = sortBy, newSortOrder = sortOrder) => {
    if (!chapterId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await chaptersApi.getSummary(chapterId, {
        sortBy: newSortBy,
        sortOrder: newSortOrder
      });
      setData(res);
    } catch (err) {
      setError(err.message || 'Failed to load chapter summary data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && chapterId) {
      fetchSummary(sortBy, sortOrder);
    }
  }, [isOpen, chapterId]);

  const handleToggleSort = (field) => {
    let nextOrder = 'asc';
    if (sortBy === field) {
      nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      nextOrder = field === 'score' ? 'desc' : 'asc';
    }
    setSortBy(field);
    setSortOrder(nextOrder);
    fetchSummary(field, nextOrder);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    try {
      setIsExporting(true);
      await chaptersApi.downloadSummaryPDF(chapterId, { sortBy, sortOrder });
    } catch (err) {
      alert(err.message || 'Failed to download PDF summary.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadXLSX = async () => {
    try {
      setIsExporting(true);
      await chaptersApi.downloadSummaryXLSX(chapterId, { sortBy, sortOrder });
    } catch (err) {
      alert(err.message || 'Failed to download Excel summary.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      setIsExporting(true);
      await chaptersApi.downloadSummaryCSV(chapterId, { sortBy, sortOrder });
    } catch (err) {
      alert(err.message || 'Failed to download CSV roster.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Chapter ${chapterNumber || ''}: Curriculum Dossier & Assessment Summary`}
      maxWidth="1100px"
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', maxHeight: '82vh' }}>
        {/* Top Control Bar: Sorting + Export Actions */}
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#070a13',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {/* Sorter Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              ROSTER SORT:
            </span>

            <button
              onClick={() => handleToggleSort('surname')}
              className={`btn btn-sm ${sortBy === 'surname' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              title="Sort roster by student surname"
            >
              <ArrowUpDown size={13} />
              Surname {sortBy === 'surname' ? (sortOrder === 'asc' ? '(A → Z)' : '(Z → A)') : ''}
            </button>

            <button
              onClick={() => handleToggleSort('score')}
              className={`btn btn-sm ${sortBy === 'score' ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              title="Sort roster by student assessment score"
            >
              <ArrowUpDown size={13} />
              Quiz Score {sortBy === 'score' ? (sortOrder === 'desc' ? '(High → Low)' : '(Low → High)') : ''}
            </button>
          </div>

          {/* Export Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              title="Print document preview"
            >
              <Printer size={13} /> Print
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="btn btn-sm btn-primary"
              style={{
                fontSize: '0.78rem',
                padding: '0.35rem 0.85rem',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)'
              }}
              title="Download official PDF dossier"
            >
              <FileText size={13} /> {isExporting ? 'Generating...' : 'Download PDF'}
            </button>

            <button
              onClick={handleDownloadXLSX}
              disabled={isExporting}
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', borderColor: '#34d399', color: '#34d399' }}
              title="Download formatted Excel workbook"
            >
              <FileSpreadsheet size={13} /> Excel (.xlsx)
            </button>

            <button
              onClick={handleDownloadCSV}
              disabled={isExporting}
              className="btn btn-sm btn-outline"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
              title="Download CSV roster"
            >
              <Download size={13} /> CSV
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            padding: '0.65rem 1.5rem',
            backgroundColor: '#0a1020',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'all', label: 'Complete Dossier' },
            { id: 'curriculum', label: 'Lesson Syllabus' },
            { id: 'slides', label: 'Presentation Deck' },
            { id: 'quiz', label: 'Assessment & Keys' },
            { id: 'roster', label: `Cohort Roster (${data?.records?.length || 0})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeSection === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                color: activeSection === tab.id ? '#38bdf8' : '#94a3b8',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Preview Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {loading && <LoadingSpinner message="Generating chapter dossier and cohort analytics..." />}

          {error && <div className="alert alert-danger">{error}</div>}

          {data && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Header Metadata Pill */}
              <div
                style={{
                  backgroundColor: '#0d1527',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  padding: '1.25rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.35)'
                      }}
                    >
                      {data.course.courseCode} • {data.course.classification}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      Module {data.module?.moduleNumber}: {data.module?.title}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    Chapter {data.chapter.chapterNumber}: {data.chapter.title}
                  </h2>
                </div>

                <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                  <div>Security: <strong style={{ color: '#38bdf8' }}>Faculty Confidential</strong></div>
                  <div>Sort Order: <strong style={{ color: '#f8fafc' }}>{data.sorting?.sortBy?.toUpperCase()} ({data.sorting?.sortOrder?.toUpperCase()})</strong></div>
                </div>
              </div>

              {/* SECTION: COHORT KPI CARDS */}
              {(activeSection === 'all' || activeSection === 'roster') && data.cohort && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <Award size={18} color="#38bdf8" />
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                      Cohort Assessment Telemetry
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                    <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#0c1322' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>ENROLLED</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                        {data.cohort.totalEnrolled}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>active students</div>
                    </div>

                    <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#0c1322' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>ATTEMPTED</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                        {data.cohort.attemptedCount}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>completed quizzes</div>
                    </div>

                    <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#0c1322' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>PASSED (≥15/20)</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                        {data.cohort.passedCount}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>unlocked next chapter</div>
                    </div>

                    <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#0c1322' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>PASS RATE</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                        {data.cohort.passRate}%
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>cohort threshold</div>
                    </div>

                    <div className="card" style={{ padding: '1rem', textAlign: 'center', backgroundColor: '#0c1322' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>CLASS AVERAGE</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
                        {data.cohort.averageScore !== null ? `${data.cohort.averageScore}/20` : 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        {data.cohort.averagePercentage !== null ? `(${data.cohort.averagePercentage}%)` : ''}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: STUDENT EVALUATION ROSTER (SORTABLE) */}
              {(activeSection === 'all' || activeSection === 'roster') && data.records && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={18} color="#38bdf8" />
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                        Student Evaluation Roster
                      </h3>
                    </div>

                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      Active Sort: <strong style={{ color: '#38bdf8' }}>{sortBy === 'surname' ? 'Surname' : 'Quiz Score'} ({sortOrder.toUpperCase()})</strong>
                    </span>
                  </div>

                  <div className="table-container" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }}>#</th>
                          <th>Student ID</th>
                          <th
                            onClick={() => handleToggleSort('surname')}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                          >
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              Student Name (Surname, First)
                              <ArrowUpDown size={12} color={sortBy === 'surname' ? '#38bdf8' : '#64748b'} />
                            </span>
                          </th>
                          <th>Attempts</th>
                          <th
                            onClick={() => handleToggleSort('score')}
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                          >
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                              Best Score
                              <ArrowUpDown size={12} color={sortBy === 'score' ? '#38bdf8' : '#64748b'} />
                            </span>
                          </th>
                          <th>Status</th>
                          <th>Completed At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.records.map((rec) => (
                          <tr key={rec.studentId}>
                            <td style={{ fontFamily: 'var(--font-mono)', color: '#64748b', fontSize: '0.8rem' }}>
                              {rec.rank}
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                              {rec.username}
                            </td>
                            <td style={{ fontWeight: 600, color: '#f8fafc' }}>
                              {rec.fullName}
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)' }}>
                              {rec.attemptsCount}
                            </td>
                            <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                              {rec.highestScore !== null ? (
                                <span style={{ color: rec.isPassed ? '#34d399' : '#f87171' }}>
                                  {rec.highestScore} / 20 ({rec.highestScorePercentage}%)
                                </span>
                              ) : (
                                <span style={{ color: '#64748b' }}>No attempts</span>
                              )}
                            </td>
                            <td>
                              {rec.status === 'passed' ? (
                                <span className="badge badge-passed">
                                  <CheckCircle2 size={12} /> Passed
                                </span>
                              ) : rec.status === 'failed' ? (
                                <span className="badge badge-failed">
                                  <XCircle size={12} /> Failed
                                </span>
                              ) : (
                                <span className="badge badge-locked">
                                  {rec.status.toUpperCase()}
                                </span>
                              )}
                            </td>
                            <td style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                              {rec.latestAttemptAt ? new Date(rec.latestAttemptAt).toLocaleDateString() : '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SECTION: CURRICULUM LESSON SYLLABUS */}
              {(activeSection === 'all' || activeSection === 'curriculum') && data.lesson && (
                <div className="card" style={{ padding: '1.75rem', backgroundColor: '#0c1322' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <BookOpen size={18} color="#38bdf8" />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                      Curriculum Lesson Outline & Objectives
                    </h3>
                  </div>

                  {data.lesson.overview && (
                    <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {data.lesson.overview}
                    </p>
                  )}

                  {data.lessonFiles?.length > 0 && (
                    <div style={{ marginBottom: '1.5rem', backgroundColor: '#0a0f1d', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 'var(--radius-sm)', padding: '1rem 1.25rem' }}>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <FolderOpen size={15} /> Attached Lecture Slide Decks & Documents ({data.lessonFiles.length})
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {data.lessonFiles.map(f => (
                          <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', padding: '0.4rem 0.6rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: '4px' }}>
                            <span style={{ color: '#f8fafc', fontWeight: 600 }}>{f.originalFilename}</span>
                            <span style={{ color: '#94a3b8', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{new Date(f.createdAt).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.lesson.learningObjectives?.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.6rem' }}>
                        Core Learning Objectives
                      </h4>
                      <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {data.lesson.learningObjectives.map((obj, i) => (
                          <li key={i} style={{ fontSize: '0.88rem', color: '#f1f5f9', lineHeight: 1.5 }}>
                            {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.lesson.keyConcepts?.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.6rem' }}>
                        Key Technical Terms
                      </h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        {data.lesson.keyConcepts.map((kc, i) => (
                          <div
                            key={i}
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-sm)'
                            }}
                          >
                            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
                              {kc.term}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem', lineHeight: 1.4 }}>
                              {kc.definition}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.lesson.studyGuide?.length > 0 && (
                    <div
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        border: '1px solid rgba(16, 185, 129, 0.25)',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399', marginBottom: '0.5rem' }}>
                        Study Guide & Competency Checklist
                      </h4>
                      <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.82rem', color: '#d1fae5', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {data.lesson.studyGuide.map((sg, i) => (
                          <li key={i}>{sg}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Academic Citations (APA 7th Edition) */}
                  {data.lesson.citations?.length > 0 && (
                    <div
                      style={{
                        backgroundColor: '#070d19',
                        border: '1px solid rgba(56, 189, 248, 0.25)',
                        padding: '1.15rem 1.35rem',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <BookOpen size={16} /> Academic References & Citations ({data.lesson.citations.length})
                        </h4>
                        <span
                          className="badge"
                          style={{
                            fontSize: '0.68rem',
                            backgroundColor: 'rgba(56, 189, 248, 0.12)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          APA 7th Edition
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {data.lesson.citations.map((c, i) => {
                          const isWiki = c.sourceType === 'wikipedia' || c.url?.includes('wikipedia.org');
                          return (
                            <div
                              key={i}
                              style={{
                                padding: '0.65rem 0.85rem',
                                backgroundColor: isWiki ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.02)',
                                border: isWiki ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(255, 255, 255, 0.06)',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.35rem'
                              }}
                            >
                              <div style={{ fontSize: '0.8rem', color: '#f1f5f9', lineHeight: 1.6 }}>
                                <span style={{ color: isWiki ? '#ffffff' : '#38bdf8', fontWeight: 700, marginRight: '0.4rem', fontFamily: 'var(--font-mono)' }}>[{i + 1}]</span>
                                {isWiki && (
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      fontSize: '0.65rem',
                                      padding: '0.1rem 0.35rem',
                                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                      color: '#ffffff',
                                      borderRadius: '3px',
                                      fontFamily: 'var(--font-mono)',
                                      fontWeight: 700,
                                      marginRight: '0.45rem'
                                    }}
                                  >
                                    [Wikipedia APA 7th]
                                  </span>
                                )}
                                {c.citationText}
                              </div>
                              {c.url && (
                                <a
                                  href={c.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    color: isWiki ? '#ffffff' : '#38bdf8',
                                    fontSize: '0.74rem',
                                    fontFamily: 'var(--font-mono)',
                                    textDecoration: 'none',
                                    width: 'fit-content'
                                  }}
                                >
                                  <ExternalLink size={11} /> {c.url}
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Curated Video Lectures (YouTube) */}
                  {data.lesson.videos?.length > 0 && (
                    <div
                      style={{
                        backgroundColor: '#0a0f1d',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        padding: '1.15rem 1.35rem',
                        borderRadius: 'var(--radius-sm)',
                        marginTop: '1.25rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f87171', margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <Play size={15} /> Curated Video Lectures ({data.lesson.videos.length})
                        </h4>
                        <span
                          className="badge"
                          style={{
                            fontSize: '0.68rem',
                            backgroundColor: 'rgba(239, 68, 68, 0.12)',
                            color: '#f87171',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          YouTube Educational Media
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                        {data.lesson.videos.map((v, i) => (
                          <div
                            key={i}
                            style={{
                              padding: '0.65rem 0.85rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.02)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              borderRadius: 'var(--radius-sm)',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.35rem'
                            }}
                          >
                            <div style={{ fontSize: '0.82rem', color: '#f1f5f9', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span style={{ color: '#ef4444' }}>▶</span> {v.title}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                              Channel: <strong style={{ color: '#e2e8f0' }}>{v.channel || 'Educational Resource'}</strong>
                              {v.description && <span> • {v.description}</span>}
                            </div>
                            {v.youtubeUrl && (
                              <a
                                href={v.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.35rem',
                                  color: '#fca5a5',
                                  fontSize: '0.74rem',
                                  fontFamily: 'var(--font-mono)',
                                  textDecoration: 'none',
                                  width: 'fit-content'
                                }}
                              >
                                <ExternalLink size={11} /> {v.youtubeUrl}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: PRESENTATION SLIDES OUTLINE */}
              {(activeSection === 'all' || activeSection === 'slides') && data.presentation && (
                <div className="card" style={{ padding: '1.75rem', backgroundColor: '#0c1322' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={18} color="#c084fc" />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                        Interactive Presentation Deck ({data.presentation.slideCount} Slides)
                      </h3>
                    </div>
                    <span style={{ fontSize: '0.78rem', color: '#c084fc', fontFamily: 'var(--font-mono)' }}>
                      Theme: {data.presentation.theme}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {data.presentation.slides?.map((sl) => (
                      <div
                        key={sl.slideNumber}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          padding: '0.85rem 1.15rem',
                          borderRadius: 'var(--radius-sm)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f8fafc' }}>
                            Slide {sl.slideNumber}: {sl.title}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                            [{sl.slideType || 'standard'}]
                          </span>
                        </div>
                        {sl.bulletPoints?.length > 0 && (
                          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.4rem', marginBottom: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>
                            {sl.bulletPoints.map((bp, bi) => (
                              <li key={bi}>{bp}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: ASSESSMENT BLUEPRINT & ANSWER KEYS */}
              {(activeSection === 'all' || activeSection === 'quiz') && data.quiz && (
                <div className="card" style={{ padding: '1.75rem', backgroundColor: '#0c1322' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HelpCircle size={18} color="#38bdf8" />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                        Assessment Blueprint & 20-Question Answer Keys
                      </h3>
                    </div>

                    <button
                      onClick={() => setExpandedQuestions(!expandedQuestions)}
                      className="btn btn-sm btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                    >
                      {expandedQuestions ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      {expandedQuestions ? 'Collapse Full Questions' : 'Expand All 20 Questions'}
                    </button>
                  </div>

                  {/* Benchmark specs */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gap: '0.75rem',
                      textAlign: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1.25rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div><span style={{ color: '#64748b' }}>TOTAL QUESTIONS:</span> <strong style={{ color: '#f8fafc' }}>{data.quiz.questionCount}</strong></div>
                    <div><span style={{ color: '#64748b' }}>TIME LIMIT:</span> <strong style={{ color: '#f8fafc' }}>{Math.floor(data.quiz.timeLimitSeconds / 60)} Mins</strong></div>
                    <div><span style={{ color: '#64748b' }}>PASS BENCHMARK:</span> <strong style={{ color: '#34d399' }}>{data.quiz.passingScore} / 20 (75%)</strong></div>
                    <div><span style={{ color: '#64748b' }}>VERSION:</span> <strong style={{ color: '#38bdf8' }}>v{data.quiz.version}</strong></div>
                  </div>

                  {/* Quick Answer Key Matrix */}
                  <div
                    style={{
                      backgroundColor: '#0a1020',
                      border: '1px solid rgba(56, 189, 248, 0.2)',
                      padding: '1rem',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#38bdf8', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
                      QUICK KEY MATRIX (ALL 20 QUESTIONS):
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '0.4rem', textAlign: 'center' }}>
                      {data.quiz.questions?.map((q) => (
                        <div
                          key={q.position}
                          style={{
                            backgroundColor: 'rgba(56, 189, 248, 0.08)',
                            border: '1px solid rgba(56, 189, 248, 0.25)',
                            padding: '0.4rem 0.2rem',
                            borderRadius: 'var(--radius-xs)',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>Q{q.position}</div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>{q.correctOption}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Questions List */}
                  {expandedQuestions && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {data.quiz.questions?.map((q) => (
                        <div
                          key={q.id}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#f8fafc', marginBottom: '0.5rem' }}>
                            Q{q.position}. {q.questionText}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingLeft: '0.5rem' }}>
                            {q.options?.map((opt) => (
                              <div
                                key={opt.id}
                                style={{
                                  fontSize: '0.82rem',
                                  padding: '0.3rem 0.6rem',
                                  borderRadius: 'var(--radius-xs)',
                                  backgroundColor: opt.isCorrect ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                                  color: opt.isCorrect ? '#34d399' : '#cbd5e1',
                                  fontWeight: opt.isCorrect ? 700 : 400,
                                  border: opt.isCorrect ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid transparent'
                                }}
                              >
                                {opt.label}. {opt.text} {opt.isCorrect && '  [✓ CORRECT KEY]'}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ChapterSummaryModal;

