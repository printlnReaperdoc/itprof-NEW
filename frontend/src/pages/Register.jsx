import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Server, UserPlus, AlertCircle, Database, Cloud } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    surname: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Check inputs.');
    } finally {
      setLoading(false);
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
          maxWidth: '500px',
          padding: '2.5rem 2.25rem',
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(20px)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(56, 189, 248, 0.15)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #0284c7, #9333ea)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
            }}
          >
            <Server size={28} />
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            Student Registration
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
            Instant enrollment in Data Mining & Cloud Computing
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>FIRST NAME</label>
              <input
                type="text"
                name="firstName"
                className="form-input"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Juan"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>SURNAME</label>
              <input
                type="text"
                name="surname"
                className="form-input"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Dela Cruz"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>USERNAME</label>
            <input
              type="text"
              name="username"
              className="form-input"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. jdelacruz2026"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>PASSWORD</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>CONFIRM PASSWORD</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-type password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
          >
            <UserPlus size={18} /> {loading ? 'Enrolling...' : 'Register and Access Courses'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
          Already enrolled?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: '#38bdf8' }}>
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
