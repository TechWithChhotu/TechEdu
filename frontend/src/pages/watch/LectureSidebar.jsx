export default function LectureSidebar({ lectures, activeLecture, onSelect }) {
  return (
    <div className="w-72 bg-white border-r overflow-y-auto">
      <h2 className="font-semibold p-4">Lectures</h2>

      {lectures.map((lec, index) => (
        <button
          key={lec._id}
          onClick={() => onSelect(lec)}
          className={`w-full text-left px-4 py-3 border-b
            ${
              activeLecture?._id === lec._id
                ? "bg-indigo-100 text-indigo-700"
                : "hover:bg-slate-100"
            }
          `}
        >
          <p className="font-medium">
            {index + 1}. {lec.title}
          </p>
          <p className="text-xs text-gray-500">{lec.type}</p>
        </button>
      ))}
    </div>
  );
}
