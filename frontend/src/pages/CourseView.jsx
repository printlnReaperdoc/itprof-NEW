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
  FileSpreadsheet
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

  if (loading) return <LoadingSpinner message="Loading course curriculum..." />;
  if (error || !course) return <div className="container" style={{ padding: '2rem' }}><div className="alert alert-danger">{error || 'Course not found'}</div></div>;

  const isDataMining = course.courseCode.includes('411');

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      {/* Course Header Banner */}
      <div
        className="card"
        style={{
          background: isDataMining
            ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
            : 'linear-gradient(135deg, #082f49, #0369a1)',
          color: '#ffffff',
          marginBottom: '2rem',
          padding: '2.5rem',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '0.2rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em'
              }}>
                {course.classification}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                {course.academicDesignation}
              </span>
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {course.courseTitle}
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.6 }}>
              {course.description}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link
              to={`/gradebook?courseId=${course.id}`}
              className="btn btn-outline"
              style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.4)' }}
            >
              <FileSpreadsheet size={16} /> Course Gradebook
            </Link>
          </div>
        </div>
      </div>

      {/* Modules and Chapters List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {modules.map((mod) => (
          <div key={mod.id} className="card" style={{ padding: '1.75rem' }}>
            <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Module {mod.moduleNumber}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                {mod.title}
              </h2>
              {mod.description && (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
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
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: isLocked ? '#f8fafc' : '#ffffff',
                      opacity: isLocked ? 0.75 : 1,
                      gap: '1rem',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '260px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: ch.status === 'passed' ? 'var(--success-bg)' : isLocked ? '#f1f5f9' : 'var(--primary-light)',
                          color: ch.status === 'passed' ? 'var(--success)' : isLocked ? '#94a3b8' : 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          flexShrink: 0
                        }}
                      >
                        {ch.chapterNumber}
                      </div>

                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>
                          Chapter {ch.chapterNumber}: {ch.title}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
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
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            Best: {ch.highestScore} / 20 ({ch.highestScorePercentage}%)
                          </div>
                        )}
                      </div>

                      {isLocked ? (
                        <button
                          disabled
                          className="btn btn-outline"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', opacity: 0.6 }}
                          title="Pass previous chapter quiz (minimum 15/20) to unlock this chapter"
                        >
                          <Lock size={14} /> Locked
                        </button>
                      ) : (
                        <Link
                          to={`/chapters/${ch.id}`}
                          className="btn btn-primary"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
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

