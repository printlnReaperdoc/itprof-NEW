import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Modal from '../common/Modal';
import LdmToggle from '../common/LdmToggle';
import {
  GraduationCap,
  LayoutDashboard,
  Database,
  Cloud,
  FileSpreadsheet,
  ShieldCheck,
  LogOut,
  Sparkles,
  Server,
  KeyRound,
  AlertTriangle
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isFaculty, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const confirmLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      setIsLogoutModalOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoggingOut(false);
    }
  };

  if (!isAuthenticated) return null;

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{
      backgroundColor: 'rgba(11, 17, 32, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Brand / Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0284c7, #9333ea)',
            color: '#ffffff',
            padding: '0.55rem',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
          }}>
            <Server size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#f8fafc', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span>IT Professional Electives</span>
              <span style={{
                fontSize: '0.68rem',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                padding: '0.1rem 0.45rem',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontFamily: 'var(--font-mono)'
              }}>
                LMS 4-1
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
              ITEP411-T (Data Mining) • ITEP413-T (Cloud)
            </div>
          </div>
        </Link>

        {/* Navigation links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Link
            to="/"
            className="btn btn-outline"
            style={{
              border: isActive('/') ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
              backgroundColor: isActive('/') ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
              color: isActive('/') ? '#38bdf8' : '#cbd5e1'
            }}
          >
            <LayoutDashboard size={15} /> Dashboard
          </Link>

          <Link
            to="/gradebook"
            className="btn btn-outline"
            style={{
              border: isActive('/gradebook') ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
              backgroundColor: isActive('/gradebook') ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
              color: isActive('/gradebook') ? '#38bdf8' : '#cbd5e1'
            }}
          >
            <FileSpreadsheet size={15} /> {isFaculty ? 'Master Gradebooks' : 'My Grades'}
          </Link>

          {isFaculty && (
            <Link
              to="/answer-keys"
              className="btn btn-outline"
              style={{
                border: isActive('/answer-keys') ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid transparent',
                backgroundColor: isActive('/answer-keys') ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                color: isActive('/answer-keys') ? '#38bdf8' : '#cbd5e1'
              }}
            >
              <KeyRound size={15} /> Answer Keys
            </Link>
          )}

          {isFaculty && (
            <Link
              to="/audit-logs"
              className="btn btn-outline"
              style={{
                border: isActive('/audit-logs') ? '1px solid rgba(192, 132, 252, 0.4)' : '1px solid transparent',
                backgroundColor: isActive('/audit-logs') ? 'rgba(192, 132, 252, 0.12)' : 'transparent',
                color: isActive('/audit-logs') ? '#c084fc' : '#cbd5e1'
              }}
            >
              <ShieldCheck size={15} /> Audit Logs
            </Link>
          )}
        </nav>

        {/* LDM Mode Toggle, User profile & logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <LdmToggle />

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textAlign: 'right' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: isFaculty ? 'rgba(192, 132, 252, 0.2)' : 'rgba(56, 189, 248, 0.2)',
              border: `1px solid ${isFaculty ? 'rgba(192, 132, 252, 0.4)' : 'rgba(56, 189, 248, 0.4)'}`,
              color: isFaculty ? '#c084fc' : '#38bdf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)'
            }}>
              {user?.firstName?.[0] || 'U'}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                {user?.firstName} {user?.surname}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                {user?.role?.toUpperCase()} • @{user?.username}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.25)' }}
            title="Log out"
          >
            <LogOut size={14} /> Exit
          </button>
        </div>
      </div>

      {/* Custom Logout Confirmation Modal (No HTML5 Dialog) */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => !loggingOut && setIsLogoutModalOpen(false)}
        title="Confirm Session Termination"
        maxWidth="460px"
      >
        <div style={{ textAlign: 'center', padding: '0.5rem 0 1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#f87171',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <AlertTriangle size={28} />
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            Terminate Active Session?
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Are you sure you want to log out, <strong style={{ color: 'var(--text-main)' }}>{user?.firstName} {user?.surname}</strong>?
            Any unsaved work in lecture editors or quiz attempts will be discarded.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={loggingOut}
              className="btn btn-outline"
              style={{ padding: '0.6rem 1.5rem', minWidth: '110px' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              disabled={loggingOut}
              className="btn btn-danger"
              style={{ padding: '0.6rem 1.5rem', minWidth: '140px' }}
            >
              <LogOut size={16} /> {loggingOut ? 'Signing Out...' : 'Terminate Session'}
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;
