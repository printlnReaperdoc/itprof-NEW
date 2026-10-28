import React, { useState, useEffect } from 'react';
import { quizzesApi, exportUrls } from '../api';
import api from '../api/client';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  KeyRound,
  FileDown,
  Printer,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  BookOpen,
  Layers,
  HelpCircle,
  Award,
  Filter,
  Check
} from 'lucide-react';

const FacultyAnswerKeysPage = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapters, setExpandedChapters] = useState({});

  useEffect(() => {
    fetchAnswerKeys();
  }, []);

  const fetchAnswerKeys = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await quizzesApi.getAllAnswerKeys();
      setCoursesData(res.courses || []);

      // Default expand first 3 chapters of each course
      const initialExpanded = {};
      (res.courses || []).forEach(c => {
        (c.chapters || []).slice(0, 3).forEach(ch => {
          initialExpanded[ch.id] = true;
        });
      });
      setExpandedChapters(initialExpanded);
    } catch (err) {
      console.error('Failed to load answer keys:', err);
      setError(err.message || 'Unable to retrieve answer keys.');
    } finally {
      setLoading(false);
    }
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const expandAll = () => {
    const all = {};
    coursesData.forEach(c => {
      (c.chapters || []).forEach(ch => {
        all[ch.id] = true;
      });
    });
    setExpandedChapters(all);
  };

  const collapseAll = () => {
    setExpandedChapters({});
  };

  const [downloadingCourseId, setDownloadingCourseId] = useState(null);

  const handleDownloadPDF = async (courseId = null) => {
    try {
      const targetId = courseId || (selectedCourseFilter !== 'ALL' ? selectedCourseFilter : null);
      setDownloadingCourseId(targetId || 'ALL');
      setError(null);

      const url = exportUrls.answerKeysPDF(targetId || undefined);
      // Fetch binary PDF data through authenticated Axios client
      const response = await api.get(url, { responseType: 'blob' });

      // Create download blob
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      const courseObj = targetId ? coursesData.find(c => c.id === targetId) : null;
      const filename = courseObj ? `${courseObj.courseCode}_Quiz_Answer_Keys.pdf` : 'IT_Prof_Electives_Master_Quiz_Answer_Keys.pdf';
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error('Download error:', err);
      setError(err.message || 'Failed to download Answer Keys PDF.');
    } finally {
      setDownloadingCourseId(null);
    }
  };

  const handlePrint = () => {
    // Expand all before print so complete answer key sheets are visible
    expandAll();
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Filter courses
  const filteredCourses = coursesData.filter(course => {
    if (selectedCourseFilter !== 'ALL' && course.id !== selectedCourseFilter) {
      return false;
    }
    return true;
  });

  // Calculate totals
  const totalChapters = coursesData.reduce((acc, c) => acc + (c.chapters?.length || 0), 0);
  const totalQuestions = coursesData.reduce((acc, c) => {
    return acc + (c.chapters || []).reduce((qAcc, ch) => qAcc + (ch.quiz?.questions?.length || 0), 0);
  }, 0);

  if (loading) return <LoadingSpinner message="Loading Master Quiz Answer Keys & Curriculum Solutions..." />;

  return (
    <div className="answer-keys-page" style={{ padding: '2.5rem 1.5rem', minHeight: '85vh' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Page Header */}
        <div className="no-print" style={{
          marginBottom: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0284c7, #10b981)',
                color: '#fff',
                padding: '0.55rem',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(16, 185, 129, 0.3)'
              }}>
                <KeyRound size={22} />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', margin: 0 }}>
                Faculty Master Answer Keys
              </h1>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
              Authorized curriculum solutions, answer keys, and question banks for IT Professional Elective 2 & 4.
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.65rem 1.15rem' }}
              title="Print formatted answer keys via browser dialog"
            >
              <Printer size={16} /> Print Sheet
            </button>

            <button
              onClick={() => handleDownloadPDF(selectedCourseFilter !== 'ALL' ? selectedCourseFilter : null)}
              disabled={Boolean(downloadingCourseId)}
              className="btn btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                cursor: downloadingCourseId ? 'not-allowed' : 'pointer'
              }}
            >
              <FileDown size={16} /> {downloadingCourseId === (selectedCourseFilter !== 'ALL' ? selectedCourseFilter : 'ALL') ? 'Generating PDF...' : 'Download Official PDF'}
            </button>
          </div>
        </div>

        {/* Overview Stats Strip */}
        <div className="no-print" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>COURSES</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>{coursesData.length} Electives</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
              <Layers size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>TOTAL CHAPTERS</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>{totalChapters} Chapters</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
              <HelpCircle size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>QUESTION POOL</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>{totalQuestions} Questions</div>
            </div>
          </div>

          <div className="card" style={{ padding: '1.15rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24' }}>
              <Award size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>PASSING CRITERIA</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>15 / 20 (75%)</div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="card no-print" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            {/* Course Selector Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setSelectedCourseFilter('ALL')}
                className="btn btn-outline"
                style={{
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.85rem',
                  backgroundColor: selectedCourseFilter === 'ALL' ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
                  borderColor: selectedCourseFilter === 'ALL' ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                  color: selectedCourseFilter === 'ALL' ? '#38bdf8' : '#94a3b8'
                }}
              >
                All Courses ({coursesData.length})
              </button>

              {coursesData.map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCourseFilter(c.id)}
                  className="btn btn-outline"
                  style={{
                    padding: '0.45rem 0.95rem',
                    fontSize: '0.85rem',
                    backgroundColor: selectedCourseFilter === c.id ? 'rgba(56, 189, 248, 0.18)' : 'transparent',
                    borderColor: selectedCourseFilter === c.id ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
                    color: selectedCourseFilter === c.id ? '#38bdf8' : '#94a3b8'
                  }}
                >
                  {c.courseCode} ({c.chapters?.length || 0} Ch)
                </button>
              ))}
            </div>

            {/* Search Input & Expand/Collapse */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ position: 'relative', width: '260px' }}>
                <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                <input
                  type="text"
                  placeholder="Search questions or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '2.4rem', fontSize: '0.85rem' }}
                />
              </div>

              <button
                type="button"
                onClick={expandAll}
                className="btn btn-outline"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="btn btn-outline"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Printable Header Banner (Only visible during print) */}
        <div className="print-only" style={{ display: 'none', marginBottom: '1.5rem', borderBottom: '2px solid #0f172a', paddingBottom: '0.75rem' }}>
          <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '0 0 4px', color: '#0f172a' }}>
            UNIVERSITY LEARNING MANAGEMENT SYSTEM
          </h1>
          <h2 style={{ fontSize: '13pt', fontWeight: 'bold', margin: '0 0 4px', color: '#334155' }}>
            Faculty Master Assessment Reference: Official Quiz Answer Keys
          </h2>
          <p style={{ fontSize: '9pt', color: '#64748b', margin: 0 }}>
            Confidential Examination Material • Printed on {new Date().toLocaleString()}
          </p>
        </div>

        {/* Content by Course */}
        {filteredCourses.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            No courses found matching the selected filter.
          </div>
        ) : (
          filteredCourses.map(course => {
            // Filter chapters by query if query exists
            const chapters = (course.chapters || []).filter(chapter => {
              if (!searchQuery.trim()) return true;
              const q = searchQuery.toLowerCase();
              if (chapter.title?.toLowerCase().includes(q)) return true;
              if (chapter.description?.toLowerCase().includes(q)) return true;
              return (chapter.quiz?.questions || []).some(quest =>
                quest.questionText?.toLowerCase().includes(q)
              );
            });

            return (
              <div key={course.id} style={{ marginBottom: '3rem' }}>
                {/* Course Banner */}
                <div style={{
                  padding: '1.25rem 1.5rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.25), rgba(30, 41, 59, 0.8))',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.3)'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: '#0284c7',
                        color: '#fff',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)'
                      }}>
                        {course.courseCode}
                      </span>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                        {course.courseTitle}
                      </h2>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      Level: {course.academicYearLevel} • Term: {course.term} • Designation: {course.academicDesignation || 'IT Professional Elective'}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadPDF(course.id)}
                    disabled={downloadingCourseId === course.id}
                    className="btn btn-outline no-print"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <FileDown size={14} /> {downloadingCourseId === course.id ? 'Generating...' : 'Course PDF'}
                  </button>
                </div>

                {/* Chapters List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {chapters.map(chapter => {
                    const isExpanded = !!expandedChapters[chapter.id] || !!searchQuery.trim();
                    const questions = chapter.quiz?.questions || [];

                    return (
                      <div
                        key={chapter.id}
                        className="card chapter-key-card"
                        style={{
                          padding: 0,
                          overflow: 'hidden',
                          border: isExpanded ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid var(--border-color)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {/* Chapter Card Header */}
                        <div
                          onClick={() => toggleChapter(chapter.id)}
                          style={{
                            padding: '1.15rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            backgroundColor: isExpanded ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.5)',
                            borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '8px',
                              background: 'rgba(56, 189, 248, 0.15)',
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              color: '#38bdf8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.95rem'
                            }}>
                              {chapter.chapterNumber}
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f8fafc' }}>
                                Chapter {chapter.chapterNumber}: {chapter.title}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                                {chapter.quiz?.title || 'Chapter Assessment'} • {questions.length} Questions • Passing: 15/20 (75%)
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{
                              fontSize: '0.72rem',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              background: 'rgba(16, 185, 129, 0.15)',
                              color: '#34d399',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              fontFamily: 'var(--font-mono)'
                            }}>
                              20 ITEMS
                            </span>
                            <div className="no-print" style={{ color: '#94a3b8' }}>
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                          </div>
                        </div>

                        {/* Chapter Body */}
                        {isExpanded && (
                          <div style={{ padding: '1.5rem' }}>
                            {/* Quick Answer Key Matrix Strip */}
                            <div style={{
                              backgroundColor: 'rgba(15, 23, 42, 0.65)',
                              border: '1px solid rgba(56, 189, 248, 0.25)',
                              borderRadius: '8px',
                              padding: '1rem',
                              marginBottom: '1.5rem'
                            }}>
                              <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                color: '#38bdf8',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '0.65rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                              }}>
                                <KeyRound size={13} /> Quick Grading Key Matrix
                              </div>

                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
                                gap: '0.5rem'
                              }}>
                                {questions.map(q => (
                                  <div
                                    key={q.id || q.position}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '0.4rem 0.65rem',
                                      borderRadius: '6px',
                                      backgroundColor: 'rgba(30, 41, 59, 0.8)',
                                      border: '1px solid rgba(255, 255, 255, 0.08)',
                                      fontFamily: 'var(--font-mono)',
                                      fontSize: '0.78rem'
                                    }}
                                  >
                                    <span style={{ color: '#94a3b8' }}>Q{q.position}</span>
                                    <span style={{
                                      fontWeight: 800,
                                      color: '#34d399',
                                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                                      padding: '0.1rem 0.4rem',
                                      borderRadius: '4px'
                                    }}>
                                      {q.correctOption || 'N/A'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Detailed Questions & Options */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                              {questions.map(q => (
                                <div
                                  key={q.id || q.position}
                                  style={{
                                    backgroundColor: 'rgba(11, 17, 32, 0.7)',
                                    border: '1px solid rgba(255, 255, 255, 0.06)',
                                    borderRadius: '10px',
                                    padding: '1.25rem'
                                  }}
                                >
                                  {/* Question Stem Header */}
                                  <div style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    marginBottom: '0.9rem'
                                  }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                                      <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        background: 'rgba(56, 189, 248, 0.15)',
                                        color: '#38bdf8',
                                        fontFamily: 'var(--font-mono)',
                                        marginTop: '0.15rem'
                                      }}>
                                        #{q.position}
                                      </span>
                                      <p style={{
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        color: '#f8fafc',
                                        lineHeight: 1.5,
                                        margin: 0
                                      }}>
                                        {q.questionText}
                                      </p>
                                    </div>
                                    <span style={{
                                      fontSize: '0.7rem',
                                      color: '#94a3b8',
                                      fontFamily: 'var(--font-mono)',
                                      whiteSpace: 'nowrap'
                                    }}>
                                      {q.points || 1} pt
                                    </span>
                                  </div>

                                  {/* Options Grid */}
                                  <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                                    gap: '0.65rem'
                                  }}>
                                    {(q.options || []).map(opt => {
                                      const isCorrect = opt.isCorrect;
                                      return (
                                        <div
                                          key={opt.id || opt.label}
                                          style={{
                                            padding: '0.75rem 0.95rem',
                                            borderRadius: '8px',
                                            border: isCorrect
                                              ? '1.5px solid #10b981'
                                              : '1px solid rgba(255, 255, 255, 0.06)',
                                            backgroundColor: isCorrect
                                              ? 'rgba(16, 185, 129, 0.12)'
                                              : 'rgba(30, 41, 59, 0.4)',
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '0.65rem',
                                            transition: 'all 0.15s ease'
                                          }}
                                        >
                                          <div style={{
                                            width: '24px',
                                            height: '24px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: '0.75rem',
                                            fontFamily: 'var(--font-mono)',
                                            flexShrink: 0,
                                            backgroundColor: isCorrect ? '#10b981' : 'rgba(255, 255, 255, 0.08)',
                                            color: isCorrect ? '#ffffff' : '#94a3b8'
                                          }}>
                                            {opt.label}
                                          </div>

                                          <div style={{ flex: 1 }}>
                                            <div style={{
                                              fontSize: '0.85rem',
                                              color: isCorrect ? '#f0fdf4' : '#cbd5e1',
                                              fontWeight: isCorrect ? 600 : 400,
                                              lineHeight: 1.4
                                            }}>
                                              {opt.text || opt.optionText}
                                            </div>
                                            {isCorrect && (
                                              <div style={{
                                                marginTop: '0.35rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.3rem',
                                                color: '#34d399',
                                                fontSize: '0.7rem',
                                                fontWeight: 700,
                                                letterSpacing: '0.04em'
                                              }}>
                                                <CheckCircle2 size={12} /> CORRECT ANSWER KEY
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Embedded print styles */}
      <style>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
            font-size: 10pt;
          }
          .no-print, header, footer, nav, .btn, input {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }
          .chapter-key-card {
            border: 1px solid #cbd5e1 !important;
            page-break-inside: avoid;
            margin-bottom: 1.5rem !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          .card {
            background: #ffffff !important;
            color: #000000 !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
          }
          h1, h2, h3, p, span, div {
            color: #000000 !important;
          }
          div[style*="background: rgba(16, 185, 129"] {
            background-color: #e2e8f0 !important;
            border: 1px solid #000000 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FacultyAnswerKeysPage;

