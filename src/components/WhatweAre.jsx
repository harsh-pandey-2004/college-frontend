import imgage1 from "../assets/educationb.png";
import imgage2 from "../assets/educationc.png";
import imgage3 from "../assets/educationd.png";
import imgage4 from "../assets/educatione.png";
import imgage5 from "../assets/educationf.png";
import imgage6 from "../assets/educationg.png";
import React, { useState, useEffect } from "react";
import { ChevronRight, Users, BookOpen, GraduationCap } from "lucide-react";

const Skilline = () => {
  const [isVisible, setIsVisible] = useState({
    intro: false,
    everything: false,
    features: false,
    enrollment: false,
    community: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <section
        data-section="intro"
        className={`px-4 py-12 md:py-16 max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible.intro
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="text-center">
          <h4 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">
            Welcome to{" "}
            <span className="text-orange-500 inline-block hover:scale-110 transition-transform duration-300">
              Online College
            </span>
          </h4>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto md:text-xl leading-relaxed">
            Experience the full college journey online. Attend live lectures,
            participate in discussions, submit assignments, and interact with
            professors and peers—all from the comfort of your home.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8 mt-12">
          <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
            <div
              className="bg-cover bg-center h-72 w-full md:w-96 transform transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://mhaecal.github.io/frontend/img/Rectangle%2019.png')",
              }}
            >
              <div className="h-full w-full bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <h4 className="text-white text-2xl font-bold mb-4">
                  FOR STUDENTS
                </h4>
                <button className="mt-4 border-2 border-white rounded-full px-8 py-3 text-white hover:bg-white hover:text-blue-900 transition-all duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 hover:shadow-2xl">
            <div
              className="bg-cover bg-center h-72 w-full md:w-96 transform transition-transform duration-700 group-hover:scale-110"
              style={{
                backgroundImage:
                  "url('https://mhaecal.github.io/frontend/img/Rectangle%2021.png')",
              }}
            >
              <div className="h-full w-full bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <h4 className="text-white text-2xl font-bold mb-4">
                  FOR FACULTY
                </h4>
                <button className="mt-4 bg-blue-500 rounded-full px-8 py-3 text-white hover:bg-blue-600 transition-all duration-300">
                  Join as Instructor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        data-section="everything"
        className={`px-4 py-16 md:py-24 max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible.everything
            ? "translate-x-0 opacity-100 md:block hidden"
            : "translate-x-10 opacity-0 md:block hidden"
        }`}
      >
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-12">
          <div className="w-full md:w-2/5">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500 rounded-full absolute -top-6 -left-6 animate-pulse md:block hidden"></div>
              <h4 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
                Everything you get in a physical college,{" "}
                <span className="text-orange-500">you get here</span>
              </h4>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Our platform offers live lectures, interactive sessions, group
                projects, and access to a vibrant online community. You'll never
                miss out on the college experience.
              </p>
              <button className="mt-8 group flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <span>Learn More</span>
                <ChevronRight className="ml-2 transform group-hover:translate-x-1 transition-transform md:block hidden" />
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-1/2">
            <div className="w-32 h-32 bg-blue-400 rounded-full absolute -top-8 -left-8 animate-pulse opacity-25 md:block hidden"></div>
            <div className="w-40 h-40 bg-orange-500 rounded-full absolute -bottom-8 -right-8 animate-pulse opacity-25 md:block hidden"></div>
            <img
              src={imgage2}
              alt="Lecture Hall"
              className="relative z-10 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section
        data-section="features"
        className={`px-4 py-16 md:py-24 max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible.features
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="relative w-full md:w-1/2">
            <img
              src={imgage1}
              alt="Virtual Class"
              className="rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
            <div className="w-40 h-40 bg-green-400 rounded-full absolute -top-8 left-8 animate-pulse opacity-25 md:block hidden"></div>
            <div className="w-40 h-40 bg-blue-500 rounded-full absolute -bottom-8 right-16 animate-pulse opacity-25 md:block hidden"></div>
          </div>
          <div className="w-full md:w-1/2">
            <h4 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
              A <span className="text-orange-500">college experience</span>{" "}
              designed for you
            </h4>
            <div className="mt-8 space-y-6">
              {[
                {
                  icon: <GraduationCap className="w-6 h-6 text-blue-900" />,
                  text: "Attend live lectures and interact with professors in real-time",
                },
                {
                  icon: <Users className="w-6 h-6 text-blue-900" />,
                  text: "Participate in group discussions and collaborative projects",
                },
                {
                  icon: <BookOpen className="w-6 h-6 text-blue-900" />,
                  text: "Access recorded lectures and study materials anytime",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="bg-white p-3 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {item.icon}
                  </div>
                  <p className="text-gray-600 text-lg pt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-section="enrollment"
        className={`px-4 py-16 md:py-24 max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible.enrollment
            ? "translate-x-0 opacity-100"
            : "-translate-x-10 opacity-0"
        }`}
      >
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500 rounded-full absolute -top-6 -left-6 animate-pulse md:block hidden"></div>
              <h4 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
                <span className="text-orange-500">Enroll</span> in Your Dream
                Program
              </h4>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Choose from a wide range of programs and courses. Start your
                journey today and get the full college experience online.
              </p>
              <button className="mt-8 group bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1">
                Browse Programs
                <ChevronRight className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-1/2">
            <div className="w-32 h-32 bg-blue-400 rounded-full absolute -top-8 -left-8 animate-pulse opacity-25 md:block hidden"></div>
            <div className="w-40 h-40 bg-orange-500 rounded-full absolute -bottom-8 -right-8 animate-pulse opacity-25 md:block hidden"></div>
            <img
              src={imgage5}
              alt="Enrollment"
              className="relative z-10 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section
        data-section="community"
        className={`px-4 py-16 md:py-24 max-w-7xl mx-auto transform transition-all duration-1000 ${
          isVisible.community
            ? "translate-x-0 opacity-100"
            : "translate-x-10 opacity-0"
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="relative w-full md:w-1/2">
            <div className="w-32 h-32 bg-purple-400 rounded-full absolute -top-8 -left-8 animate-pulse opacity-25  sm:block"></div>
            <div className="w-40 h-40 bg-green-500 rounded-full absolute -bottom-8 -right-8 animate-pulse opacity-25 hidden sm:block"></div>
            <img
              src={imgage4}
              alt="Community"
              className="relative z-10 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div className="w-12 h-12 bg-blue-500 rounded-full absolute -top-6 -left-6 animate-pulse hidden sm:block"></div>
              <h4 className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">
                Join a{" "}
                <span className="text-orange-500">Vibrant Community</span>
              </h4>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Connect with students and faculty through clubs, forums, and
                networking events. Build lifelong relationships and grow your
                network.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Student Clubs</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-700">Study Groups</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-gray-700">Events</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-12 text-center">
        <button className="group relative border-2 border-blue-600 px-8 py-3 text-blue-600 rounded-full overflow-hidden">
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            Explore More Features
          </span>
          <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>
    </div>
  );
};

export default Skilline;
