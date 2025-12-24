import { Link } from "react-router-dom";
import HeroImageStudyMode from "../assets/images/hero-bg.png";
import Counter from "../components/common/CounterDown";
import FounterImage from "../assets/images/FounterHalfbg.png";
import Typewriter from "../components/common/Typewriter";
import TechEdu from "../assets/images/TechEdu.png";
export default function Home() {
  return (
    <main className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Upskilling Made{" "}
              <span className="text-green-500">{<Typewriter />}</span>
              <br /> With Tech<span className="text-green-500">Edu</span>
            </h1>

            <p className="mt-6 text-slate-600 max-w-xl">
              TechEdu is your one-stop platform for tech upskilling. Learn
              job-ready skills with industry-focused courses at the lowest cost.
            </p>

            <div className="mt-8">
              <Link
                to="/courses"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                Explore Courses
              </Link>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative">
            {/* <div className="grid grid-cols-2 gap-6">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                alt="coding"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="learning"
                className="rounded-2xl shadow-lg mt-10"
              />
            </div> */}
            <img src={HeroImageStudyMode} alt="" />
          </div>
        </div>
      </section>

      {/* ================= Counter Down ================= */}
      <section>
        <Counter />
      </section>

      {/* ================= FOUNDERS / VISION SECTION ================= */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full border border-green-400 text-green-500 text-sm">
              Meet our Founders ✨
            </span>

            <h2 className="text-4xl font-bold text-white leading-snug">
              “The new wave of{" "}
              <span className="text-green-500">technology</span>
              <br /> is here to change our lives forever!”
            </h2>

            <p className="mt-6 text-slate-300">
              TechEdu founders believe in accessible, affordable, and
              industry-ready education for everyone.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={FounterImage}
              alt="founders"
              className="rounded-3xl shadow-2xl max-w-md h-96 object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
