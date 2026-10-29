import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzesApi } from '../api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import QuizAttemptView from '../components/quiz/QuizAttemptView';
import { AlertTriangle, ArrowLeft, ShieldAlert, FileText, BookOpen } from 'lucide-react';

const QuizPage = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const { isFaculty, user } = useAuth();

  const [attemptData, setAttemptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadingKeys, setDownloadingKeys] = useState(false);

  useEffect(() => {
    // If user is faculty, do not attempt to start a student quiz session
    if (isFaculty) {
      setLoading(false);
      return;
    }

    const initAttempt = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await quizzesApi.startAttempt(chapterId);
        setAttemptData(res);
      } catch (err) {
        setError(err.message || 'Unable to initiate quiz attempt.');
      } finally {
        setLoading(false);
      }
    };
    initAttempt();
  }, [chapterId, isFaculty]);

  const handleDownloadKeys = async () => {
    try {
      setDownloadingKeys(true);
      await quizzesApi.downloadAnswerKeysPDF();
    } catch (err) {
      alert(err.message || 'Failed to download answer keys PDF.');
    } finally {
      setDownloadingKeys(false);
    }
  };

  if (loading) return <LoadingSpinner message="Starting secure timed assessment session..." />;

  // Faculty block screen with management actions
  if (isFaculty) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div
          className="card"
          style={{
            maxWidth: '620px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: '#0c1322',
            borderColor: 'rgba(56, 189, 248, 0.3)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: 'var(--cloud-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}
          >
            <ShieldAlert size={34} />
          </div>

          <span
            className="badge"
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              marginBottom: '1rem'
            }}
          >
            FACULTY MANAGEMENT NOTICE
          </span>

          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.75rem' }}>
            Faculty Cannot Take Quizzes
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Curriculum assessments in the IT Professional Electives LMS are reserved strictly for enrolled student evaluation and sequential progression. As an authorized faculty member ({user?.firstName} {user?.surname}), you have privileges to manage question banks, review student topic gradebooks, and inspect answer keys.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(`/chapters/${chapterId}`)}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.5rem' }}
            >
              <BookOpen size={16} /> Return to Chapter Management
            </button>

            <button
              onClick={handleDownloadKeys}
              disabled={downloadingKeys}
              className="btn btn-outline"
              style={{ padding: '0.65rem 1.5rem', borderColor: 'var(--cloud-accent)', color: 'var(--cloud-accent)' }}
            >
              <FileText size={16} /> {downloadingKeys ? 'Generating PDF...' : 'Download Master Answer Keys'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '550px', margin: '0 auto', padding: '2.5rem' }}>
          <AlertTriangle size={48} color="var(--danger)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem' }}>Assessment Notice</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={() => navigate(`/chapters/${chapterId}`)} className="btn btn-primary">
            <ArrowLeft size={16} /> Return to Chapter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '1.5rem' }}>
      <QuizAttemptView
        attemptData={attemptData}
        onCompleted={() => navigate(`/chapters/${chapterId}`)}
        onCancel={() => navigate(`/chapters/${chapterId}`)}
      />
    </div>
  );
};

export default QuizPage;
