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
  Users
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

  if (loading) return <LoadingSpinner message="Loading courses and progression metrics..." />;

  const dmCourse = courses.find((c) => c.courseCode === 'ITEP411-T');
  const ccCourse = courses.find((c) => c.courseCode === 'ITEP413-T');

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Welcome Banner */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #1e293b, #0f172a)',
          color: '#ffffff',
          marginBottom: '2rem',
          padding: '2rem 2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
          <div>
            <span
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Fourth Year • First Term (4-1)
            </span>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.35rem' }}>
              Welcome back, {user?.firstName}!
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '650px' }}>
              {isFaculty
                ? 'Faculty management portal for IT Professional Electives 2 (Data Mining) & 4 (Cloud Computing).'
                : 'Track your sequential chapter progression, interactive presentations, and chapter quiz assessments.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/gradebook" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
              <FileSpreadsheet size={16} /> {isFaculty ? 'View Master Gradebooks' : 'My Grade Report'}
            </Link>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Aggregate Overview Metrics */}
      {analytics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {analytics.mode === 'student' ? (
            <>
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  <Award size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Passed</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {analytics.combined?.totalPassedBothCourses} / {analytics.combined?.totalChaptersBothCourses}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Chapters verified across both courses</div>
              </div>

              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
                  <TrendingUp size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Combined Progress</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {analytics.combined?.overallCompletionPercentage}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Overall 24-chapter completion</div>
              </div>

              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#8b5cf6', marginBottom: '0.5rem' }}>
                  <Database size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Data Mining (Elective 2)</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {dmCourse?.completionPercentage ?? 0}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{dmCourse?.chaptersPassed ?? 0} / 12 chapters passed</div>
              </div>

              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#0ea5e9', marginBottom: '0.5rem' }}>
                  <Cloud size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Cloud Computing (Elective 4)</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {ccCourse?.completionPercentage ?? 0}%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ccCourse?.chaptersPassed ?? 0} / 12 chapters passed</div>
              </div>
            </>
          ) : (
            <>
              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  <Users size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Enrolled Students</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {analytics.summary?.totalStudents}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active student accounts</div>
              </div>

              <div className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--success)', marginBottom: '0.5rem' }}>
                  <BookOpen size={20} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Total Curriculum</span>
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  24 Chapters
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>480 preloaded quiz questions</div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Main Course Cards (Section 4) */}
      <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.25rem' }}>
        Curriculum Course Offerings
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {/* Course A: Data Mining */}
        {dmCourse && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-available" style={{ marginBottom: '0.5rem' }}>
                    {dmCourse.classification}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {dmCourse.courseTitle}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginTop: '0.15rem' }}>
                    {dmCourse.courseCode} • {dmCourse.academicDesignation}
                  </div>
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: '#ede9fe',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Database size={24} />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {dmCourse.description}
              </p>

              {/* Course Stats */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Chapters:</span>{' '}
                    <strong>{dmCourse.totalChapters || 12} Total</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Passed:</span>{' '}
                    <strong style={{ color: 'var(--success)' }}>{dmCourse.chaptersPassed ?? 0} / 12</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Average:</span>{' '}
                    <strong>{dmCourse.overallAverage !== null ? `${dmCourse.overallAverage}%` : 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Progression:</span>{' '}
                    <strong>Independent</strong>
                  </div>
                </div>

                <ProgressBar
                  value={dmCourse.chaptersPassed || 0}
                  max={12}
                  label="Course Completion"
                  color="#7c3aed"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {dmCourse.latestActivity ? `Last attempt: ${new Date(dmCourse.latestActivity.submittedAt).toLocaleDateString()}` : 'No attempts recorded'}
              </div>
              <Link to={`/courses/${dmCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Open Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Course B: Cloud Computing */}
        {ccCourse && (
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span className="badge badge-available" style={{ marginBottom: '0.5rem' }}>
                    {ccCourse.classification}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {ccCourse.courseTitle}
                  </h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginTop: '0.15rem' }}>
                    {ccCourse.courseCode} • {ccCourse.academicDesignation}
                  </div>
                </div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Cloud size={24} />
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {ccCourse.description}
              </p>

              {/* Course Stats */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Chapters:</span>{' '}
                    <strong>{ccCourse.totalChapters || 12} Total</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Passed:</span>{' '}
                    <strong style={{ color: 'var(--success)' }}>{ccCourse.chaptersPassed ?? 0} / 12</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Average:</span>{' '}
                    <strong>{ccCourse.overallAverage !== null ? `${ccCourse.overallAverage}%` : 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Progression:</span>{' '}
                    <strong>Independent</strong>
                  </div>
                </div>

                <ProgressBar
                  value={ccCourse.chaptersPassed || 0}
                  max={12}
                  label="Course Completion"
                  color="#0284c7"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {ccCourse.latestActivity ? `Last attempt: ${new Date(ccCourse.latestActivity.submittedAt).toLocaleDateString()}` : 'No attempts recorded'}
              </div>
              <Link to={`/courses/${ccCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                Open Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity Feed */}
      {analytics?.recentActivity && analytics.recentActivity.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Recent Assessment Activity
          </h3>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  {isFaculty && <th>Student</th>}
                  <th>Course</th>
                  <th>Chapter</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentActivity.map((a, i) => (
                  <tr key={i}>
                    {isFaculty && <td style={{ fontWeight: 600 }}>{a.student}</td>}
                    <td>{a.courseCode}</td>
                    <td>Ch {a.chapterNumber}: {a.chapterTitle}</td>
                    <td style={{ fontWeight: 600 }}>{a.score} / 20 ({a.scorePercentage}%)</td>
                    <td>
                      {a.isPassed ? (
                        <span className="badge badge-passed">Passed</span>
                      ) : (
                        <span className="badge badge-failed">Failed</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
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

