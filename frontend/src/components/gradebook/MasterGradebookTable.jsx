import React, { useState } from 'react';
import { Search, Download, Printer, FileText, FileSpreadsheet } from 'lucide-react';
import { exportUrls } from '../../api';

const MasterGradebookTable = ({ course, chapters = [], students = [], gradeMatrix = {} }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter((s) => {
    const term = searchTerm.toLowerCase();
    return (
      s.username.toLowerCase().includes(term) ||
      s.firstName.toLowerCase().includes(term) ||
      s.surname.toLowerCase().includes(term)
    );
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Top action bar */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ position: 'relative', width: '320px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student by name or username..."
          />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-outline" style={{ fontSize: '0.8rem' }}>
            <Printer size={14} /> Print View
          </button>
          <a
            href={exportUrls.masterPDF(course?.id || course?._id)}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            <FileText size={14} /> Export PDF
          </a>
          <a
            href={exportUrls.masterCSV(course?.id || course?._id)}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            <FileSpreadsheet size={14} /> Export CSV
          </a>
          <a
            href={exportUrls.masterXLSX(course?.id || course?._id)}
            className="btn btn-primary"
            style={{ fontSize: '0.8rem' }}
          >
            <Download size={14} /> Export Excel (.xlsx)
          </a>
        </div>
      </div>

      {/* Print Header */}
      <div style={{ display: 'none' }} className="print-header">
        <h2>{course?.courseTitle} ({course?.courseCode})</h2>
        <p>Master Gradebook Report • {course?.academicDesignation} • Exported {new Date().toLocaleDateString()}</p>
      </div>

      {/* Grade Matrix Table */}
      <div className="table-container">
        <table className="table" style={{ fontSize: '0.8rem' }}>
          <thead>
            <tr>
              <th style={{ minWidth: '180px' }}>Student Name</th>
              {chapters.map((ch) => (
                <th key={ch.id} style={{ textAlign: 'center', padding: '0.5rem 0.4rem', minWidth: '55px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }} title={`Chapter ${ch.chapterNumber}: ${ch.title}`}>
                  Ch {ch.chapterNumber}
                </th>
              ))}
              <th style={{ textAlign: 'center', minWidth: '85px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Attempted</th>
              <th style={{ textAlign: 'center', minWidth: '75px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Passed</th>
              <th style={{ textAlign: 'center', minWidth: '85px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Average</th>
              <th style={{ textAlign: 'center', minWidth: '95px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Completion</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={chapters.length + 5} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No enrolled students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((s) => {
                const sData = gradeMatrix[s._id] || {};
                return (
                  <tr key={s._id}>
                    <td style={{ fontWeight: 600 }}>
                      {s.surname}, {s.firstName}
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400, fontFamily: 'var(--font-mono)' }}>
                        @{s.username}
                      </div>
                    </td>

                    {/* Chapter score cells */}
                    {chapters.map((ch) => {
                      const chData = sData.chapters?.[ch.id];
                      const isAttempted = chData && chData.attemptsCount > 0;
                      const isPassed = chData?.status === 'passed';

                      return (
                        <td
                          key={ch.id}
                          style={{
                            textAlign: 'center',
                            padding: '0.5rem 0.25rem',
                            backgroundColor: isPassed ? 'rgba(16, 185, 129, 0.12)' : isAttempted ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
                            borderRight: '1px solid rgba(255, 255, 255, 0.03)'
                          }}
                        >
                          {isAttempted ? (
                            <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: isPassed ? 'var(--success)' : 'var(--danger)' }}>
                              {chData.highestScore}
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>—</span>
                          )}
                        </td>
                      );
                    })}

                    <td style={{ textAlign: 'center', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {sData.chaptersAttempted ?? 0} / 12
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--success)' }}>
                      {sData.chaptersPassed ?? 0} / 12
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      {sData.overallAverage !== null ? `${sData.overallAverage}%` : <span style={{ color: 'var(--text-light)' }}>N/A</span>}
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--cloud-accent)' }}>
                      {sData.completionPercentage ?? 0}%
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
        * Note: Chapters without attempts are displayed as dash (—) and are excluded from the numeric performance average. Passing threshold is 15/20 (75%). Course completion tracks verified passed chapters out of 12.
      </div>
    </div>
  );
};

export default MasterGradebookTable;

