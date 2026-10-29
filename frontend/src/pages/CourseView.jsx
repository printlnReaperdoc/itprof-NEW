import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesApi } from '../api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusBadge from '../components/common/StatusBadge';
import {
  BookOpen,
  ArrowRight,
  Lock,
  CheckCircle2,
  Database,
  Cloud,
  FileSpreadsheet,
  ArrowLeft,
  Layers
} from 'lucide-react';

const CourseView = () => {
  const { courseId } = useParams();
  const { isFaculty } = useAuth();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await coursesApi.getDetails(courseId);
      setCourse(res.course);
      setModules(res.modules || []);
    } catch (err) {
      setError(err.message || 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (loading) return <LoadingSpinner message="Loading course curriculum roadmap..." />;
  if (error || !course) return <div className="container" style={{ padding: '2rem' }}><div className="alert alert-danger">{error || 'Course not found'}</div></div>;

  const isDataMining = course.courseCode.includes('411');
  const accentColor = isDataMining ? '#c084fc' : '#38bdf8';

  return (
    <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
      {/* Back Link */}
      <div style={{ marginBottom: '1.25rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          <ArrowLeft size={15} /> Back to LMS Dashboard
        </Link>
      </div>

      {/* Course Header Banner */}
      <div
        className="card tech-grid-bg animate-fade-in"
        style={{
          backgroundColor: isDataMining ? '#140e26' : '#08172c',
          borderColor: isDataMining ? 'rgba(192, 132, 252, 0.35)' : 'rgba(56, 189, 248, 0.35)',
          color: '#ffffff',
          marginBottom: '2.5rem',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: `0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 25px -5px ${isDataMining ? 'rgba(192, 132, 252, 0.2)' : 'rgba(56, 189, 248, 0.2)'}`
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <span
                className="badge"
                style={{
                  backgroundColor: isDataMining ? 'rgba(192, 132, 252, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                  color: accentColor,
                  border: `1px solid ${isDataMining ? 'rgba(192, 132, 252, 0.4)' : 'rgba(56, 189, 248, 0.4)'}`
                }}
              >
                {course.classification}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                {course.academicDesignation}
              </span>
            </div>

            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#f8fafc', marginBottom: '0.6rem' }}>
              {course.courseTitle}
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.6 }}>
              {course.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link
              to={`/gradebook?courseId=${course.id}`}
              className="btn btn-outline"
              style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}
            >
              <FileSpreadsheet size={16} /> Course Gradebook Matrix
            </Link>
          </div>
        </div>
      </div>

      {/* Modules and Chapters List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {modules.map((mod) => (
          <div key={mod.id} className="card" style={{ padding: '2rem', backgroundColor: '#0c1222' }}>
            <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
                MODULE {mod.moduleNumber}
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.25rem' }}>
                {mod.title}
              </h2>
              {mod.description && (
                <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.3rem' }}>
                  {mod.description}
                </p>
              )}
            </div>

            {/* Chapters inside this module */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {mod.chapters?.map((ch) => {
                const isLocked = !isFaculty && ch.status === 'locked';

                return (
                  <div
                    key={ch.id}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.1rem 1.4rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: ch.status === 'passed' ? 'rgba(52, 211, 153, 0.25)' : isLocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(56, 189, 248, 0.25)',
                      backgroundColor: isLocked ? 'rgba(15, 23, 42, 0.4)' : '#0f172a',
                      opacity: isLocked ? 0.6 : 1,
                      gap: '1rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem', flex: 1, minWidth: '280px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          backgroundColor: ch.status === 'passed' ? 'rgba(52, 211, 153, 0.15)' : isLocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(56, 189, 248, 0.15)',
                          border: `1px solid ${ch.status === 'passed' ? 'rgba(52, 211, 153, 0.4)' : isLocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(56, 189, 248, 0.4)'}`,
                          color: ch.status === 'passed' ? '#34d399' : isLocked ? '#64748b' : '#38bdf8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          fontFamily: 'var(--font-mono)',
                          flexShrink: 0
                        }}
                      >
                        {ch.chapterNumber}
                      </div>

                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#f8fafc' }}>
                          Chapter {ch.chapterNumber}: {ch.title}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                          {ch.description}
                        </div>
                      </div>
                    </div>

                    {/* Progress indicators & actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ marginBottom: '0.25rem' }}>
                          <StatusBadge status={ch.status} />
                        </div>
                        {ch.highestScore !== null && (
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                            High: {ch.highestScore} / 20 ({ch.highestScorePercentage}%)
                          </div>
                        )}
                      </div>

                      {isLocked ? (
                        <button
                          disabled
                          className="btn btn-outline"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                          title="Pass previous chapter quiz (minimum 15/20) to unlock this chapter"
                        >
                          <Lock size={14} /> Locked
                        </button>
                      ) : (
                        <Link
                          to={`/chapters/${ch.id}`}
                          className="btn btn-primary"
                          style={{ padding: '0.45rem 1.15rem', fontSize: '0.85rem' }}
                        >
                          View Chapter <ArrowRight size={14} />
                        </Link>
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
  );
};

export default CourseView;
