import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { quizzesApi } from '../../api';
import {
  Users,
  Database,
  Cloud,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  Activity,
  ArrowRight,
  Cpu,
  Clock,
  Award,
  Layers,
  Upload,
  BarChart3
} from 'lucide-react';

const FacultyDashboard = ({ courses = [], analytics = {}, user }) => {
  const [downloadingKeys, setDownloadingKeys] = useState(false);

  const dmCourse = courses.find((c) => c.courseCode === 'ITEP411-T');
  const ccCourse = courses.find((c) => c.courseCode === 'ITEP413-T');

  const dmStats = analytics?.summary?.courses?.find((c) => c.courseCode === 'ITEP411-T');
  const ccStats = analytics?.summary?.courses?.find((c) => c.courseCode === 'ITEP413-T');

  const totalStudents = analytics?.summary?.totalStudents || 8;
  const recentActivity = analytics?.recentActivity || [];

  const handleDownloadAllAnswerKeys = async () => {
    try {
      setDownloadingKeys(true);
      await quizzesApi.downloadAnswerKeysPDF();
    } catch (err) {
      alert(err.message || 'Failed to download answer keys PDF.');
    } finally {
      setDownloadingKeys(false);
    }
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Faculty Command Hero Banner */}
      <div
        className="card tech-grid-bg animate-fade-in"
        style={{
          backgroundColor: '#0c1322',
          borderColor: 'rgba(56, 189, 248, 0.3)',
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
                  border: '1px solid rgba(56, 189, 248, 0.35)'
                }}
              >
                FACULTY ADMINISTRATION CONSOLE
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                Term 1 (4-1) • Master Academic Authority
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc', marginBottom: '0.4rem' }}>
              Welcome, Prof. {user?.firstName} {user?.surname}
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '720px', lineHeight: 1.6 }}>
              Centralized curriculum governance for IT Professional Electives 2 (Data Mining) and 4 (Cloud Computing). Oversee cohort progression, manage assessment question banks, inspect official answer keys, export master gradebooks, and audit compliance logs.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadAllAnswerKeys}
              disabled={downloadingKeys}
              className="btn btn-outline"
              style={{ padding: '0.65rem 1.25rem', borderColor: '#38bdf8', color: '#38bdf8' }}
              title="Download master PDF of all 24 chapter quiz answer keys"
            >
              <FileText size={16} /> {downloadingKeys ? 'Generating...' : 'Master Answer Keys (PDF)'}
            </button>

            <Link to="/gradebook" className="btn btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
              <FileSpreadsheet size={16} /> Master Gradebooks
            </Link>

            <Link to="/audit" className="btn btn-outline" style={{ padding: '0.65rem 1.15rem' }}>
              <ShieldCheck size={16} /> Audit Logs
            </Link>
          </div>
        </div>
      </div>

      {/* Cohort Key Telemetry Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
            <Users size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ACTIVE COHORT</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
            {totalStudents} <span style={{ fontSize: '1rem', color: '#64748b' }}>Students</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>Enrolled in both electives</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', marginBottom: '0.5rem' }}>
            <Layers size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>CURRICULUM MODULES</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>
            24 <span style={{ fontSize: '1rem', color: '#64748b' }}>Chapters</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>12 Data Mining + 12 Cloud Comp</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderColor: 'rgba(192, 132, 252, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c084fc', marginBottom: '0.5rem' }}>
            <Cpu size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c084fc', fontFamily: 'var(--font-mono)' }}>ASSESSMENT BANK</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', fontFamily: 'var(--font-mono)' }}>
            480 <span style={{ fontSize: '1rem', color: '#64748b' }}>Questions</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>20 questions / chapter preloaded</div>
        </div>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#0f172a', borderColor: 'rgba(56, 189, 248, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38bdf8', marginBottom: '0.5rem' }}>
            <BarChart3 size={18} />
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>PASS THRESHOLD</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
            75% <span style={{ fontSize: '1rem', color: '#64748b' }}>(15/20)</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>Sequential unlock criteria</div>
        </div>
      </div>

      {/* Course Cohort Management Grid */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Activity size={20} color="#38bdf8" />
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em' }}>
          Course Cohort Management
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
                    {dmCourse.classification} • ELECTIVE 2
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

              {/* Data Mining Cohort Telemetry */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 10, 19, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>ENROLLED:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{dmStats?.enrolledCount || totalStudents} Students</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>TOTAL CHAPTERS:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>12 Published</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>TOTAL ATTEMPTS:</span>{' '}
                    <strong style={{ color: '#c084fc' }}>{dmStats?.totalAttempts || 0} Submissions</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>COHORT PASS RATE:</span>{' '}
                    <strong style={{ color: '#34d399' }}>{dmStats?.passRate ?? 0}%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '1rem', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/gradebook" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
                <FileSpreadsheet size={14} /> Master Gradebook
              </Link>
              <Link to={`/courses/${dmCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.15rem', background: 'linear-gradient(135deg, #9333ea 0%, #c084fc 100%)' }}>
                Manage Course <ArrowRight size={15} />
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
                    {ccCourse.classification} • ELECTIVE 4
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

              {/* Cloud Computing Cohort Telemetry */}
              <div
                style={{
                  backgroundColor: 'rgba(7, 10, 19, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1.5rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>ENROLLED:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>{ccStats?.enrolledCount || totalStudents} Students</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>TOTAL CHAPTERS:</span>{' '}
                    <strong style={{ color: '#f8fafc' }}>12 Published</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>TOTAL ATTEMPTS:</span>{' '}
                    <strong style={{ color: '#38bdf8' }}>{ccStats?.totalAttempts || 0} Submissions</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>COHORT PASS RATE:</span>{' '}
                    <strong style={{ color: '#34d399' }}>{ccStats?.passRate ?? 0}%</strong>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '1rem', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/gradebook" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>
                <FileSpreadsheet size={14} /> Master Gradebook
              </Link>
              <Link to={`/courses/${ccCourse.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1.15rem' }}>
                Manage Course <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Cohort Real-time Assessment Feed */}
      {recentActivity.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--text-muted)" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>
                Live Cohort Assessment Feed
              </h3>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
              Recent Student Submissions Across Electives
            </span>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Enrolled Student</th>
                  <th>Course Code</th>
                  <th>Chapter Reference</th>
                  <th>Assessment Score</th>
                  <th>Threshold Status</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((a, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>
                      {a.student}
                    </td>
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

export default FacultyDashboard;

