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
  Sparkles
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
      // Don't intercept if user is typing in an input
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
              backgroundColor: '#eff6ff',
              borderLeft: '4px solid #3b82f6',
              padding: '1rem 1.25rem',
              borderRadius: '0 8px 8px 0',
              margin: '1rem 0',
              color: '#1e40af',
              fontSize: '1rem',
              fontWeight: 500
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
              paddingLeft: '1.5rem',
              margin: '1.25rem 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {Array.isArray(block.content) &&
              block.content.map((item, bIdx) => (
                <li key={bIdx} style={{ fontSize: '1.05rem', lineHeight: 1.5, color: '#1e293b' }}>
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
              backgroundColor: '#0f172a',
              color: '#38bdf8',
              padding: '1.25rem',
              borderRadius: '8px',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '0.9rem',
              overflowX: 'auto',
              margin: '1.25rem 0',
              border: '1px solid #334155'
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
              backgroundColor: '#f8fafc',
              border: '1px dashed #94a3b8',
              borderRadius: '8px',
              padding: '1.5rem',
              textAlign: 'center',
              fontFamily: 'Consolas, monospace',
              color: '#0f172a',
              fontWeight: 600,
              margin: '1.25rem 0'
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Architecture Workflow Diagram
            </div>
            {block.content}
          </div>
        );

      case 'table':
        return (
          <div key={idx} className="table-container" style={{ margin: '1.25rem 0' }}>
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
          <p key={idx} style={{ fontSize: '1.05rem', lineHeight: 1.6, margin: '1rem 0', color: '#334155' }}>
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
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: isFullscreen ? '0px' : 'var(--radius-lg)',
        boxShadow: isFullscreen ? 'none' : 'var(--shadow-md)',
        overflow: 'hidden',
        height: isFullscreen ? '100vh' : 'auto',
        minHeight: isFullscreen ? '100vh' : '520px'
      }}
    >
      {/* Top Header Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.25rem',
          backgroundColor: '#0f172a',
          color: '#ffffff'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={18} color="#38bdf8" />
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
            {presentation.title || 'Interactive Presentation'}
          </span>
          <span
            style={{
              backgroundColor: '#334155',
              padding: '0.15rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 500
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
                color: '#ffffff',
                borderColor: '#475569',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem'
              }}
              title="Edit Slide Deck"
            >
              <Edit size={14} /> Edit Slides
            </button>
          )}

          <button
            onClick={() => setShowOverview((prev) => !prev)}
            className="btn btn-outline"
            style={{
              color: '#ffffff',
              borderColor: '#475569',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              backgroundColor: showOverview ? '#334155' : 'transparent'
            }}
            title="Toggle Slide Overview (O)"
          >
            <Layers size={14} /> Slides
          </button>

          <button
            onClick={() => setShowNotes((prev) => !prev)}
            className="btn btn-outline"
            style={{
              color: '#ffffff',
              borderColor: '#475569',
              padding: '0.35rem 0.75rem',
              fontSize: '0.75rem',
              backgroundColor: showNotes ? '#334155' : 'transparent'
            }}
            title="Toggle Presenter Notes (N)"
          >
            <FileText size={14} /> Notes
          </button>

          <button
            onClick={toggleFullscreen}
            className="btn btn-outline"
            style={{
              color: '#ffffff',
              borderColor: '#475569',
              padding: '0.35rem 0.5rem',
              fontSize: '0.75rem'
            }}
            title="Toggle Fullscreen (F)"
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
          backgroundColor: '#f8fafc',
          overflow: 'hidden'
        }}
      >
        {/* Slide Overview Drawer */}
        {showOverview && (
          <div
            style={{
              width: '240px',
              borderRight: '1px solid var(--border-color)',
              backgroundColor: '#ffffff',
              padding: '1rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              zIndex: 10
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
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
                  padding: '0.6rem 0.75rem',
                  borderRadius: '6px',
                  border: idx === currentSlideIndex ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                  backgroundColor: idx === currentSlideIndex ? 'var(--primary-light)' : '#ffffff',
                  color: idx === currentSlideIndex ? 'var(--primary)' : 'var(--text-main)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: idx === currentSlideIndex ? 600 : 400
                }}
              >
                Slide {idx + 1}: {s.title}
              </button>
            ))}
          </div>
        )}

        {/* Slide Display Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: isFullscreen ? '4rem 6rem' : '2.5rem 3rem',
            backgroundColor: '#ffffff',
            overflowY: 'auto'
          }}
        >
          {currentSlide && (
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Slide {currentSlideIndex + 1} of {totalSlides}
                </span>
              </div>
              <h2
                style={{
                  fontSize: isFullscreen ? '2.25rem' : '1.75rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1.5rem',
                  borderBottom: '2px solid #e2e8f0',
                  paddingBottom: '0.75rem'
                }}
              >
                {currentSlide.title}
              </h2>

              <div style={{ minHeight: '220px' }}>
                {currentSlide.contentBlocks?.map((block, idx) => renderContentBlock(block, idx))}
              </div>
            </div>
          )}
        </div>

        {/* Presenter Notes Sidebar */}
        {showNotes && (
          <div
            style={{
              width: '300px',
              borderLeft: '1px solid var(--border-color)',
              backgroundColor: '#fffbeb',
              padding: '1.5rem',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#b45309', fontWeight: 600, fontSize: '0.85rem' }}>
              <FileText size={16} /> PRESENTER & STUDY NOTES
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#78350f' }}>
              {currentSlide?.notes || 'No presenter notes attached to this slide.'}
            </p>
          </div>
        )}
      </div>

      {/* Slide Navigation Bar & Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.85rem' }}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className="btn btn-primary"
            style={{ padding: '0.4rem 0.85rem' }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        {/* Progress Dots / Counter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            {currentSlideIndex + 1} / {totalSlides}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                style={{
                  width: idx === currentSlideIndex ? '18px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: idx === currentSlideIndex ? 'var(--primary)' : '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Keyboard shortcut legend */}
        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }} className="no-print">
          Keys: ← / → / Space / F
        </div>
      </div>
    </div>
  );
};

export default PresentationViewer;

