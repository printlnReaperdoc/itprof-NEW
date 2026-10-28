import React, { useState, useEffect } from 'react';
import { auditApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { ShieldCheck, Filter, Search, RefreshCw } from 'lucide-react';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionFilter, setActionFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async (targetPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      const res = await auditApi.getLogs({
        page: targetPage,
        limit: 50,
        action: actionFilter || undefined
      });
      setLogs(res.logs || []);
      setTotalPages(res.totalPages || 1);
      setPage(res.page || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch audit logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(1);
  }, [actionFilter]);

  return (
    <div className="container" style={{ padding: '2rem 1.5rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            System Audit & Compliance Logs
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Immutable administrative logs capturing user authentication, assessment submissions, grade overrides, and material mutations.
          </p>
        </div>

        <button onClick={() => fetchLogs(page)} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
          <RefreshCw size={15} /> Refresh Logs
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Filter Bar */}
      <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Filter size={18} color="var(--text-muted)" />
        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Filter by Action:</span>
        <select
          className="form-select"
          style={{ width: '260px' }}
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
        >
          <option value="">All Audited Actions</option>
          <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
          <option value="LOGIN_FAILED">LOGIN_FAILED</option>
          <option value="USER_REGISTERED">USER_REGISTERED</option>
          <option value="QUIZ_SUBMITTED">QUIZ_SUBMITTED</option>
          <option value="CHAPTER_UNLOCKED">CHAPTER_UNLOCKED</option>
          <option value="ADMIN_PROGRESS_OVERRIDE">ADMIN_PROGRESS_OVERRIDE</option>
          <option value="LESSON_UPDATED">LESSON_UPDATED</option>
          <option value="PRESENTATION_UPDATED">PRESENTATION_UPDATED</option>
          <option value="EXPORT_MASTER_GRADEBOOK">EXPORT_MASTER_GRADEBOOK</option>
          <option value="DATABASE_SEEDED">DATABASE_SEEDED</option>
        </select>
      </div>

      {/* Logs Table */}
      {loading ? (
        <LoadingSpinner message="Querying MongoDB audit logs..." />
      ) : (
        <div className="table-container">
          <table className="table" style={{ fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Actor</th>
                <th>Entity</th>
                <th>IP / Request ID</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No audit records found matching criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log._id}>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          backgroundColor: log.action.includes('OVERRIDE')
                            ? '#fef2f2'
                            : log.action.includes('UNLOCKED')
                            ? '#f0fdf4'
                            : '#f1f5f9',
                          color: log.action.includes('OVERRIDE')
                            ? '#dc2626'
                            : log.action.includes('UNLOCKED')
                            ? '#16a34a'
                            : '#334155'
                        }}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td>
                      {log.actorUserId ? (
                        <span>
                          {log.actorUserId.firstName} {log.actorUserId.surname}{' '}
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            (@{log.actorUserId.username})
                          </span>
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-light)' }}>System / Anonymous</span>
                      )}
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{log.entityType}</span>
                      {log.entityId && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', display: 'block' }}>
                          ID: {log.entityId.slice(-8)}
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <div>{log.ipAddress || '127.0.0.1'}</div>
                      {log.requestId && <div style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>{log.requestId.slice(0, 8)}...</div>}
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <pre
                        style={{
                          margin: 0,
                          fontSize: '0.72rem',
                          fontFamily: 'Consolas, monospace',
                          backgroundColor: '#f8fafc',
                          padding: '0.35rem',
                          borderRadius: '4px',
                          overflowX: 'auto',
                          maxHeight: '80px'
                        }}
                      >
                        {JSON.stringify(log.details, null, 1)}
                      </pre>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
          <button
            onClick={() => fetchLogs(page - 1)}
            disabled={page === 1}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            Previous
          </button>
          <span style={{ display: 'flex', alignItems: 'center', padding: '0 0.75rem', fontSize: '0.85rem' }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => fetchLogs(page + 1)}
            disabled={page === totalPages}
            className="btn btn-outline"
            style={{ fontSize: '0.8rem' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AuditLogsPage;

