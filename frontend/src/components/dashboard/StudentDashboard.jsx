import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';
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
  PlayCircle,
  ShieldCheck,
  Target
} from 'lucide-react';

const StudentDashboard = ({ courses = [], analytics = {}, user }) => {
  const dmCourse = courses.find((c) => c.courseCode === 'ITEP411-T');
  const ccCourse = courses.find((c) => c.courseCode === 'ITEP413-T');

  const dmAnalytics = analytics?.courses?.find((c) => c.courseCode === 'ITEP411-T');
  const ccAnalytics = analytics?.courses?.find((c) => c.courseCode === 'ITEP413-T');

  const combined = analytics?.combined || {
    totalPassedBothCourses: 0,
    totalChaptersBothCourses: 24,
    overallCompletionPercentage: 0
  };

  const recentActivity = analytics?.recentActivity || [];

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Student Welcome Hero Banner */}
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
                STUDENT LEARNING PORTAL • 4-1
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                ID: @{user?.username}
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc', marginBottom: '0.4rem' }}>
              Welcome back, {user?.firstName} {user?.surname}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '680px', lineHeight: 1.6 }}>
              Follow your independent sequential chapter progression across Data Mining and Cloud Computing. Pass each chapter assessment with at least 15/20 (75%) to unlock the subsequent chapter.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/gradebook" className="btn btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
              <FileSpreadsheet size={16} /> My Grade Transcript
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK RESUME / CONTINUE LEARNING SECTION */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <PlayCircle size={20} color="#38bdf8" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em', margin: 0 }}>
            Continue Learning (Next Unlocked Chapters)
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {/* Resume Data Mining */}
          {dmAnalytics?.nextChapter && dmCourse && (
            <div
              className="card"
              style={{
                padding: '1.5rem',
                backgroundColor: '#0d1326',
                borderColor: 'rgba(192, 132, 252, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
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
                  ITEP411-T • NEXT CHAPTER
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: '0.2rem 0' }}>
                  Chapter {dmAnalytics.nextChapter.chapterNumber}: {dmAnalytics.nextChapter.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {dmAnalytics.chaptersPassed} of 12 chapters passed
                </div>
              </div>

              <Link
                to={`/chapters/${dmAnalytics.nextChapter.id}`}
                className="btn btn-primary"
                style={{
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.88rem',
                  background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)',
                  whiteSpace: 'nowrap'
                }}
              >
                Resume Chapter <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Resume Cloud Computing */}
          {ccAnalytics?.nextChapter && ccCourse && (
            <div
              className="card"
              style={{
                padding: '1.5rem',
                backgroundColor: '#0c1527',
                borderColor: 'rgba(56, 189, 248, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
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
                  ITEP413-T • NEXT CHAPTER
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: '0.2rem 0' }}>
                  Chapter {ccAnalytics.nextChapter.chapterNumber}: {ccAnalytics.nextChapter.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {ccAnalytics.chaptersPassed} of 12 chapters passed
                </div>
              </div>

              <Link
                to={`/chapters/${ccAnalytics.nextChapter.id}`}
                className="btn btn-primary"
                style={{
                  padding: '0.6rem 1.25rem',
                  fontSize: '0.88rem',
                  background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  whiteSpace: 'nowrap'
                }}
              >
                Resume Chapter <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Student Personal Progress Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
            <Award size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TOTAL PASSED</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
            {combined.totalPassedBothCourses} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ {combined.totalChaptersBothCourses}</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>Verified curriculum chapters</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '0.5rem' }}>
            <TrendingUp size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COMPLETION INDEX</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
            {combined.overallCompletionPercentage}%
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>24-chapter graduation path</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderColor: 'rgba(192, 132, 252, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', marginBottom: '0.5rem' }}>
            <Database size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>DATA MINING (ELEC 2)</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
            {dmAnalytics?.chaptersPassed ?? 0} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ 12</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Avg: {dmAnalytics?.overallAverage !== null ? `${dmAnalytics?.overallAverage}%` : 'N/A'}
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
            <Cloud size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>CLOUD COMPUTING (ELEC 4)</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
            {ccAnalytics?.chaptersPassed ?? 0} <span style={{ fontSize: '1rem', color: '#64748b' }}>/ 12</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>
            Avg: {ccAnalytics?.overallAverage !== null ? `${ccAnalytics?.overallAverage}%` : 'N/A'}
          </div>
        </div>
      </div>

      {/* Main Course Offerings Cards */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Target size={20} color="#38bdf8" />
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
          My Enrolled Courses
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
        {/* Course A: Data Mining Card (Neural Purple Theme) */}
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
                    <strong style={{ color: '#f8fafc' }}>12</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>PASSED:</span>{' '}
                    <strong style={{ color: '#34d399' }}>{dmAnalytics?.chaptersPassed ?? 0} / 12</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>MY AVERAGE:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{dmAnalytics?.overallAverage !== null ? `${dmAnalytics?.overallAverage}%` : 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>PROGRESSION:</span>{' '}
                    <strong style={{ color: '#c084fc' }}>Sequential</strong>
                  </div>
                </div>

                <ProgressBar
                  value={dmAnalytics?.chaptersPassed || 0}
                  max={12}
                  label="Chapter Mastery Progress"
                  color="#c084fc"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                {dmAnalytics?.nextChapter ? `Next: Ch ${dmAnalytics.nextChapter.chapterNumber}` : 'All chapters mastered!'}
              </div>
              <Link to={`/courses/${dmCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.15rem' }}>
                Enter Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Course B: Cloud Computing Card (Cyber Azure Theme) */}
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
                    <strong style={{ color: '#f8fafc' }}>12</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>PASSED:</span>{' '}
                    <strong style={{ color: '#34d399' }}>{ccAnalytics?.chaptersPassed ?? 0} / 12</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>MY AVERAGE:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{ccAnalytics?.overallAverage !== null ? `${ccAnalytics?.overallAverage}%` : 'N/A'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>PROGRESSION:</span>{' '}
                    <strong style={{ color: '#38bdf8' }}>Sequential</strong>
                  </div>
                </div>

                <ProgressBar
                  value={ccAnalytics?.chaptersPassed || 0}
                  max={12}
                  label="Chapter Mastery Progress"
                  color="#38bdf8"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                {ccAnalytics?.nextChapter ? `Next: Ch ${ccAnalytics.nextChapter.chapterNumber}` : 'All chapters mastered!'}
              </div>
              <Link to={`/courses/${ccCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.15rem' }}>
                Enter Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Student Personal Assessment History */}
      {recentActivity.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Clock size={18} color="var(--text-muted)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
              My Recent Assessment Attempts
            </h3>
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Chapter Reference</th>
                  <th>My Score</th>
                  <th>Threshold Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'var(--font-mono)', color: a.courseCode?.includes('411') ? '#c084fc' : '#38bdf8', fontWeight: 700 }}>
                      {a.courseCode}
                    </td>
                    <td>Ch {a.chapterNumber}: {a.chapterTitle}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      <span style={{ color: a.isPassed ? '#34d399' : '#f87171' }}>
                        {a.score} / 20 ({a.scorePercentage}%)
                      </span>
                    </td>
                    <td>
                      {a.isPassed ? (
                        <span className="badge badge-passed">
                          <CheckCircle2 size={12} /> Passed
                        </span>
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

export default StudentDashboard;

