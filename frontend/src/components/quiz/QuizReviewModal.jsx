import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import { CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react';
import { quizzesApi } from '../../api';

const QuizReviewModal = ({ isOpen, onClose, attemptId }) => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && attemptId) {
      setLoading(true);
      setError(null);
      quizzesApi
        .getAttemptReview(attemptId)
        .then((res) => setReview(res.review))
        .catch((err) => setError(err.message || 'Failed to load attempt review'))
        .finally(() => setLoading(false));
    }
  }, [isOpen, attemptId]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assessment Attempt Detailed Review" maxWidth="850px">
      {loading ? (
        <LoadingSpinner message="Loading attempt review..." />
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : review ? (
        <div>
          {/* Summary Box */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg-app)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.75rem',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Candidate</div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {review.student?.fullName} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>(@{review.student?.username})</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', fontFamily: 'var(--font-mono)' }}>
                Course: <span style={{ color: 'var(--cloud-accent)' }}>{review.course?.courseCode}</span> • Chapter {review.chapter?.chapterNumber}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Score</div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: review.isPassed ? 'var(--success)' : 'var(--danger)' }}>
                  {review.correctAnswers} / {review.questions?.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Evaluation</div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  color: review.isPassed ? 'var(--success)' : 'var(--danger)',
                  marginTop: '0.35rem',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  backgroundColor: review.isPassed ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  border: `1px solid ${review.isPassed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                }}>
                  {review.isPassed ? 'PASSED (≥75%)' : 'FAILED (<75%)'}
                </div>
              </div>
            </div>
          </div>

          {/* Question by Question Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {review.questions?.map((q, idx) => {
              const isCorrect = q.isCorrect;
              return (
                <div
                  key={q.id}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderLeft: `4px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    backgroundColor: 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      Question {idx + 1}
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      color: isCorrect ? 'var(--success)' : 'var(--danger)'
                    }}>
                      {isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                      {isCorrect ? 'Correct (+1 pt)' : 'Incorrect (0 pts)'}
                    </span>
                  </div>

                  <p style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: 1.6 }}>
                    {q.questionText}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {q.options?.map((opt) => {
                      const isStudentSelected = q.selectedOptionId === opt.id;
                      const isCorrectAnswer = opt.isCorrect;

                      let bgColor = 'var(--bg-app)';
                      let borderColor = 'var(--border-color)';
                      let textColor = 'var(--text-main)';

                      if (isCorrectAnswer) {
                        bgColor = 'rgba(16, 185, 129, 0.12)';
                        borderColor = 'rgba(16, 185, 129, 0.4)';
                        textColor = '#34d399';
                      } else if (isStudentSelected && !isCorrectAnswer) {
                        bgColor = 'rgba(239, 68, 68, 0.12)';
                        borderColor = 'rgba(239, 68, 68, 0.4)';
                        textColor = '#f87171';
                      }

                      return (
                        <div
                          key={opt.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.65rem 0.95rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            color: textColor,
                            fontSize: '0.9rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{opt.optionLabel}.</span>
                            <span>{opt.optionText}</span>
                          </div>

                          <div style={{ fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                            {isCorrectAnswer && (
                              <span style={{ color: 'var(--success)', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                                Correct Key
                              </span>
                            )}
                            {isStudentSelected && !isCorrectAnswer && (
                              <span style={{ color: 'var(--danger)', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: 'rgba(239, 68, 68, 0.2)' }}>
                                Your Answer
                              </span>
                            )}
                            {isStudentSelected && isCorrectAnswer && (
                              <span style={{ color: 'var(--success)', marginLeft: '0.5rem', opacity: 0.85 }}>
                                • Your Answer
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default QuizReviewModal;

