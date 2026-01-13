import React from "react";
import img1 from "../assets/images/pagination/page1.jpeg";
import img2 from "../assets/images/pagination/page2.jpeg";
import img3 from "../assets/images/pagination/page3.jpeg";
import img4 from "../assets/images/pagination/page4.jpeg";

const sections = [
  {
    id: 1,
    bg: "bg-[#1e3444]",
    title: "Guiding You At Every Step!",
    subtitle: "Your Aspiration is our Goal",
    desc: "Our mentors guide you to become a thorough professional.",
    image: img1,
    centerText: "Your Aspiration is our Goal",
    circleColor: "bg-blue-500",
  },
  {
    id: 2,
    bg: "bg-[#3f8f7b]",
    title: "One Stop Destination",
    subtitle: "From Learning To Earning",
    desc: "Placement support, mock interviews & job offers.",
    image: img2,
    centerText: "From Learning To Earning",
    circleColor: "bg-green-400",
  },
  {
    id: 3,
    bg: "bg-[#8b3f35]",
    title: "Real-Time Industry Experience",
    subtitle: "Earn your Experience Letter",
    desc: "Work on real-world projects & internships.",
    image: img3,
    centerText: "Earn Your Experience Latter",
    circleColor: "bg-red-600",
  },
  {
    id: 4,
    bg: "bg-[#7b4b82]",
    title: "Flexible Learning For You",
    subtitle: "Learning Made For Everyone",
    desc: "Self-paced & live courses available.",
    image: img4,
    centerText: "Learning Mode For EveryOne",
    circleColor: "bg-pink-500",
  },
];

const PaginationSections = () => {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar ">
      {sections.map((sec) => (
        <section
          key={sec.id}
          className={`snap-start h-screen flex relative ${sec.bg}`}
        >
          {/* LEFT CONTENT */}
          <div className="w-1/2 flex flex-col justify-center p-16 text-white">
            <h2 className="text-4xl font-bold mb-4">{sec.title}</h2>
            <span className="inline-block bg-white/20 px-4 py-2 rounded-full mb-4">
              {sec.subtitle}
            </span>
            <p className="text-lg opacity-90">{sec.desc}</p>
          </div>

          {/* ✅ CENTER (PER PAGE) */}
          <div
            className={`absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        h-40 w-40 rounded-full 
        flex items-center justify-center
        text-white font-bold z-20  no-click text-center px-10 ${sec.circleColor}`}
          >
            {sec.centerText}
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-1/2">
            <img
              src={sec.image}
              alt={sec.title}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default PaginationSections;
