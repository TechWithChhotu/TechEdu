const EmployeeDashboard = () => {
  const stats = [
    { label: "Total Courses", value: 5 },
    { label: "Total Students", value: 1200 },
    { label: "Live Classes Today", value: 2 },
    { label: "Monthly Earnings", value: "₹45,000" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-slate-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold text-indigo-600 mt-2">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
