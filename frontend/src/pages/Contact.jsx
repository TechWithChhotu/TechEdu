import React from "react";

const ContactWithUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0f0c29] via-[#1c0f2e] to-[#2a0a1f] text-gray-300 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Contact Our Learning Support
        </h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Have questions about courses, subscriptions, or technical support?
          We’re here to help you learn better.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            Reach out to our support team anytime. We usually respond within 24
            hours.
          </p>

          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="font-semibold text-lg text-indigo-600">
                📧 Email Support
              </h3>
              <p className="text-gray-600 mt-2">
                support@elearning.com
                <br /> help@elearning.com
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="font-semibold text-lg text-indigo-600">
                📞 Call Us
              </h3>
              <p className="text-gray-600 mt-2">
                +91 89208 23219
                <br /> Mon – Sat (9AM – 7PM)
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="font-semibold text-lg text-indigo-600">
                📍 Office Location
              </h3>
              <p className="text-gray-600 mt-2">
                TechEdu HQ, Sheikhpura, Bihar
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Send Us a Message
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select className="w-full border rounded-lg px-4 py-3 text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Course Related Query</option>
              <option>Technical Support</option>
              <option>Payment / Subscription</option>
              <option>Other</option>
            </select>

            <textarea
              rows="4"
              placeholder="Write your message..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactWithUs;
