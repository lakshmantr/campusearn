import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

function JobDetailsPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadJob() {
      setLoading(true);
      setError('');
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.job);
      } catch (err) {
        setError('Job not found.');
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [id]);

  async function handleApply() {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'student') {
      setMessage('Only student users can apply for this job.');
      return;
    }

    try {
      setMessage('');
      await api.post('/applications', { job_id: id });
      setMessage('Application submitted successfully.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Unable to submit application.');
    }
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">Loading job details…</div>;
  }

  if (error || !job) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-12 text-center text-rose-700">{error || 'An unexpected error occurred.'}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{job.title}</h1>
            <p className="mt-2 text-sm text-slate-600">Posted by {job.employer_name}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{job.location}</span>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Job description</h2>
              <p className="mt-2 text-slate-700 leading-7">{job.description}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Pay</h2>
              <p className="mt-2 text-slate-700">${job.pay}</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Job summary</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li>Location: {job.location}</li>
              <li>Employer: {job.employer_name}</li>
              <li>Status: Open</li>
            </ul>
            <button onClick={handleApply} className="mt-6 w-full rounded-2xl bg-primary px-4 py-3 text-white hover:bg-secondary">
              Apply for this job
            </button>
          </div>
        </div>
      </div>

      {message && <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700">{message}</div>}
    </div>
  );
}

export default JobDetailsPage;
