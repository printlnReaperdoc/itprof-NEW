import React from 'react';

const LoadingSpinner = ({ message = 'Loading curriculum content...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid var(--border-color)',
        borderTopColor: 'var(--primary)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {message && <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{message}</p>}
    </div>
  );
};

export default LoadingSpinner;

