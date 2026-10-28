import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Upload, FileSpreadsheet, Code, CheckCircle2, AlertTriangle } from 'lucide-react';
import { quizzesApi } from '../../api';

const QuizImportModal = ({ isOpen, onClose, chapterId, onImported }) => {
  const [importMode, setImportMode] = useState('json'); // 'json' or 'file'
  const [jsonText, setJsonText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);

  const sampleJson = `[
  {
    "position": 1,
    "questionText": "What does KDD stand for?",
    "points": 1,
    "options": [
      { "label": "A", "text": "Knowledge Discovery in Databases", "isCorrect": true },
      { "label": "B", "text": "Kernel Data Distribution", "isCorrect": false },
      { "label": "C", "text": "Key Data Definitions", "isCorrect": false },
      { "label": "D", "text": "K-means Distance Derivation", "isCorrect": false }
    ]
  }
]`;

  const handleImport = async () => {
    setLoading(true);
    setValidationErrors([]);
    setSuccessMessage(null);

    try {
      if (importMode === 'json') {
        let parsed;
        try {
          parsed = JSON.parse(jsonText);
        } catch (e) {
          setValidationErrors(['Malformed JSON syntax: ' + e.message]);
          setLoading(false);
          return;
        }

        const res = await quizzesApi.importQuestions(chapterId, { questions: parsed }, false);
        setSuccessMessage(res.message);
        if (onImported) onImported();
      } else {
        if (!file) {
          setValidationErrors(['Please select a CSV or XLSX spreadsheet file to upload.']);
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        const res = await quizzesApi.importQuestions(chapterId, formData, true);
        setSuccessMessage(res.message);
        if (onImported) onImported();
      }
    } catch (err) {
      if (err.errors) {
        setValidationErrors(err.errors);
      } else {
        setValidationErrors([err.message || 'Import failed. Check format requirements.']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Faculty Quiz Import & Versioning" maxWidth="750px">
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={() => setImportMode('json')}
          className={`btn ${importMode === 'json' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Code size={16} /> JSON Import
        </button>
        <button
          type="button"
          onClick={() => setImportMode('file')}
          className={`btn ${importMode === 'file' ? 'btn-primary' : 'btn-outline'}`}
        >
          <FileSpreadsheet size={16} /> CSV / XLSX Spreadsheet
        </button>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} /> {successMessage}
        </div>
      )}

      {validationErrors.length > 0 && (
        <div className="alert alert-danger" style={{ display: 'block' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <AlertTriangle size={18} />
            <strong>Validation Errors ({validationErrors.length})</strong>
          </div>
          <ul style={{ paddingLeft: '1.5rem', margin: 0, fontSize: '0.85rem' }}>
            {validationErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {importMode === 'json' ? (
        <div className="form-group">
          <label className="form-label">Paste Questions JSON Array (Exactly 20 questions required)</label>
          <textarea
            className="form-textarea"
            rows={10}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '-0.01em' }}
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            placeholder={sampleJson}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Must contain 20 question objects with "questionText" and 4 "options" (A, B, C, D) with exactly one "isCorrect: true".
          </div>
        </div>
      ) : (
        <div className="form-group">
          <label className="form-label">Upload Spreadsheet (.csv or .xlsx)</label>
          <input
            type="file"
            accept=".csv, .xlsx"
            className="form-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Columns expected: <code>Position, Question, OptionA, OptionB, OptionC, OptionD, CorrectOption (A/B/C/D)</code>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <button type="button" onClick={onClose} className="btn btn-outline">
          Close
        </button>
        <button type="button" onClick={handleImport} disabled={loading} className="btn btn-primary">
          <Upload size={16} /> {loading ? 'Validating & Importing...' : 'Validate and Publish'}
        </button>
      </div>
    </Modal>
  );
};

export default QuizImportModal;

