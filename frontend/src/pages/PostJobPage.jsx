import { useState } from 'react';
import api from '../api/api';

function PostJobPage() {
  const [form, setForm] = useState({ title: '', description: '', pay: '', location: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      await api.post('/jobs', {
        title: form.title,
        description: form.description,
        pay: Number(form.pay),
        location: form.location,
      });
      setMessage('Job posted successfully.');
      setForm({ title: '', description: '', pay: '', location: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Unable to post job.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">Post a new job</h1>
      <p className="mt-2 text-slate-600">Create a listing for students to apply and manage applications.</p>

      {message && <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-700">{message}</div>}
      {error && <div className="mt-6 rounded-2xl bg-rose-50 p-4 text-rose-700">{error}</div>}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Job title</span>
          <input
            type="text"
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            required
            className="mt-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">Description</span>
          <textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            required
            rows="5"
            className="mt-2 w-full resize-none"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Pay</span>
            <input
              type="number"
              value={form.pay}
              onChange={(event) => setForm({ ...form, pay: event.target.value })}
              required
              className="mt-2 w-full"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Location</span>
            <input
              type="text"
              value={form.location}
              onChange={(event) => setForm({ ...form, location: event.target.value })}
              required
              className="mt-2 w-full"
            />
          </label>
        </div>

        <button type="submit" disabled={loading} className="rounded-2xl bg-primary px-5 py-3 text-white">
          {loading ? 'Posting job…' : 'Post job'}
        </button>
      </form>
    </div>
  );
}

export default PostJobPage;
