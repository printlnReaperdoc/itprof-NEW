import React, { createContext, useContext, useState, useEffect } from 'react';

const LDMContext = createContext(null);

export const LDMProvider = ({ children }) => {
  const [isLDM, setIsLDM] = useState(() => {
    try {
      const saved = localStorage.getItem('itprof_ldm_mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('itprof_ldm_mode', String(isLDM));
    } catch (e) {
      console.warn('Could not persist LDM preference:', e);
    }

    if (isLDM) {
      document.documentElement.classList.add('ldm-mode');
      document.body.classList.add('ldm-mode');
    } else {
      document.documentElement.classList.remove('ldm-mode');
      document.body.classList.remove('ldm-mode');
    }
  }, [isLDM]);

  const toggleLDM = () => {
    setIsLDM((prev) => {
      const next = !prev;
      setNotification({
        type: next ? 'enabled' : 'disabled',
        message: next
          ? '⚡ Low Detail Mode (LDM) Activated: Animations, blurs, and ambient glow disabled for optimal performance.'
          : '✨ High-Fidelity Mode Activated: Full cyber animations, glassmorphism, and neon telemetry restored.'
      });
      setTimeout(() => setNotification(null), 3500);
      return next;
    });
  };

  const enableLDM = () => setIsLDM(true);
  const disableLDM = () => setIsLDM(false);

  return (
    <LDMContext.Provider value={{ isLDM, toggleLDM, enableLDM, disableLDM }}>
      {children}
      {notification && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: isLDM ? '#1e293b' : 'rgba(12, 19, 34, 0.95)',
            backdropFilter: isLDM ? 'none' : 'blur(12px)',
            border: isLDM ? '1px solid #fbbf24' : '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '12px',
            padding: '0.85rem 1.25rem',
            color: '#f8fafc',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: isLDM ? 'none' : '0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '440px',
            animation: isLDM ? 'none' : 'cyberFadeIn 0.25s ease-out'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{isLDM ? '⚡' : '✨'}</span>
          <span>{notification.message}</span>
        </div>
      )}
    </LDMContext.Provider>
  );
};

export const useLDM = () => {
  const context = useContext(LDMContext);
  if (!context) {
    throw new Error('useLDM must be used within an LDMProvider');
  }
  return context;
};

export default LDMContext;

