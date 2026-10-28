import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  LayoutDashboard,
  Database,
  Cloud,
  FileSpreadsheet,
  ShieldCheck,
  LogOut,
  Sparkles,
  Server
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, isFaculty, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
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

        {/* User profile & logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.25)' }}
            title="Log out"
          >
            <LogOut size={14} /> Exit
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
