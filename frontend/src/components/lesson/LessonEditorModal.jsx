import React, { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import {
  Save,
  Upload,
  Trash2,
  FileText,
  FileDown,
  Plus,
  CheckCircle2,
  AlertCircle,
  Eye,
  RefreshCw,
  FolderOpen,
  Cloud,
  BookOpen,
  ExternalLink,
  Play,
  Video
} from 'lucide-react';
import { lessonsApi } from '../../api';

const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const getFileTypeDetails = (filename = '', mimeType = '') => {
  const ext = filename.substring(filename.lastIndexOf('.')).toLowerCase();
  if (ext === '.pdf' || mimeType.includes('pdf')) {
    return {
      type: 'PDF',
      label: 'PDF Document',
      badgeColor: '#ef4444',
      badgeBg: 'rgba(239, 68, 68, 0.15)',
      badgeBorder: 'rgba(239, 68, 68, 0.35)',
      isPdf: true
    };
  }
  if (['.ppt', '.pptx'].includes(ext) || mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return {
      type: 'PPT',
      label: 'PowerPoint Deck',
      badgeColor: '#f97316',
      badgeBg: 'rgba(249, 115, 22, 0.15)',
      badgeBorder: 'rgba(249, 115, 22, 0.35)',
      isPpt: true
    };
  }
  return {
    type: 'DOC',
    label: ext.replace('.', '').toUpperCase() || 'Document',
    badgeColor: '#38bdf8',
    badgeBg: 'rgba(56, 189, 248, 0.15)',
    badgeBorder: 'rgba(56, 189, 248, 0.35)'
  };
};

const extractYouTubeId = (url = '') => {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = trimmed.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
};

const LessonEditorModal = ({ isOpen, onClose, lesson, chapterId, onSaved }) => {
  const [activeTab, setActiveTab] = useState('files'); // 'files' | 'content' | 'citations' | 'videos'
  const [overview, setOverview] = useState('');
  const [objectives, setObjectives] = useState('');
  const [content, setContent] = useState('');
  const [citations, setCitations] = useState([]);
  const [newCit, setNewCit] = useState({ citationText: '', url: '', title: '', sourceType: 'book' });
  const [videos, setVideos] = useState([]);
  const [newVid, setNewVid] = useState({ title: '', youtubeUrl: '', channel: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Files state
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fileInputRef = useRef(null);

  const loadLessonFiles = async () => {
    if (!chapterId) return;
    try {
      setLoadingFiles(true);
      const res = await lessonsApi.getByChapter(chapterId);
      if (res.files) {
        setFiles(res.files);
      }
      if (res.lesson?.citations) {
        setCitations(res.lesson.citations);
      }
      if (res.lesson?.videos) {
        setVideos(res.lesson.videos);
      }
    } catch (e) {
      console.warn('Could not load chapter files:', e.message);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    if (lesson) {
      setOverview(lesson.overview || '');
      setObjectives(Array.isArray(lesson.learningObjectives) ? lesson.learningObjectives.join('\n') : '');
      setContent(lesson.content || '');
      setCitations(Array.isArray(lesson.citations) ? lesson.citations : []);
      setVideos(Array.isArray(lesson.videos) ? lesson.videos : []);
    }
    if (isOpen && chapterId) {
      loadLessonFiles();
      setUploadError(null);
      setUploadSuccess(null);
    }
  }, [lesson, isOpen, chapterId]);

  const handleAddCitation = () => {
    if (!newCit.citationText.trim() || !newCit.url.trim()) {
      setError('Both citation text and valid link URL are required for APA 7th citations.');
      return;
    }
    setCitations([...citations, { ...newCit }]);
    setNewCit({ citationText: '', url: '', title: '', sourceType: 'book' });
    setError(null);
  };

  const handleDeleteCitation = (index) => {
    setCitations(citations.filter((_, i) => i !== index));
  };

  const handleAddVideo = () => {
    if (!newVid.title.trim() || !newVid.youtubeUrl.trim()) {
      setError('Both video title and YouTube URL are required.');
      return;
    }
    const yId = extractYouTubeId(newVid.youtubeUrl);
    if (!yId) {
      setError('Could not extract a valid 11-character YouTube video ID from the provided URL.');
      return;
    }
    setVideos([
      ...videos,
      {
        title: newVid.title.trim(),
        youtubeUrl: newVid.youtubeUrl.trim().startsWith('http') ? newVid.youtubeUrl.trim() : `https://www.youtube.com/watch?v=${yId}`,
        youtubeId: yId,
        channel: newVid.channel.trim() || 'Educational Resource',
        description: newVid.description.trim()
      }
    ]);
    setNewVid({ title: '', youtubeUrl: '', channel: '', description: '' });
    setError(null);
  };

  const handleDeleteVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSaveContent = async () => {
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
        content,
        citations,
        videos
      });

      if (onSaved) onSaved();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update lesson content');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setUploadError(null);
    setUploadSuccess(null);

    // Validate extension
    const ext = selectedFile.name.substring(selectedFile.name.lastIndexOf('.')).toLowerCase();
    const validExts = ['.pdf', '.ppt', '.pptx'];
    if (!validExts.includes(ext)) {
      setUploadError(`Unsupported file format: "${selectedFile.name}". Please upload a PDF (.pdf) or PowerPoint (.ppt, .pptx) presentation.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // 50 MB limit
    if (selectedFile.size > 50 * 1024 * 1024) {
      setUploadError(`File is too large (${formatFileSize(selectedFile.size)}). Maximum upload limit is 50 MB.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await lessonsApi.uploadFile(chapterId, formData);
      setUploadSuccess(`Successfully uploaded "${selectedFile.name}".`);
      await loadLessonFiles();
      if (onSaved) onSaved();
    } catch (err) {
      setUploadError(err.message || 'Failed to upload chapter file. Ensure file is under 50 MB.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteFile = async (fileId, filename) => {
    const confirmed = window.confirm(`Permanently remove "${filename}" from this chapter's course materials?`);
    if (!confirmed) return;

    setDeletingId(fileId);
    setUploadError(null);
    setUploadSuccess(null);
    try {
      await lessonsApi.deleteFile(fileId);
      setUploadSuccess(`Removed "${filename}".`);
      await loadLessonFiles();
      if (onSaved) onSaved();
    } catch (err) {
      setUploadError(err.message || 'Failed to delete file.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Faculty Lesson & Materials Management"
      maxWidth="920px"
    >
      {/* Navigation Sub-Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '1.5rem',
          paddingBottom: '0.75rem'
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('files')}
          className={`btn btn-sm ${activeTab === 'files' ? 'btn-primary' : 'btn-outline'}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.45rem 1rem',
            background: activeTab === 'files' ? 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)' : 'transparent',
            color: activeTab === 'files' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          <FolderOpen size={15} /> Uploaded Decks & PDFs ({files.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`btn btn-sm ${activeTab === 'content' ? 'btn-primary' : 'btn-outline'}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.45rem 1rem',
            background: activeTab === 'content' ? 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)' : 'transparent',
            color: activeTab === 'content' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          <FileText size={15} /> Lesson Syllabus & Notes
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('citations')}
          className={`btn btn-sm ${activeTab === 'citations' ? 'btn-primary' : 'btn-outline'}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.45rem 1rem',
            background: activeTab === 'citations' ? 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)' : 'transparent',
            color: activeTab === 'citations' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          <BookOpen size={15} /> APA 7th Citations ({citations.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('videos')}
          className={`btn btn-sm ${activeTab === 'videos' ? 'btn-primary' : 'btn-outline'}`}
          style={{
            fontSize: '0.82rem',
            padding: '0.45rem 1rem',
            background: activeTab === 'videos' ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)' : 'transparent',
            color: activeTab === 'videos' ? '#ffffff' : 'var(--text-muted)'
          }}
        >
          <Play size={15} /> Educational Videos ({videos.length})
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* TAB 1: FILE UPLOADS (PDF & PPT DECK MANAGEMENT) */}
      {activeTab === 'files' && (
        <div>
          {uploadError && (
            <div className="alert alert-danger" style={{ marginBottom: '1.25rem' }}>
              <AlertCircle size={16} /> {uploadError}
            </div>
          )}

          {uploadSuccess && (
            <div className="alert alert-success" style={{ marginBottom: '1.25rem' }}>
              <CheckCircle2 size={16} /> {uploadSuccess}
            </div>
          )}

          {/* Upload Drop Zone Card */}
          <div
            style={{
              backgroundColor: '#0a0f1d',
              border: '2px dashed rgba(56, 189, 248, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1.75rem 1.5rem',
              textAlign: 'center',
              marginBottom: '1.75rem',
              transition: 'all 0.2s ease'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '12px',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.85rem'
              }}
            >
              <Upload size={24} />
            </div>

            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.35rem' }}>
              Upload Chapter Lecture Slide Deck or Document
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', maxWidth: '520px', margin: '0 auto 1.25rem', lineHeight: 1.5 }}>
              Attach PowerPoint presentations (<code style={{ color: '#fb923c' }}>.ppt, .pptx</code>) or PDF documents (<code style={{ color: '#f87171' }}>.pdf</code>) up to 50 MB. Uploaded files will be immediately accessible to enrolled students on this chapter’s page.
            </p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
              style={{ display: 'none' }}
              id="chapter-file-upload-input"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="btn btn-primary"
              style={{
                padding: '0.65rem 1.6rem',
                fontSize: '0.88rem',
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)'
              }}
            >
              {uploading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Uploading Document...
                </>
              ) : (
                <>
                  <Plus size={16} /> Select PDF or PPT File
                </>
              )}
            </button>
          </div>

          {/* List of Uploaded Chapter Files */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={16} color="#38bdf8" />
                Current Chapter Files & Decks ({files.length})
              </h4>

              <button
                type="button"
                onClick={loadLessonFiles}
                disabled={loadingFiles}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                title="Refresh files"
              >
                <RefreshCw size={12} className={loadingFiles ? 'animate-spin' : ''} /> Refresh
              </button>
            </div>

            {files.length === 0 ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#94a3b8',
                  fontSize: '0.88rem'
                }}
              >
                No PDF documents or PowerPoint decks uploaded for this chapter yet. Use the upload box above to add lecture materials.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {files.map((file) => {
                  const fileId = file._id || file.id;
                  const typeDetails = getFileTypeDetails(file.originalFilename, file.mimeType);

                  return (
                    <div
                      key={fileId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1.15rem',
                        backgroundColor: '#0c1322',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: 'var(--radius-sm)',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, minWidth: '220px' }}>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: typeDetails.badgeBg,
                            color: typeDetails.badgeColor,
                            border: `1px solid ${typeDetails.badgeBorder}`,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          {typeDetails.type}
                        </span>

                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc', wordBreak: 'break-all' }}>
                            {file.originalFilename}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span>{formatFileSize(file.fileSize)} • Uploaded {new Date(file.createdAt).toLocaleDateString()}</span>
                            {(file.cloudinaryUrl || file.storageType === 'cloudinary') && (
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#38bdf8', fontSize: '0.7rem', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '0.1rem 0.35rem', borderRadius: '3px' }}>
                                <Cloud size={10} /> Cloudinary
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <a
                          href={lessonsApi.getFileDownloadUrl(fileId, true)}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
                          title="Open in browser"
                        >
                          <Eye size={13} /> View
                        </a>

                        <a
                          href={lessonsApi.getFileDownloadUrl(fileId, false)}
                          download={file.originalFilename}
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.35)' }}
                          title="Download file"
                        >
                          <FileDown size={13} /> Download
                        </a>

                        <button
                          type="button"
                          onClick={() => handleDeleteFile(fileId, file.originalFilename)}
                          disabled={deletingId === fileId}
                          className="btn btn-outline btn-sm"
                          style={{
                            fontSize: '0.78rem',
                            padding: '0.35rem 0.65rem',
                            color: '#f87171',
                            borderColor: 'rgba(239, 68, 68, 0.3)'
                          }}
                          title="Delete file"
                        >
                          <Trash2 size={13} /> {deletingId === fileId ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LESSON CONTENT & SYLLABUS TEXT */}
      {activeTab === 'content' && (
        <div>
          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              LESSON OVERVIEW & ABSTRACT
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Concise technical overview of this chapter..."
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              LEARNING OBJECTIVES (ONE PER LINE)
            </label>
            <textarea
              className="form-textarea"
              rows={4}
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              placeholder="Objective 1&#10;Objective 2&#10;Objective 3"
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              DETAILED LESSON CONTENT (MARKDOWN)
            </label>
            <textarea
              className="form-textarea"
              rows={10}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="## 1. Section Title&#10;Detailed technical exposition..."
            />
          </div>
        </div>
      )}

      {/* TAB 3: APA 7TH CITATIONS & REFERENCES */}
      {activeTab === 'citations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Add New Citation Card */}
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: '#0a0f1d',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Plus size={15} /> Add Academic Citation (APA 7th)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>SHORT TITLE</label>
                <input
                  type="text"
                  className="form-input"
                  value={newCit.title}
                  onChange={(e) => setNewCit({ ...newCit, title: e.target.value })}
                  placeholder="e.g. Data Mining Concepts"
                  style={{ fontSize: '0.82rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>SOURCE TYPE</label>
                <select
                  className="form-input"
                  value={newCit.sourceType}
                  onChange={(e) => setNewCit({ ...newCit, sourceType: e.target.value })}
                  style={{ fontSize: '0.82rem' }}
                >
                  <option value="book">Canonical Textbook</option>
                  <option value="journal">Peer-Reviewed Journal</option>
                  <option value="standard">Technical Standard (NIST/IEEE/ISO)</option>
                  <option value="whitepaper">Technical Whitepaper</option>
                  <option value="website">Authoritative Website</option>
                  <option value="wikipedia">Wikipedia Encyclopedic Reference</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>DOI OR AUTHORITATIVE URL (REQUIRED)</label>
                <input
                  type="url"
                  className="form-input"
                  value={newCit.url}
                  onChange={(e) => setNewCit({ ...newCit, url: e.target.value })}
                  placeholder="https://doi.org/10.xxxx or https://..."
                  style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>APA 7TH CITATION TEXT (REQUIRED)</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={newCit.citationText}
                  onChange={(e) => setNewCit({ ...newCit, citationText: e.target.value })}
                  placeholder="Author, A. A. (Year). Title of work. Publisher. URL"
                  style={{ fontSize: '0.82rem' }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddCitation}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', marginTop: '0.5rem' }}
            >
              <Plus size={14} /> Add Citation to List
            </button>
          </div>

          {/* Current Citations List */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <BookOpen size={16} color="#38bdf8" /> Current Chapter Citations ({citations.length})
            </h4>

            {citations.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)' }}>
                No citations added yet. Use the form above to add references.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {citations.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: '#0c1322',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.82rem', color: '#f1f5f9', lineHeight: 1.6 }}>
                        <strong style={{ color: '#38bdf8', marginRight: '0.35rem' }}>[{i + 1}]</strong>
                        {c.citationText}
                      </div>
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: '#38bdf8',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            textDecoration: 'none',
                            marginTop: '0.35rem'
                          }}
                        >
                          <ExternalLink size={11} /> {c.url}
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteCitation(i)}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.3rem 0.5rem' }}
                      title="Remove citation"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: EDUCATIONAL VIDEO LECTURES (YOUTUBE EMBEDS) */}
      {activeTab === 'videos' && (
        <div>
          {/* Add New Video Form */}
          <div
            style={{
              padding: '1.25rem',
              backgroundColor: '#0a0f1d',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem'
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f87171', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Play size={16} /> Link Educational Video Lecture (YouTube)
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>VIDEO TITLE (REQUIRED)</label>
                <input
                  type="text"
                  className="form-input"
                  value={newVid.title}
                  onChange={(e) => setNewVid({ ...newVid, title: e.target.value })}
                  placeholder="e.g. What is Cloud Computing?"
                  style={{ fontSize: '0.82rem' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>CHANNEL / INSTRUCTOR</label>
                <input
                  type="text"
                  className="form-input"
                  value={newVid.channel}
                  onChange={(e) => setNewVid({ ...newVid, channel: e.target.value })}
                  placeholder="e.g. IBM Technology, StatQuest"
                  style={{ fontSize: '0.82rem' }}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>YOUTUBE URL OR VIDEO ID (REQUIRED)</label>
                <input
                  type="text"
                  className="form-input"
                  value={newVid.youtubeUrl}
                  onChange={(e) => setNewVid({ ...newVid, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=... or 11-char Video ID"
                  style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>BRIEF SUMMARY / EDUCATIONAL DESCRIPTION</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={newVid.description}
                  onChange={(e) => setNewVid({ ...newVid, description: e.target.value })}
                  placeholder="Key concepts explained in this video..."
                  style={{ fontSize: '0.82rem' }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddVideo}
              className="btn btn-primary btn-sm"
              style={{ fontSize: '0.78rem', backgroundColor: '#dc2626', borderColor: '#dc2626' }}
            >
              <Plus size={14} /> Add Video to Chapter
            </button>
          </div>

          {/* Current Videos List */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Video size={16} color="#f87171" /> Attached Educational Videos ({videos.length})
            </h4>

            {videos.length === 0 ? (
              <div style={{ padding: '1.5rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem', backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-sm)' }}>
                No video lectures linked yet. Add YouTube video links using the form above.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {videos.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '0.85rem 1rem',
                      backgroundColor: '#0c1322',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span style={{ color: '#ef4444' }}>▶</span> {v.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>
                        Channel: <strong>{v.channel || 'Educational Resource'}</strong> • ID: <code>{v.youtubeId}</code>
                      </div>
                      {v.description && (
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                          {v.description}
                        </div>
                      )}
                      {v.youtubeUrl && (
                        <a
                          href={v.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            color: '#fca5a5',
                            fontSize: '0.75rem',
                            fontFamily: 'var(--font-mono)',
                            textDecoration: 'none',
                            marginTop: '0.35rem'
                          }}
                        >
                          <ExternalLink size={11} /> {v.youtubeUrl}
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteVideo(i)}
                      className="btn btn-outline btn-sm"
                      style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '0.3rem 0.5rem' }}
                      title="Remove video"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Actions Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.75rem',
          marginTop: '1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '1rem'
        }}
      >
        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          {files.length > 0 && <span>📎 {files.length} supplementary deck(s)/PDF(s) linked to this chapter</span>}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="button" onClick={onClose} className="btn btn-outline">
            Close
          </button>
          {(activeTab === 'content' || activeTab === 'citations' || activeTab === 'videos') && (
            <button type="button" onClick={handleSaveContent} disabled={saving} className="btn btn-primary">
              <Save size={16} /> {saving ? 'Saving...' : 'Save Lesson & Media'}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LessonEditorModal;
