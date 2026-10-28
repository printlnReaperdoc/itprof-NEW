import React from 'react';

const ProgressBar = ({ value = 0, max = 100, label = '', showPercentage = true, color = 'var(--primary)' }) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)' }}>
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--border-color)',
        borderRadius: '9999px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '9999px',
          transition: 'width 0.4s ease'
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;

