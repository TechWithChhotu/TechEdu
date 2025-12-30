import React from "react";
import TalkFullBG from "../assets/images/FounderFullbg.png";
import Completethemission from "../assets/icons/complete-the-mission.svg";

const About = () => {
  return (
    <div className="bg-white">
      {/* ABOUT US */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          About Us
        </h1>

        <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
          <strong>TechEdu</strong>’s mission is to permeate through every
          student and professional’s outlook towards jobs and change their
          attitude and perspective from{" "}
          <span className="font-semibold">“How Can I Do It?”</span> to{" "}
          <span className="font-semibold">“Of Course I Can Do It!”</span>.
          <br />
          <br />
          We aim to do this by providing exceptional upskilling courses at
          affordable rates, while being tech-forward so anyone, anywhere can
          access and improve their ability to be successful in life.
        </p>
      </section>

      {/* IMAGE SECTION */}
      <section className="max-w-6xl mx-auto px-6">
        <img
          src={TalkFullBG}
          alt="TechEdu Session"
          className="rounded-2xl w-full object-cover shadow-lg"
        />
      </section>

      {/* OUR MISSION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            <strong>TechEdu</strong> is the result of a continual effort to
            exponentially increase the employability of every Indian,
            irrespective of their socioeconomic status.
            <br />
            <br />
            With accessibility and affordability being the support structure of
            high-quality, industry-relevant courses, TechEdu aims to empower
            professionals and students alike to either jumpstart their careers
            or leverage existing skills with new, future-driven upgrades that
            will help them realise their full potential.
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={Completethemission}
            alt="Mission Illustration"
            className="w-80"
          />
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <ServiceCard
              title="Affordable Online Courses"
              desc="Affordable online courses along with active learning communities."
            />

            <ServiceCard
              title="Best in Class / Industry Mentors"
              desc="Mentors are industry professionals, entrepreneurs, and content creators."
            />

            <ServiceCard
              title="Experience Portal"
              desc="A revolutionary self-paced experience portal designed for real learning."
            />

            <ServiceCard
              title="On-Demand Courses"
              desc="On-demand courses across technologies like Data Science, Machine Learning, and AI."
            />

            <ServiceCard
              title="Innovation Lab for Tech Products"
              desc="R&D driven product development in robotics, AI devices, and emerging technologies."
            />
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          From the Founder
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          <strong>Chhotu Patel</strong>, Founder of <strong>TechEdu</strong>,
          believes education should be practical, affordable, and accessible to
          everyone. The goal is not just learning — but building confidence,
          careers, and a future-ready mindset.
        </p>
      </section>
    </div>
  );
};

const ServiceCard = ({ title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

export default About;
