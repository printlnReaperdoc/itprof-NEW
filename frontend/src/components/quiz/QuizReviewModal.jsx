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
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              gap: '1rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Candidate</div>
              <div style={{ fontWeight: 600 }}>{review.student?.fullName} (@{review.student?.username})</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Course: {review.course?.courseCode} • Chapter {review.chapter?.chapterNumber}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Score</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: review.isPassed ? 'var(--success)' : 'var(--danger)' }}>
                  {review.correctAnswers} / {review.questions?.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Result</div>
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: review.isPassed ? 'var(--success)' : 'var(--danger)',
                  marginTop: '0.35rem'
                }}>
                  {review.isPassed ? 'PASSED (≥75%)' : 'FAILED (<75%)'}
                </div>
              </div>
            </div>
          </div>

          {/* Question by Question Review */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {review.questions?.map((q, idx) => {
              const isCorrect = q.isCorrect;
              return (
                <div
                  key={q.id}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderLeft: `5px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'}`,
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.25rem',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Question {idx + 1}
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: isCorrect ? 'var(--success)' : 'var(--danger)'
                    }}>
                      {isCorrect ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                      {isCorrect ? 'Correct (+1 pt)' : 'Incorrect (0 pts)'}
                    </span>
                  </div>

                  <p style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                    {q.questionText}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {q.options?.map((opt) => {
                      const isStudentSelected = q.selectedOptionId === opt.id;
                      const isCorrectAnswer = opt.isCorrect;

                      let bgColor = '#ffffff';
                      let borderColor = 'var(--border-color)';
                      let textColor = 'var(--text-main)';

                      if (isCorrectAnswer) {
                        bgColor = 'var(--success-bg)';
                        borderColor = 'var(--success-border)';
                        textColor = '#166534';
                      } else if (isStudentSelected && !isCorrectAnswer) {
                        bgColor = 'var(--danger-bg)';
                        borderColor = 'var(--danger-border)';
                        textColor = '#991b1b';
                      }

                      return (
                        <div
                          key={opt.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.6rem 0.85rem',
                            borderRadius: 'var(--radius-sm)',
                            border: `1px solid ${borderColor}`,
                            backgroundColor: bgColor,
                            color: textColor,
                            fontSize: '0.9rem'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontWeight: 700 }}>{opt.optionLabel}.</span>
                            <span>{opt.optionText}</span>
                          </div>

                          <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                            {isCorrectAnswer && <span style={{ color: 'var(--success)' }}>Correct Key</span>}
                            {isStudentSelected && !isCorrectAnswer && <span style={{ color: 'var(--danger)' }}>Your Answer</span>}
                            {isStudentSelected && isCorrectAnswer && <span style={{ color: 'var(--success)' }}>• Your Answer</span>}
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

