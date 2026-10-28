import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Server, LogIn, AlertCircle, Sparkles, Database, Cloud } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (userType) => {
    if (userType === 'faculty') {
      setUsername('faculty');
      setPassword('FacultyPassword2026!');
    } else {
      setUsername('student1');
      setPassword('StudentPassword2026!');
    }
  };

  return (
    <div
      className="tech-grid-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.75rem 2.25rem',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(56, 189, 248, 0.15)'
        }}
      >
        {/* Header Icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0284c7, #9333ea)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.45)'
            }}
          >
            <Server size={30} />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '0.5rem' }}>
            <span className="badge" style={{ backgroundColor: 'rgba(192, 132, 252, 0.15)', color: '#c084fc', border: '1px solid rgba(192, 132, 252, 0.3)' }}>
              <Database size={11} /> Data Mining
            </span>
            <span className="badge" style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
              <Cloud size={11} /> Cloud Computing
            </span>
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            IT Professional LMS
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            4th Year • 1st Term (4-1) Platform
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              USERNAME / ID
            </label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. faculty or student username"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              PASSWORD
            </label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
          >
            <LogIn size={18} /> {loading ? 'Authenticating...' : 'Sign In to LMS'}
          </button>
        </form>

        {/* Demo Fast Login Pills */}
        <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
            Quick Demo Credentials
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => handleFillDemo('student')}
              className="btn btn-outline"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', borderColor: 'rgba(56, 189, 248, 0.3)', color: '#38bdf8' }}
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('faculty')}
              className="btn btn-outline"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem', borderColor: 'rgba(192, 132, 252, 0.3)', color: '#c084fc' }}
            >
              Demo Faculty
            </button>
          </div>
        </div>

        {/* Registration Link */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          Need a student account?{' '}
          <Link to="/register" style={{ fontWeight: 600, color: '#38bdf8' }}>
            Register new student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
