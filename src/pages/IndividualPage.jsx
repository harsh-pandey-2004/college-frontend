import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Book,
  GraduationCap,
  Building,
  DollarSign,
  Users,
  Award,
  Calendar,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";

const UniversityPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const staticData = {
    overview: {
      description:
        "Parul University is a leading educational institution established in 2009. Located in Vadodara, Gujarat, it offers a wide range of courses across various disciplines.",
      highlights: [
        { icon: <Book className="w-6 h-6" />, text: "51+ Courses Offered" },
        {
          icon: <Building className="w-6 h-6" />,
          text: "State-of-the-art Campus",
        },
        { icon: <Users className="w-6 h-6" />, text: "20,000+ Students" },
        { icon: <Award className="w-6 h-6" />, text: "NAAC A++ Accredited" },
      ],
      facilities: [
        "Modern Laboratories",
        "Digital Library",
        "Sports Complex",
        "Research Centers",
        "Hostel Accommodation",
        "Transportation",
      ],
    },
    courses: [
      {
        name: "B.Tech Computer Science",
        duration: "4 Years",
        fee: "₹2,85,000/year",
        seats: 120,
      },
      {
        name: "MBA",
        duration: "2 Years",
        fee: "₹3,50,000/year",
        seats: 60,
      },
      {
        name: "B.Arch",
        duration: "5 Years",
        fee: "₹2,50,000/year",
        seats: 40,
      },
    ],
    placements: {
      highestPackage: "29 LPA",
      averagePackage: "6.5 LPA",
      companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
    },
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div className="min-h-screen bg-transparent">
      <motion.header
        className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-900">
              Parul University
            </h1>
            <nav className="hidden md:flex space-x-6">
              {["Overview", "Courses", "Admission", "Placements"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item.toLowerCase())}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      activeTab === item.toLowerCase()
                        ? "text-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </nav>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Apply Now
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] bg-gradient-to-r from-blue-900 to-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="text-white max-w-2xl">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Shape Your Future at Parul University
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Discover world-class education with state-of-the-art facilities
              and expert faculty
            </motion.p>
            <motion.div
              className="flex space-x-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300">
                Download Brochure
              </button>
              <button className="bg-white text-blue-900 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300">
                Take Virtual Tour
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        className="bg-white py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {staticData.overview.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="text-blue-600">{highlight.icon}</div>
                <div>
                  <p className="font-medium text-gray-900">{highlight.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staticData.courses.map((course, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {course.name}
                </h3>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Duration: {course.duration}
                  </p>
                  <p className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Fee: {course.fee}
                  </p>
                  <p className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Seats: {course.seats}
                  </p>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Placement Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-xl text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4">Placement Statistics</h3>
              <div className="space-y-4">
                <p className="text-4xl font-bold">
                  {staticData.placements.highestPackage}
                </p>
                <p className="text-lg">Highest Package Offered</p>
                <p className="text-3xl font-bold">
                  {staticData.placements.averagePackage}
                </p>
                <p className="text-lg">Average Package</p>
              </div>
            </motion.div>
            <motion.div
              className="bg-gray-50 p-8 rounded-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Top Recruiters
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {staticData.placements.companies.map((company, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow flex items-center space-x-2"
                  >
                    <Building className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">{company}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityPage;
