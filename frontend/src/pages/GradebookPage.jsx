import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { coursesApi, gradebookApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import MasterGradebookTable from '../components/gradebook/MasterGradebookTable';
import QuizReviewModal from '../components/quiz/QuizReviewModal';
import StatusBadge from '../components/common/StatusBadge';
import { Database, Cloud, Award, CheckCircle2, Eye, FileSpreadsheet } from 'lucide-react';

const GradebookPage = () => {
  const { user, isFaculty } = useAuth();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [masterGradebook, setMasterGradebook] = useState(null);
  const [studentReport, setStudentReport] = useState(null);
  const [reviewAttemptId, setReviewAttemptId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize courses
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const cRes = await coursesApi.getAll();
        const courseList = cRes.courses || [];
        setCourses(courseList);

        const paramCourseId = searchParams.get('courseId');
        if (paramCourseId) {
          setSelectedCourseId(paramCourseId);
        } else if (courseList.length > 0) {
          setSelectedCourseId(courseList[0].id || courseList[0]._id);
        }
      } catch (err) {
        setError(err.message || 'Failed to initialize gradebook');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [searchParams]);

  // Load Gradebook data when selectedCourseId or role changes
  useEffect(() => {
    if (!selectedCourseId && isFaculty) return;

    const loadData = async () => {
      try {
        setLoading(true);
        if (isFaculty) {
          const res = await gradebookApi.getMaster(selectedCourseId);
          setMasterGradebook(res);
        } else {
          const res = await gradebookApi.getStudentSelf();
          setStudentReport(res);
        }
      } catch (err) {
        setError(err.message || 'Failed to load gradebook records');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedCourseId, isFaculty]);

  if (loading && !masterGradebook && !studentReport) {
    return <LoadingSpinner message="Calculating authoritative database gradebooks..." />;
  }

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
          {isFaculty ? 'Course-Wide Master Gradebooks' : 'My Personal Gradebook & Transcript'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {isFaculty
            ? 'Unified assessment matrix across all 12 chapters with database-derived performance averages and completion metrics.'
            : 'Track your assessment scores, passing status, and attempt history across both curriculum courses.'}
        </p>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* FACULTY VIEW */}
      {isFaculty ? (
        <div>
          {/* Course Switcher Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {courses.map((c) => {
              const isSelected = selectedCourseId === (c.id || c._id);
              const isDM = c.courseCode.includes('411');
              return (
                <button
                  key={c.id || c._id}
                  onClick={() => setSelectedCourseId(c.id || c._id)}
                  className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    padding: '0.65rem 1.35rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    background: isSelected
                      ? (isDM ? 'var(--dm-accent)' : 'var(--cloud-accent)')
                      : 'transparent',
                    color: isSelected ? '#070a13' : 'var(--text-main)',
                    boxShadow: isSelected
                      ? (isDM ? '0 0 16px rgba(192, 132, 252, 0.35)' : '0 0 16px rgba(56, 189, 248, 0.35)')
                      : 'none'
                  }}
                >
                  {isDM ? <Database size={16} /> : <Cloud size={16} />}
                  {c.courseTitle} ({c.courseCode})
                </button>
              );
            })}
          </div>

          {/* Master Gradebook Table Component */}
          {masterGradebook && (
            <div className="card" style={{ padding: '1.75rem' }}>
              <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {masterGradebook.course?.courseTitle}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {masterGradebook.course?.courseCode} • {masterGradebook.course?.classification} • {masterGradebook.course?.academicDesignation}
                </div>
              </div>

              <MasterGradebookTable
                course={masterGradebook.course}
                chapters={masterGradebook.chapters}
                students={masterGradebook.students}
                gradeMatrix={masterGradebook.gradeMatrix}
              />
            </div>
          )}
        </div>
      ) : (
        /* STUDENT VIEW */
        studentReport && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {studentReport.courses?.map((cData) => (
              <div key={cData.course.id} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                  <div>
                    <span className="badge badge-available" style={{ marginBottom: '0.35rem' }}>
                      {cData.course.classification}
                    </span>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      {cData.course.courseTitle} ({cData.course.courseCode})
                    </h2>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem', textAlign: 'right' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Chapters Passed</div>
                      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>
                        {cData.chaptersPassed} / {cData.totalChapters}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Completion</div>
                      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--cloud-accent)', fontFamily: 'var(--font-mono)' }}>
                        {cData.completionPercentage}%
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Average</div>
                      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                        {cData.overallAverage !== null ? `${cData.overallAverage}%` : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chapter-by-chapter status list */}
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Chapter</th>
                        <th>Status</th>
                        <th>Attempts</th>
                        <th>Highest Score</th>
                        <th>Action / Review</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cData.chapters?.map((ch) => (
                        <tr key={ch.chapterId}>
                          <td style={{ fontWeight: 600 }}>
                            Ch {ch.chapterNumber}: {ch.title}
                          </td>
                          <td>
                            <StatusBadge status={ch.status} />
                          </td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{ch.attemptsCount}</td>
                          <td style={{ fontFamily: 'var(--font-mono)' }}>
                            {ch.highestScore !== null ? (
                              <span style={{ fontWeight: 700, color: ch.status === 'passed' ? 'var(--success)' : 'inherit' }}>
                                {ch.highestScore} / 20 ({ch.highestScorePercentage}%)
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-light)' }}>Not Attempted</span>
                            )}
                          </td>
                          <td>
                            {ch.attempts && ch.attempts.length > 0 ? (
                              <button
                                onClick={() => setReviewAttemptId(ch.attempts[0].id)}
                                className="btn btn-outline"
                                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                              >
                                <Eye size={13} /> Review Attempt
                              </button>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Review Modal */}
      <QuizReviewModal
        isOpen={Boolean(reviewAttemptId)}
        onClose={() => setReviewAttemptId(null)}
        attemptId={reviewAttemptId}
      />
    </div>
  );
};

export default GradebookPage;

