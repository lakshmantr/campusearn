import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-semibold text-slate-900">My profile</h1>
      <p className="mt-2 text-slate-600">Review your account details and role settings.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Name</h2>
          <p className="mt-2 text-slate-700">{user?.name}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Email</h2>
          <p className="mt-2 text-slate-700">{user?.email}</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Role</h2>
          <p className="mt-2 text-slate-700 capitalize">{user?.role}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
