import { useEffect, useState } from 'react';
import api from '../api/api';
import JobCard from '../components/JobCard';

function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [minPay, setMinPay] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/jobs', {
          params: {
            search: search || undefined,
            location: location || undefined,
            minPay: minPay || undefined,
          },
        });
        setJobs(response.data.jobs || []);
      } catch (err) {
        setError('Unable to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadJobs();
  }, [search, location, minPay]);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold text-slate-900">Find your next campus job</h1>
        <p className="mt-2 text-slate-600">Search part-time and freelance roles for students, and apply directly from CampusEarn.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles or skills"
            className="w-full"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full"
          />
          <input
            value={minPay}
            onChange={(e) => setMinPay(e.target.value)}
            type="number"
            placeholder="Min pay"
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Available jobs</h2>
            <p className="mt-1 text-sm text-slate-600">Browse open roles published by campus employers.</p>
          </div>
          <p className="text-sm text-slate-500">{jobs.length} jobs found</p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">Loading jobs…</div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-rose-700">{error}</div>
        ) : jobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600">No jobs matched your filters.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HomePage;
