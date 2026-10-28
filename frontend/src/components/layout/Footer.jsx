import React from 'react';
import { Terminal, Cpu, Cloud, Database } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      backgroundColor: '#090d18',
      padding: '2.5rem 0',
      marginTop: 'auto',
      fontSize: '0.82rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f8fafc', fontWeight: 600, marginBottom: '0.3rem' }}>
            <Terminal size={16} color="var(--primary)" />
            University Department of Information Technology
          </div>
          <div>Fourth Year Professional Electives: Data Mining (ITEP411-T) & Cloud Computing (ITEP413-T)</div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#c084fc' }}>
              <Database size={13} /> Data Mining 411
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8' }}>
              <Cloud size={13} /> Cloud Computing 413
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            Designation: 4th Year, 1st Term (4-1) • Secure MERN Architecture
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
