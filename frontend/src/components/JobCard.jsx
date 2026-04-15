import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{job.title}</h3>
          <p className="mt-1 text-sm text-slate-600">Posted by {job.employer_name}</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{job.location}</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700 line-clamp-3">{job.description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-700">
        <span className="font-semibold text-slate-900">${job.pay}</span>
        <Link to={`/jobs/${job.id}`} className="rounded-full bg-primary px-4 py-2 text-sm text-white transition hover:bg-secondary">
          View Job
        </Link>
      </div>
    </article>
  );
}

export default JobCard;
