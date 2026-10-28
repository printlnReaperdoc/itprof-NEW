import React, { useState } from 'react';
import StatusBadge from '../common/StatusBadge';
import { Search, ArrowUpDown, Download, Eye } from 'lucide-react';
import { exportUrls } from '../../api';

const TopicGradebookTable = ({ records = [], chapter, onReviewStudent }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('surname');
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = records
    .filter((r) => {
      const matchSearch =
        r.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.surname.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchSearch) return false;
      if (filterStatus === 'passed') return r.isPassed;
      if (filterStatus === 'failed') return !r.isPassed && r.attemptsCount > 0;
      if (filterStatus === 'not_attempted') return r.attemptsCount === 0;
      return true;
    })
    .sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (valA === null || valA === undefined) valA = sortAsc ? Infinity : -Infinity;
      if (valB === null || valB === undefined) valB = sortAsc ? Infinity : -Infinity;

      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortAsc ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
    });

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div>
      {/* Controls Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
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
              placeholder="Search by student name or username..."
            />
          </div>

          <select
            className="form-select"
            style={{ width: '160px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Students</option>
            <option value="passed">Passed (≥15/20)</option>
            <option value="failed">Failed (&lt;15/20)</option>
            <option value="not_attempted">Not Attempted</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a
            href={exportUrls.topicXLSX(chapter?.id || chapter?._id)}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            <Download size={14} /> Export Topic Excel (.xlsx)
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('surname')} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Student Name <ArrowUpDown size={13} />
                </div>
              </th>
              <th onClick={() => toggleSort('username')} style={{ cursor: 'pointer' }}>
                Username
              </th>
              <th onClick={() => toggleSort('attemptsCount')} style={{ cursor: 'pointer' }}>
                Attempts
              </th>
              <th onClick={() => toggleSort('latestScore')} style={{ cursor: 'pointer' }}>
                Latest Score
              </th>
              <th onClick={() => toggleSort('highestScore')} style={{ cursor: 'pointer' }}>
                Highest Score
              </th>
              <th>Outcome</th>
              <th>Chapter State</th>
              <th>Latest Attempt Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  No student records match the active criteria.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.studentId}>
                  <td style={{ fontWeight: 600 }}>
                    {r.surname}, {r.firstName}
                  </td>
                  <td>@{r.username}</td>
                  <td>{r.attemptsCount}</td>
                  <td>
                    {r.latestScore !== null ? (
                      <span style={{ fontWeight: 600 }}>{r.latestScore} / 20 ({r.latestScorePercentage}%)</span>
                    ) : (
                      <span style={{ color: 'var(--text-light)' }}>Not Attempted</span>
                    )}
                  </td>
                  <td>
                    {r.highestScore !== null ? (
                      <span style={{ fontWeight: 700, color: r.isPassed ? 'var(--success)' : 'inherit' }}>
                        {r.highestScore} / 20 ({r.highestScorePercentage}%)
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-light)' }}>Not Attempted</span>
                    )}
                  </td>
                  <td>
                    {r.isPassed ? (
                      <span className="badge badge-passed">Passed</span>
                    ) : r.attemptsCount > 0 ? (
                      <span className="badge badge-failed">Failed</span>
                    ) : (
                      <span className="badge badge-locked">Pending</span>
                    )}
                  </td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {r.latestAttemptAt ? new Date(r.latestAttemptAt).toLocaleString() : 'N/A'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopicGradebookTable;

