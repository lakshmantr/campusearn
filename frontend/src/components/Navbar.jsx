import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-semibold text-primary">
          CampusEarn
        </Link>
        <nav className="flex items-center gap-3 text-sm font-medium text-slate-700">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>
            Jobs
          </NavLink>
          {isAuthenticated && user?.role === 'employer' && (
            <NavLink to="/post-job" className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>
              Post Job
            </NavLink>
          )}
          {isAuthenticated && (
            <NavLink to="/applications" className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>
              Applications
            </NavLink>
          )}
          {isAuthenticated ? (
            <>
              <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary'}>
                {user?.name}
              </NavLink>
              <button onClick={handleLogout} className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg border border-slate-300 bg-white px-4 py-2 hover:border-primary hover:text-primary">
                Login
              </Link>
              <Link to="/register" className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
