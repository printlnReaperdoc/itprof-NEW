import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, AlertTriangle, ArrowRight, ArrowLeft, Send, ShieldAlert, Cpu } from 'lucide-react';
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
    if (result) return;

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
      setError('Assessment duration expired. Server auto-submitted.');
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
        `Notice: You have ${unansweredCount} unanswered question(s). Finalize and submit this attempt for grading?`
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
    // Skip CPU/GPU demanding canvas confetti when Low Detail Mode (LDM) is engaged
    if (document.documentElement.classList.contains('ldm-mode') || document.body.classList.contains('ldm-mode')) {
      return;
    }
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Ignore if unsupported
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const answeredTotal = Object.keys(selectedAnswers).length;

  if (result) {
    return (
      <div
        className="card tech-grid-bg"
        style={{
          maxWidth: '720px',
          margin: '2rem auto',
          textAlign: 'center',
          padding: '3rem 2.5rem',
          backgroundColor: '#0c1222',
          borderColor: result.isPassed ? 'rgba(52, 211, 153, 0.4)' : 'rgba(248, 113, 113, 0.4)',
          boxShadow: result.isPassed
            ? '0 0 35px rgba(52, 211, 153, 0.2)'
            : '0 0 35px rgba(248, 113, 113, 0.2)'
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          {result.isPassed ? (
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'rgba(52, 211, 153, 0.15)',
              border: '2px solid rgba(52, 211, 153, 0.5)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 25px rgba(52, 211, 153, 0.3)'
            }}>
              <CheckCircle2 size={50} />
            </div>
          ) : (
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'rgba(248, 113, 113, 0.15)',
              border: '2px solid rgba(248, 113, 113, 0.5)',
              color: '#f87171',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              boxShadow: '0 0 25px rgba(248, 113, 113, 0.3)'
            }}>
              <AlertTriangle size={50} />
            </div>
          )}

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f8fafc', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            {result.isPassed ? 'Assessment Verified: Passed' : 'Assessment Verification: Failed'}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            {result.isPassed
              ? `Curriculum benchmark achieved. Your score meets the 75% institutional requirement.`
              : `Minimum passing threshold is 15/20 (75%). You scored below the required threshold. Review the lecture slides and retake the assessment.`}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2.5rem',
            padding: '1.5rem',
            backgroundColor: '#080d19',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>CORRECT RESPONSES</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: result.isPassed ? '#34d399' : '#f87171' }}>
                {result.correctAnswers} / {result.totalQuestions}
              </div>
            </div>
            <div style={{ width: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>PERCENTAGE</div>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: result.isPassed ? '#34d399' : '#f87171' }}>
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
                  Chapter {result.nextChapterUnlocked.chapterNumber}: {result.nextChapterUnlocked.title} is now available in your curriculum!
                </div>
              </div>
            </div>
          )}

          <button onClick={onCompleted} className="btn btn-primary" style={{ padding: '0.8rem 2.5rem', fontSize: '1rem' }}>
            Return to Chapter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '960px', margin: '1rem auto' }}>
      {/* HUD Header bar with digital timer */}
      <div
        className="card tech-grid-bg"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          padding: '1.15rem 1.75rem',
          backgroundColor: '#090d18',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.12)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <Cpu size={16} color="#38bdf8" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
              {attempt.quizTitle || 'Chapter Timed Assessment'}
            </h3>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Answered {answeredTotal} of {questions.length} • Required Threshold: 15 / 20 (75%)
          </div>
        </div>

        {/* Digital Timer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: '0.55rem 1.25rem',
          borderRadius: '8px',
          backgroundColor: remainingSeconds < 60 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.12)',
          border: `1px solid ${remainingSeconds < 60 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.3)'}`,
          color: remainingSeconds < 60 ? '#f87171' : '#38bdf8',
          fontWeight: 800,
          fontSize: '1.25rem',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
          boxShadow: remainingSeconds < 60 ? '0 0 15px rgba(239, 68, 68, 0.3)' : '0 0 15px rgba(56, 189, 248, 0.2)'
        }}>
          <Clock size={19} />
          {formatTime(remainingSeconds)}
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 290px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main Question Display */}
        {currentQ && (
          <div key={currentQuestionIndex} className="card animate-fade-in" style={{ padding: '2.25rem', backgroundColor: '#0c1222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                QUESTION {currentQuestionIndex + 1} OF {questions.length}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>EQUAL WEIGHT: 1 PT</span>
            </div>

            <p style={{ fontSize: '1.18rem', fontWeight: 600, lineHeight: 1.6, color: '#f8fafc', marginBottom: '2.25rem' }}>
              {currentQ.questionText}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.75rem' }}>
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
                      padding: '1.1rem 1.4rem',
                      borderRadius: '8px',
                      border: isSelected ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                      backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                      color: isSelected ? '#ffffff' : '#cbd5e1',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? '0 0 15px rgba(56, 189, 248, 0.2)' : 'none'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        backgroundColor: isSelected ? '#0ea5e9' : 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        flexShrink: 0
                      }}
                    >
                      {opt.optionLabel}
                    </div>
                    <span style={{ fontSize: '0.98rem', lineHeight: 1.5 }}>{opt.optionText}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
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
                  style={{ padding: '0.65rem 1.75rem' }}
                >
                  <Send size={16} /> {submitting ? 'Submitting...' : 'Submit Final Assessment'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Question Palette Sidebar */}
        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#090d18' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
            QUESTION PALETTE
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.75rem' }}>
            {questions.map((q, idx) => {
              const isAnswered = Boolean(selectedAnswers[q.id]);
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(idx)}
                  style={{
                    height: '38px',
                    borderRadius: '6px',
                    border: isCurrent
                      ? '2px solid #38bdf8'
                      : isAnswered
                      ? '1px solid rgba(56, 189, 248, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    backgroundColor: isAnswered ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    color: isAnswered ? '#38bdf8' : '#64748b',
                    fontWeight: isCurrent || isAnswered ? 700 : 400,
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    boxShadow: isCurrent ? '0 0 10px rgba(56, 189, 248, 0.35)' : 'none'
                  }}
                  title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '0.75rem' }}
            >
              <Send size={16} /> {submitting ? 'Submitting...' : 'Finalize & Grade'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.8rem', color: '#94a3b8' }}
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
