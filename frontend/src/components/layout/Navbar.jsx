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
  User
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
      backgroundColor: '#ffffff',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
        {/* Brand */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
            color: '#ffffff',
            padding: '0.5rem',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <GraduationCap size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.2 }}>
              IT Professional Electives
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Elective 2 & 4 • 4th Year, 1st Term
            </div>
          </div>
        </Link>

        {/* Navigation links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link
            to="/"
            className="btn btn-outline"
            style={{
              border: 'none',
              backgroundColor: isActive('/') ? 'var(--primary-light)' : 'transparent',
              color: isActive('/') ? 'var(--primary)' : 'var(--text-main)'
            }}
          >
            <LayoutDashboard size={16} /> Dashboard
          </Link>

          <Link
            to="/courses"
            className="btn btn-outline"
            style={{
              border: 'none',
              backgroundColor: location.pathname.startsWith('/course') ? 'var(--primary-light)' : 'transparent',
              color: location.pathname.startsWith('/course') ? 'var(--primary)' : 'var(--text-main)'
            }}
          >
            <Database size={16} /> Courses
          </Link>

          <Link
            to="/gradebook"
            className="btn btn-outline"
            style={{
              border: 'none',
              backgroundColor: isActive('/gradebook') ? 'var(--primary-light)' : 'transparent',
              color: isActive('/gradebook') ? 'var(--primary)' : 'var(--text-main)'
            }}
          >
            <FileSpreadsheet size={16} /> {isFaculty ? 'Master Gradebooks' : 'My Grades'}
          </Link>

          {isFaculty && (
            <Link
              to="/audit-logs"
              className="btn btn-outline"
              style={{
                border: 'none',
                backgroundColor: isActive('/audit-logs') ? 'var(--primary-light)' : 'transparent',
                color: isActive('/audit-logs') ? 'var(--primary)' : 'var(--text-main)'
              }}
            >
              <ShieldCheck size={16} /> Audit Logs
            </Link>
          )}
        </nav>

        {/* User profile & logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textAlign: 'right' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: isFaculty ? '#fef3c7' : 'var(--primary-light)',
              color: isFaculty ? '#b45309' : 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              {user?.firstName?.[0] || 'U'}
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {user?.firstName} {user?.surname}
              </div>
              <div style={{ fontSize: '0.72rem', textTransform: 'capitalize', color: 'var(--text-muted)' }}>
                {user?.role} • @{user?.username}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
            title="Log out"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

