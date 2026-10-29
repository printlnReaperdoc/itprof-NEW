import React from 'react';
import { useLDM } from '../../context/LDMContext';
import { Zap, Sparkles } from 'lucide-react';

const LdmToggle = ({ compact = false, showLabel = true }) => {
  const { isLDM, toggleLDM } = useLDM();

  return (
    <button
      type="button"
      onClick={toggleLDM}
      title={
        isLDM
          ? 'Low Detail Mode is ACTIVE. Click to restore High-Fidelity animations, blurs, and neon glows.'
          : 'Low Detail Mode is OFF. Click to disable animations, glass blurs, and shadows for maximum performance.'
      }
      aria-label="Toggle Low Detail Mode"
      aria-pressed={isLDM}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: compact ? '0.35rem 0.65rem' : '0.42rem 0.85rem',
        fontSize: '0.78rem',
        fontWeight: 700,
        fontFamily: 'var(--font-mono)',
        borderRadius: '20px',
        border: isLDM ? '1px solid #fbbf24' : '1px solid rgba(56, 189, 248, 0.4)',
        backgroundColor: isLDM ? 'rgba(251, 191, 36, 0.15)' : 'rgba(56, 189, 248, 0.08)',
        color: isLDM ? '#fbbf24' : '#38bdf8',
        cursor: 'pointer',
        boxShadow: isLDM ? 'none' : '0 0 12px rgba(56, 189, 248, 0.2)',
        transition: isLDM ? 'none' : 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        userSelect: 'none'
      }}
    >
      {isLDM ? (
        <Zap size={14} style={{ color: '#fbbf24' }} />
      ) : (
        <Sparkles size={14} style={{ color: '#38bdf8' }} />
      )}

      {showLabel && (
        <span>
          LDM: <strong style={{ color: isLDM ? '#fde68a' : '#ffffff' }}>{isLDM ? 'ON' : 'OFF'}</strong>
        </span>
      )}
    </button>
  );
};

export default LdmToggle;

