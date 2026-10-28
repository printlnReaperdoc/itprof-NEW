import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Save } from 'lucide-react';
import { lessonsApi } from '../../api';

const LessonEditorModal = ({ isOpen, onClose, lesson, chapterId, onSaved }) => {
  const [overview, setOverview] = useState('');
  const [objectives, setObjectives] = useState('');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lesson) {
      setOverview(lesson.overview || '');
      setObjectives(Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives.join('\n') : '');
      setContent(lesson.content || '');
    }
  }, [lesson]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const learningObjectives = objectives
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      await lessonsApi.update(chapterId, {
        overview,
        learningObjectives,
        content
      });

      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update lesson content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Faculty Lesson Content Editor" maxWidth="880px">
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group">
        <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>LESSON OVERVIEW & ABSTRACT</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={overview}
          onChange={(e) => setOverview(e.target.value)}
          placeholder="Concise technical overview of this chapter..."
        />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>LEARNING OBJECTIVES (ONE PER LINE)</label>
        <textarea
          className="form-textarea"
          rows={4}
          value={objectives}
          onChange={(e) => setObjectives(e.target.value)}
          placeholder="Objective 1&#10;Objective 2&#10;Objective 3"
        />
      </div>

      <div className="form-group">
        <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>DETAILED LESSON CONTENT (MARKDOWN)</label>
        <textarea
          className="form-textarea"
          rows={12}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="## 1. Section Title&#10;Detailed technical exposition..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Cancel
        </button>
        <button type="button" onClick={handleSave} disabled={saving} className="btn btn-primary">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Lesson Content'}
        </button>
      </div>
    </Modal>
  );
};

export default LessonEditorModal;
