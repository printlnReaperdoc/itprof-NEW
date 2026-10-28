import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzesApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import QuizAttemptView from '../components/quiz/QuizAttemptView';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

const QuizPage = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [attemptData, setAttemptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, [chapterId]);

  if (loading) return <LoadingSpinner message="Starting secure timed assessment session..." />;

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

