import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-12 text-center shadow-sm">
      <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The link may be broken or the page no longer exists.</p>
      <Link to="/" className="mt-8 inline-block rounded-2xl bg-primary px-6 py-3 text-white hover:bg-secondary">
        Return home
      </Link>
    </div>
  );
}

export default NotFoundPage;
