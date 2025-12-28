const categories = [
  "All",
  "Web Development",
  "App Development",
  "Data Science & AI",
  "Cyber Security",
  "Cloud & DevOps",
  "Finance & Accounting",
  "Digital Marketing",
];

export default function CourseFilters({ courses, setFilteredCourses }) {
  const handleCategoryChange = (category) => {
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter((c) => c.category === category));
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className="px-4 py-2 rounded-full border text-sm font-medium
                     text-slate-600 hover:bg-indigo-600 hover:text-white
                     transition"
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
