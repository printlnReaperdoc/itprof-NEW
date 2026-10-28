import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      backgroundColor: '#ffffff',
      padding: '2rem 0',
      marginTop: 'auto',
      fontSize: '0.85rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <strong>University Department of Information Technology</strong>
          <div>Fourth Year Curriculum: Data Mining (ITEP411-T) & Cloud Computing (ITEP413-T)</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Academic Designation: 4th Year, 1st Term (4-1)</div>
          <div>MERN Production LMS • Production-Ready Platform</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

