import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Plus, Trash2, ArrowUp, ArrowDown, Save } from 'lucide-react';
import { presentationsApi } from '../../api';

const PresentationEditorModal = ({ isOpen, onClose, presentation, chapterId, onSaved }) => {
  const [title, setTitle] = useState(presentation?.title || '');
  const [slides, setSlides] = useState(presentation?.slides || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Sync state when modal opens
  React.useEffect(() => {
    if (presentation) {
      setTitle(presentation.title || '');
      setSlides(presentation.slides ? JSON.parse(JSON.stringify(presentation.slides)) : []);
    }
  }, [presentation]);

  const handleAddSlide = () => {
    const newSlide = {
      slideNumber: slides.length + 1,
      title: 'New Slide Title',
      contentBlocks: [
        {
          type: 'bullets',
          content: ['Key concept point 1', 'Key concept point 2', 'Key concept point 3']
        }
      ],
      notes: 'Presenter and study guide notes for this slide.'
    };
    setSlides([...slides, newSlide]);
  };

  const handleDeleteSlide = (idx) => {
    if (slides.length <= 1) {
      alert('A presentation must have at least one slide.');
      return;
    }
    const filtered = slides.filter((_, i) => i !== idx);
    setSlides(filtered);
  };

  const handleMoveSlide = (idx, direction) => {
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= slides.length) return;
    const copy = [...slides];
    const [moved] = copy.splice(idx, 1);
    copy.splice(newIdx, 0, moved);
    setSlides(copy);
  };

  const handleSlideChange = (idx, field, value) => {
    const copy = [...slides];
    copy[idx][field] = value;
    setSlides(copy);
  };

  const handleBulletsChange = (idx, textValue) => {
    const copy = [...slides];
    const lines = textValue.split('\n').filter(l => l.trim().length > 0);
    if (!copy[idx].contentBlocks || copy[idx].contentBlocks.length === 0) {
      copy[idx].contentBlocks = [{ type: 'bullets', content: lines }];
    } else {
      copy[idx].contentBlocks[0] = { type: 'bullets', content: lines };
    }
    setSlides(copy);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await presentationsApi.update(chapterId, {
        title,
        slides
      });
      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save presentation updates.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Faculty Presentation Editor" maxWidth="800px">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group">
        <label className="form-label">Presentation Deck Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chapter 1: Introduction to Data Mining"
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1.5rem 0 1rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>
          Slides ({slides.length})
        </h4>
        <button type="button" onClick={handleAddSlide} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
          <Plus size={14} /> Add Slide
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {slides.map((s, idx) => {
          const firstBlock = s.contentBlocks?.[0];
          const bulletLines = Array.isArray(firstBlock?.content) ? firstBlock.content.join('\n') : '';

          return (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                backgroundColor: '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>
                  Slide #{idx + 1}
                </span>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => handleMoveSlide(idx, -1)}
                    disabled={idx === 0}
                    className="btn btn-outline"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    title="Move up"
                  >
                    <ArrowUp size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveSlide(idx, 1)}
                    disabled={idx === slides.length - 1}
                    className="btn btn-outline"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    title="Move down"
                  >
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(idx)}
                    className="btn btn-danger"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                    title="Delete slide"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Slide Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={s.title}
                  onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                  placeholder="Slide Title"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Slide Content (One bullet per line)</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={bulletLines}
                  onChange={(e) => handleBulletsChange(idx, e.target.value)}
                  placeholder="Point 1&#10;Point 2&#10;Point 3"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Presenter & Study Notes</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={s.notes || ''}
                  onChange={(e) => handleSlideChange(idx, 'notes', e.target.value)}
                  placeholder="Notes for instructor explanation and student review."
                />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
        <button type="button" onClick={handleSave} disabled={saving} className="btn btn-primary">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Presentation'}
        </button>
      </div>
    </Modal>
  );
};

export default PresentationEditorModal;

