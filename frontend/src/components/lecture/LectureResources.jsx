import { FileText, Link2, Code } from "lucide-react";

const iconMap = {
  pdf: <FileText className="w-5 h-5 text-red-500" />,
  link: <Link2 className="w-5 h-5 text-blue-500" />,
  code: <Code className="w-5 h-5 text-green-500" />,
  other: <FileText className="w-5 h-5 text-gray-500" />,
};

const LectureResources = ({ resources = [] }) => {
  console.log("====================================");
  console.log(resources);
  console.log("====================================");
  if (!resources.length) {
    return (
      <p className="text-gray-500 text-sm">
        No resources available for this lecture.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {resources.map((res, index) => (
        <div
          key={index}
          className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            {iconMap[res.type] || iconMap.other}
            <div>
              <p className="font-medium">{res.title}</p>
              <p className="text-xs text-gray-500 uppercase">{res.type}</p>
            </div>
          </div>

          <a
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-indigo-600 hover:underline"
          >
            Open
          </a>
        </div>
      ))}
    </div>
  );
};

export default LectureResources;
