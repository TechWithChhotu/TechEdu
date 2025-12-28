import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,450" />
        <StatCard title="Total Courses" value="84" />
        <StatCard title="Revenue" value="₹9,85,000" />
        <StatCard title="Active Students" value="5,620" />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-slate-700 mb-2">Monthly Revenue</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            📊 Chart Coming Soon
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-slate-700 mb-2">User Growth</h3>
          <div className="h-64 flex items-center justify-center text-gray-400">
            📈 Chart Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
}
