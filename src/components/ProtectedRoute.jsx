import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="py-20 text-center text-lg text-slate-600">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role && user?.role !== role) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-700">You do not have permission to access this page.</div>;
  }

  return children;
}

export default ProtectedRoute;
