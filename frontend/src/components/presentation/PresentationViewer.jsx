import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  List,
  Edit,
  Layers,
  Sparkles,
  Terminal,
  Activity
} from 'lucide-react';

const PresentationViewer = ({ presentation, onEdit, isFaculty = false }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const slides = presentation?.slides || [];
  const totalSlides = slides.length;
  const currentSlide = slides[currentSlideIndex] || null;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes((prev) => !prev);
      } else if (e.key.toLowerCase() === 'o') {
        setShowOverview((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  if (!presentation || totalSlides === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No presentation slides available for this chapter.</p>
      </div>
    );
  }

  // Render individual slide content blocks
  const renderContentBlock = (block, idx) => {
    switch (block.type) {
      case 'callout':
        return (
          <div
            key={idx}
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.08)',
              borderLeft: '4px solid #38bdf8',
              padding: '1.25rem 1.5rem',
              borderRadius: '0 8px 8px 0',
              margin: '1.5rem 0',
              color: '#bae6fd',
              fontSize: '1.05rem',
              fontWeight: 500,
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.08)'
            }}
          >
            {block.content}
          </div>
        );

      case 'bullets':
        return (
          <ul
            key={idx}
            style={{
              paddingLeft: '1.75rem',
              margin: '1.5rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {Array.isArray(block.content) &&
              block.content.map((item, bIdx) => (
                <li key={bIdx} style={{ fontSize: '1.08rem', lineHeight: 1.6, color: '#e2e8f0' }}>
                  {item}
                </li>
              ))}
          </ul>
        );

      case 'code':
        return (
          <pre
            key={idx}
            style={{
              backgroundColor: '#030712',
              color: '#38bdf8',
              padding: '1.5rem',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              overflowX: 'auto',
              margin: '1.5rem 0',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.7)'
            }}
          >
            <code>{block.content}</code>
          </pre>
        );

      case 'diagram':
        return (
          <div
            key={idx}
            style={{
              backgroundColor: '#0a101f',
              border: '1px dashed rgba(56, 189, 248, 0.35)',
              borderRadius: '10px',
              padding: '1.75rem',
              textAlign: 'center',
              fontFamily: 'var(--font-mono)',
              color: '#f8fafc',
              fontWeight: 600,
              fontSize: '0.95rem',
              margin: '1.5rem 0',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.08)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginBottom: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ✦ ARCHITECTURE PIPELINE & WORKFLOW ✦
            </div>
            {block.content}
          </div>
        );

      case 'table':
        return (
          <div key={idx} className="table-container" style={{ margin: '1.5rem 0', borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <table className="table">
              {block.content?.headers && (
                <thead>
                  <tr>
                    {block.content.headers.map((h, hIdx) => (
                      <th key={hIdx}>{h}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {block.content?.rows?.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'text':
      default:
        return (
          <p key={idx} style={{ fontSize: '1.08rem', lineHeight: 1.7, margin: '1.25rem 0', color: '#cbd5e1' }}>
            {block.content}
          </p>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#090d18',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: isFullscreen ? '0px' : 'var(--radius-lg)',
        boxShadow: isFullscreen ? 'none' : '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(56, 189, 248, 0.15)',
        overflow: 'hidden',
        height: isFullscreen ? '100vh' : 'auto',
        minHeight: isFullscreen ? '100vh' : '560px'
      }}
    >
      {/* Top Header Controls Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.85rem 1.5rem',
          backgroundColor: '#070b14',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={18} color="#38bdf8" />
          <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#f8fafc' }}>
            {presentation.title || 'Interactive Presentation'}
          </span>
          <span
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              padding: '0.15rem 0.55rem',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)'
            }}
          >
            v{presentation.version || 1}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isFaculty && (
            <button
              onClick={onEdit}
              className="btn btn-outline"
              style={{
                borderColor: 'rgba(192, 132, 252, 0.35)',
                color: '#c084fc',
                padding: '0.35rem 0.75rem',
                fontSize: '0.78rem'
              }}
              title="Edit Slide Deck"
            >
              <Edit size={14} /> Edit Deck
            </button>
          )}

          <button
            onClick={() => setShowOverview((prev) => !prev)}
            className="btn btn-outline"
            style={{
              borderColor: showOverview ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)',
              backgroundColor: showOverview ? 'rgba(56, 189, 248, 0.15)' : 'transparent',
              color: showOverview ? '#38bdf8' : '#cbd5e1',
              padding: '0.35rem 0.75rem',
              fontSize: '0.78rem'
            }}
            title="Toggle Slide Overview (O)"
          >
            <Layers size={14} /> Index (O)
          </button>

          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className="btn btn-outline"
            style={{
              borderColor: showNotes ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)',
              backgroundColor: showNotes ? 'rgba(251, 191, 36, 0.15)' : 'transparent',
              color: showNotes ? '#fbbf24' : '#cbd5e1',
              padding: '0.35rem 0.75rem',
              fontSize: '0.78rem'
            }}
            title="Toggle Presenter Notes (N)"
          >
            <FileText size={14} /> Notes (N)
          </button>

          <button
            onClick={toggleFullscreen}
            className="btn btn-outline"
            style={{
              padding: '0.35rem 0.55rem',
              fontSize: '0.78rem',
              color: '#f8fafc'
            }}
            title="Toggle Fullscreen Theater (F)"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Slide Body */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          backgroundColor: '#090d18',
          overflow: 'hidden'
        }}
      >
        {/* Slide Overview Drawer */}
        {showOverview && (
          <div
            style={{
              width: '260px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              backgroundColor: '#0a0f1d',
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 10
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              SLIDE INDEX
            </div>
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  setShowOverview(false);
                }}
                style={{
                  textAlign: 'left',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: idx === currentSlideIndex ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: idx === currentSlideIndex ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                  color: idx === currentSlideIndex ? '#38bdf8' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: idx === currentSlideIndex ? 600 : 400,
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#64748b', display: 'block', marginBottom: '0.15rem' }}>
                  SLIDE {idx + 1}
                </span>
                {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Slide Display Area */}
        <div
          className="tech-grid-bg"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isFullscreen ? '4rem 6rem' : '3rem 3.5rem',
            backgroundColor: '#090d18',
            overflowY: 'auto'
          }}
        >
          {currentSlide && (
            <div style={{ maxWidth: '920px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  SLIDE {currentSlideIndex + 1} OF {totalSlides}
                </span>
              </div>
              <h2
                style={{
                  fontSize: isFullscreen ? '2.5rem' : '1.85rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: '#f8fafc',
                  marginBottom: '1.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingBottom: '0.85rem'
                }}
              >
                {currentSlide.title}
              </h2>

              <div style={{ minHeight: '240px' }}>
                {currentSlide.contentBlocks?.map((block, idx) => renderContentBlock(block, idx))}
              </div>
            </div>
          )}
        </div>

        {/* Presenter Notes Sidebar */}
        {showNotes && (
          <div
            style={{
              width: '320px',
              borderLeft: '1px solid rgba(251, 191, 36, 0.25)',
              backgroundColor: '#0e1205',
              padding: '1.75rem',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', color: '#fbbf24', fontWeight: 700, fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
              <FileText size={15} /> PRESENTER NOTES (STUDY GUIDE)
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: '#fef3c7' }}>
              {currentSlide?.notes || 'No presenter notes recorded for this slide.'}
            </p>
          </div>
        )}
      </div>

      {/* Slide Navigation Bar & Footer Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.85rem 1.75rem',
          backgroundColor: '#070b14',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="btn btn-outline"
            style={{ padding: '0.45rem 1rem' }}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="btn btn-primary"
            style={{ padding: '0.45rem 1rem' }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* Progress Counter & Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            {currentSlideIndex + 1} / {totalSlides}
          </span>
          <div style={{ display: 'flex', gap: '5px' }}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                style={{
                  width: idx === currentSlideIndex ? '20px' : '7px',
                  height: '7px',
                  borderRadius: '4px',
                  backgroundColor: idx === currentSlideIndex ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)',
                  boxShadow: idx === currentSlideIndex ? '0 0 10px rgba(56, 189, 248, 0.6)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                title={`Jump to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }} className="no-print">
          Keys: ← / → / Space / F (Fullscreen) / N (Notes)
        </div>
      </div>
    </div>
  );
};

export default PresentationViewer;
