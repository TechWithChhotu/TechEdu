import { useEffect, useState } from "react";

// import student_icon from "../../assets/icons/student-icon.svg";
import credit_card_icon from "../../assets/icons/credit-card-icon.svg";
import books_icon from "../../assets/icons/books-icon.svg";

const counterData = [
  { id: 1, end: 15, text: "Different Courses", icon: books_icon },
  { id: 2, end: 1000, text: "Students Enrolled", icon: books_icon },
  { id: 3, end: 800, text: "Successful Transition", icon: credit_card_icon },
];

function CounterItem({ end, text, icon }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 8000; // total animation time (ms)
    const incrementTime = 100;
    const step = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center text-center">
      <img src={icon} alt={text} className="w-28 max-sm:w-20 mb-4" />

      <h3 className="text-3xl max-sm:text-xl text-indigo-600 font-semibold">
        {count}+
      </h3>

      <p className="text-xl max-sm:text-lg font-medium text-gray-700 mt-2">
        {text}
      </p>
    </div>
  );
}

export default function Counter() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-10">
        {counterData.map((item) => (
          <CounterItem
            key={item.id}
            end={item.end}
            text={item.text}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}
