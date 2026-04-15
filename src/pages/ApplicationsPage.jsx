import { useEffect, useState } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

function ApplicationsPage() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadApplications() {
      setLoading(true);
      setError('');
      try {
        const response = await api.get('/applications');
        setApplications(response.data.applications || []);
      } catch (err) {
        setError('Unable to load applications.');
      } finally {
        setLoading(false);
      }
    }
    loadApplications();
  }, []);

  async function updateStatus(applicationId, status) {
    try {
      await api.put(`/applications/${applicationId}/status`, { status });
      setApplications((items) => items.map((application) => (application.id === applicationId ? { ...application, status } : application)));
    } catch (err) {
      setError('Unable to update application status.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">{user?.role === 'employer' ? 'Incoming applications' : 'My applications'}</h1>
        <p className="mt-2 text-slate-600">Track status for all applications and respond to candidates.</p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">Loading applications…</div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-700">{error}</div>
      ) : applications.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">No applications to display.</div>
      ) : (
        <div className="grid gap-5">
          {applications.map((application) => (
            <article key={application.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">{application.job_title}</h2>
                  <p className="text-sm text-slate-600">
                    {user?.role === 'employer' ? application.student_name : application.status}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{application.status}</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                {user?.role === 'employer' && (
                  <>
                    <span>Candidate: {application.student_name}</span>
                    <span>Email: {application.student_email}</span>
                  </>
                )}
                {user?.role === 'student' && <span>Location: {application.job_location || 'N/A'}</span>}
              </div>
              {user?.role === 'employer' && application.status === 'pending' && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => updateStatus(application.id, 'accepted')} className="rounded-2xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700">
                    Accept
                  </button>
                  <button onClick={() => updateStatus(application.id, 'rejected')} className="rounded-2xl bg-rose-600 px-4 py-2 text-white hover:bg-rose-700">
                    Reject
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApplicationsPage;
