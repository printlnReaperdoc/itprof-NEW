import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { coursesApi, analyticsApi } from '../api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import FacultyDashboard from '../components/dashboard/FacultyDashboard';

const Dashboard = () => {
  const { user, isFaculty } = useAuth();
  const [courses, setCourses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, analyticsRes] = await Promise.all([
          coursesApi.getAll(),
          analyticsApi.getDashboard()
        ]);
        setCourses(coursesRes.courses || []);
        setAnalytics(analyticsRes);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner message="Querying neural & cloud telemetry..." />;

  if (error) {
    return (
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (isFaculty) {
    return <FacultyDashboard courses={courses} analytics={analytics} user={user} />;
  }

  return <StudentDashboard courses={courses} analytics={analytics} user={user} />;
};

export default Dashboard;
