import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { quizzesApi } from '../../api';

const QuizAttemptView = ({ attemptData, onCompleted, onCancel }) => {
  const [attempt, setAttempt] = useState(attemptData.attempt);
  const [questions, setQuestions] = useState(attemptData.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const map = {};
    if (attemptData.savedAnswers) {
      attemptData.savedAnswers.forEach((a) => {
        if (a.selectedOptionId) map[a.questionId] = a.selectedOptionId;
      });
    }
    return map;
  });
  const [remainingSeconds, setRemainingSeconds] = useState(attemptData.attempt.remainingSeconds || 600);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Countdown timer
  useEffect(() => {
    if (result) return; // Stop timer if already graded

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [result]);

  const handleAutoTimeout = async () => {
    if (submitting || result) return;
    setSubmitting(true);
    try {
      const res = await quizzesApi.submitAttempt(attempt.id);
      setResult(res.result);
      if (res.result?.isPassed) {
        triggerConfetti();
      }
    } catch (err) {
      setError('Time expired. Auto-submission attempted.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectOption = async (questionId, optionId) => {
    if (submitting || result) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));

    try {
      await quizzesApi.saveAnswer(attempt.id, questionId, optionId);
    } catch (err) {
      console.error('Failed to sync answer to server:', err);
    }
  };

  const handleSubmit = async () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    const unansweredCount = questions.length - answeredCount;

    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Are you sure you want to finalize and submit this attempt?`
      );
      if (!confirmSubmit) return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await quizzesApi.submitAttempt(attempt.id);
      setResult(res.result);
      if (res.result?.isPassed) {
        triggerConfetti();
      }
    } catch (err) {
      setError(err.message || 'Failed to submit quiz attempt.');
    } finally {
      setSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if confetti not supported
    }
  };

  // Format time (MM:SS)
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredTotal = Object.keys(selectedAnswers).length;

  if (result) {
    return (
      <div className="card" style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          {result.isPassed ? (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--success-bg)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <CheckCircle2 size={48} />
            </div>
          ) : (
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <AlertTriangle size={48} />
            </div>
          )}

          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            {result.isPassed ? 'Assessment Passed!' : 'Assessment Not Passed'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem' }}>
            {result.isPassed
              ? `Outstanding performance! You met the 75% curriculum threshold.`
              : `Minimum passing score is 15/20 (75%). Review the materials and retake when ready.`}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            padding: '1.5rem',
            backgroundColor: '#f8fafc',
            borderRadius: 'var(--radius-md)',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Correct Answers</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: result.isPassed ? 'var(--success)' : 'var(--danger)' }}>
                {result.correctAnswers} / {result.totalQuestions}
              </div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Percentage</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: result.isPassed ? 'var(--success)' : 'var(--danger)' }}>
                {result.scorePercentage}%
              </div>
            </div>
          </div>

          {result.nextChapterUnlocked && (
            <div className="alert alert-success" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <CheckCircle2 size={20} />
              <div>
                <strong>Sequential Unlocking Complete!</strong>
                <div>
                  Chapter {result.nextChapterUnlocked.chapterNumber}: {result.nextChapterUnlocked.title} is now available!
                </div>
              </div>
            </div>
          )}

          <button onClick={onCompleted} className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
            Return to Chapter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '1rem auto' }}>
      {/* Header bar with timer */}
      <div
        className="card"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          padding: '1rem 1.5rem',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{attempt.quizTitle || 'Chapter Assessment'}</h3>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Answered {answeredTotal} of {questions.length} questions • Minimum 15/20 required to pass
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: remainingSeconds < 60 ? '#ef4444' : '#1e293b',
          color: '#ffffff',
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '0.05em'
        }}>
          <Clock size={18} />
          {formatTime(remainingSeconds)}
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main Question Card */}
        {currentQ && (
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>1 point</span>
            </div>

            <p style={{ fontSize: '1.15rem', fontWeight: 500, lineHeight: 1.6, color: '#0f172a', marginBottom: '2rem' }}>
              {currentQ.questionText}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {currentQ.options.map((opt) => {
                const isSelected = selectedAnswers[currentQ.id] === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, opt.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                      backgroundColor: isSelected ? 'var(--primary-light)' : '#ffffff',
                      color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: isSelected ? 'var(--primary)' : '#f1f5f9',
                        color: isSelected ? '#ffffff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        flexShrink: 0
                      }}
                    >
                      {opt.optionLabel}
                    </div>
                    <span style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{opt.optionText}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="btn btn-outline"
              >
                <ArrowLeft size={16} /> Previous
              </button>

              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="btn btn-outline"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.5rem' }}
                >
                  <Send size={16} /> {submitting ? 'Grading...' : 'Submit Final Quiz'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Question Grid Sidebar */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1rem' }}>
            Question Palette
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {questions.map((q, idx) => {
              const isAnswered = Boolean(selectedAnswers[q.id]);
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(idx)}
                  style={{
                    height: '36px',
                    borderRadius: '6px',
                    border: isCurrent ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: isAnswered ? 'var(--primary-light)' : '#ffffff',
                    color: isAnswered ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: isCurrent || isAnswered ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                  title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '0.75rem' }}
            >
              <Send size={16} /> {submitting ? 'Grading...' : 'Finalize & Submit'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              Exit Attempt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAttemptView;

