import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { coursesApi, analyticsApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProgressBar from '../components/common/ProgressBar';
import {
  Database,
  Cloud,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  Users,
  Activity,
  Cpu
} from 'lucide-react';

const Dashboard = () => {
  const { user, isFaculty } = useAuth();
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, analyticsRes] = await Promise.all([
          coursesApi.getAll(),
          analyticsApi.getDashboard()
        ]);
        setCourses(coursesRes.courses || []);
        setAnalytics(analyticsRes);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Querying neural & cloud telemetry..." />;

  const dmCourse = courses.find((c) => c.courseCode === 'ITEP411-T');
  const ccCourse = courses.find((c) => c.courseCode === 'ITEP413-T');

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Welcome Hero Banner with Cyber Glow */}
      <div
        className="card tech-grid-bg"
        style={{
          backgroundColor: '#0c1322',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          marginBottom: '2.5rem',
          padding: '2.25rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.6), 0 0 20px -5px rgba(56, 189, 248, 0.15)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span
                className="badge"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: '#38bdf8',
                  border: '1px solid rgba(56, 189, 248, 0.3)'
                }}
              >
                ACADEMIC YEAR 4 • TERM 1 (4-1)
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                System Ready • 24 Chapters Online
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc', marginBottom: '0.4rem' }}>
              Welcome back, {user?.firstName}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '650px', lineHeight: 1.6 }}>
              {isFaculty
                ? 'Faculty administration console. Manage curriculum lesson decks, versioned quizzes, topic evaluations, and master gradebook analytics.'
                : 'Monitor your independent sequential chapter progression, interactive presentations, and timed assessment attempts.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/gradebook" className="btn btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
              <FileSpreadsheet size={16} /> {isFaculty ? 'Master Gradebooks' : 'Personal Transcript'}
            </Link>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Aggregate Overview Metrics */}
      {analytics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {analytics.mode === 'student' ? (
            <>
              <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
                  <Award size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TOTAL PASSED</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                  {analytics.combined?.totalPassedBothCourses} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ {analytics.combined?.totalChaptersBothCourses}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>Verified curriculum chapters</div>
              </div>

              <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '0.5rem' }}>
                  <TrendingUp size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COMBINED COMPLETION</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
                  {analytics.combined?.overallCompletionPercentage}%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>24-chapter mastery index</div>
              </div>

              <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderColor: 'rgba(192, 132, 252, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', marginBottom: '0.5rem' }}>
                  <Database size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>DATA MINING (ELECTIVE 2)</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                  {dmCourse?.completionPercentage ?? 0}%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{dmCourse?.chaptersPassed ?? 0} / 12 chapters unlocked</div>
              </div>

              <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
                  <Cloud size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>CLOUD COMPUTING (ELECTIVE 4)</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                  {ccCourse?.completionPercentage ?? 0}%
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{ccCourse?.chaptersPassed ?? 0} / 12 chapters unlocked</div>
              </div>
            </>
          ) : (
            <>
              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
                  <Users size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ENROLLED STUDENTS</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                  {analytics.summary?.totalStudents}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>Active student accounts</div>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', marginBottom: '0.5rem' }}>
                  <Cpu size={18} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TOTAL QUESTIONS</span>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
                  480 Questions
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>24 preloaded chapter quizzes</div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Course Offerings Cards */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Activity size={20} color="#38bdf8" />
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
          Active Curriculum Courses
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
        {/* Course A: Data Mining Card (Neural Theme) */}
        {dmCourse && (
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#0d1326',
              borderColor: 'rgba(192, 132, 252, 0.3)',
              boxShadow: '0 8px 25px -8px rgba(192, 132, 252, 0.2)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'rgba(192, 132, 252, 0.15)',
                      color: '#c084fc',
                      border: '1px solid rgba(192, 132, 252, 0.35)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {dmCourse.classification}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                    {dmCourse.courseTitle}
                  </h3>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#c084fc', marginTop: '0.2rem' }}>
                    {dmCourse.courseCode} • {dmCourse.academicDesignation}
                  </div>
                </div>

                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(192, 132, 252, 0.15)',
                    border: '1px solid rgba(192, 132, 252, 0.3)',
                    color: '#c084fc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(192, 132, 252, 0.2)'
                  }}
                >
                  <Database size={24} />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {dmCourse.description}
              </p>

              {/* Data Mining Metrics Grid */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 10, 19, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>TOTAL CHAPTERS:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{dmCourse.totalChapters || 12}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>PASSED:</span>{' '}
                    <strong style={{ color: '#34d399' }}>{dmCourse.chaptersPassed ?? 0} / 12</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>AVG SCORE:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{dmCourse.overallAverage !== null ? `${dmCourse.overallAverage}%` : 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>SEQUENCE:</span>{' '}
                    <strong style={{ color: '#c084fc' }}>Independent</strong>
                  </div>
                </div>

                <ProgressBar
                  value={dmCourse.chaptersPassed || 0}
                  max={12}
                  label="Curriculum Unlock Progress"
                  color="#c084fc"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                {dmCourse.latestActivity ? `Attempted: ${new Date(dmCourse.latestActivity.submittedAt).toLocaleDateString()}` : 'No attempts logged'}
              </div>
              <Link to={`/courses/${dmCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.15rem' }}>
                Open Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Course B: Cloud Computing Card (Cloud Azure Theme) */}
        {ccCourse && (
          <div
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#0c1527',
              borderColor: 'rgba(56, 189, 248, 0.3)',
              boxShadow: '0 8px 25px -8px rgba(56, 189, 248, 0.2)'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <span
                    className="badge"
                    style={{
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      border: '1px solid rgba(56, 189, 248, 0.35)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {ccCourse.classification}
                  </span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc' }}>
                    {ccCourse.courseTitle}
                  </h3>
                  <div style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', marginTop: '0.2rem' }}>
                    {ccCourse.courseCode} • {ccCourse.academicDesignation}
                  </div>
                </div>

                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)'
                  }}
                >
                  <Cloud size={24} />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {ccCourse.description}
              </p>

              {/* Cloud Computing Metrics Grid */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 10, 19, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>TOTAL CHAPTERS:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{ccCourse.totalChapters || 12}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>PASSED:</span>{' '}
                    <strong style={{ color: '#34d399' }}>{ccCourse.chaptersPassed ?? 0} / 12</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>AVG SCORE:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{ccCourse.overallAverage !== null ? `${ccCourse.overallAverage}%` : 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>SEQUENCE:</span>{' '}
                    <strong style={{ color: '#38bdf8' }}>Independent</strong>
                  </div>
                </div>

                <ProgressBar
                  value={ccCourse.chaptersPassed || 0}
                  max={12}
                  label="Curriculum Unlock Progress"
                  color="#38bdf8"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                {ccCourse.latestActivity ? `Attempted: ${new Date(ccCourse.latestActivity.submittedAt).toLocaleDateString()}` : 'No attempts logged'}
              </div>
              <Link to={`/courses/${ccCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.15rem' }}>
                Open Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Assessment Terminal Feed */}
      {analytics?.recentActivity && analytics.recentActivity.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Clock size={18} color="var(--text-muted)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              Recent Assessment Log
            </h3>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {isFaculty && <th>Student</th>}
                  <th>Course Code</th>
                  <th>Chapter Reference</th>
                  <th>Raw Score</th>
                  <th>Threshold Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentActivity.map((a, i) => (
                  <tr key={i}>
                    {isFaculty && <td style={{ fontWeight: 600 }}>{a.student}</td>}
                    <td style={{ fontFamily: 'var(--font-mono)', color: a.courseCode?.includes('411') ? '#c084fc' : '#38bdf8' }}>
                      {a.courseCode}
                    </td>
                    <td>Ch {a.chapterNumber}: {a.chapterTitle}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {a.score} / 20 ({a.scorePercentage}%)
                    </td>
                    <td>
                      {a.isPassed ? (
                        <span className="badge badge-passed">Passed</span>
                      ) : (
                        <span className="badge badge-failed">Failed</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                      {new Date(a.submittedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
