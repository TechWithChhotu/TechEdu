export default function StatCard({ title, value }) {
  return (
    <div className="bg-black rounded-xl shadow p-6">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-2xl font-bold text-slate-900 mt-2">{value}</h2>
    </div>
  );
}
