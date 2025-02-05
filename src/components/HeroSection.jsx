import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import {
  Search,
  BookOpen,
  Award,
  Layers,
  Grid,
  Star,
  ChevronRight,
  ArrowRight,
  Loader2,
} from "lucide-react";
import HeroVideo from "../assets/videos/hero.mp4";
import { fetchCollegesByquery } from "../network/college";

const AnimatedText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const interests = [
    "Technology",
    "Design",
    "Business",
    "Arts",
    "Science",
    "Healthcare",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % interests.length);
        setIsVisible(true);
      }, 500);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-24 md:h-28 flex items-center justify-center overflow-hidden">
      <div
        className={`transform transition-all duration-500 ease-out text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 text-5xl md:text-6xl font-bold
          ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-8 opacity-0 scale-95"
          }`}
      >
        {interests[currentIndex]}
      </div>
    </div>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="group relative overflow-hidden px-4 py-2 hover:text-blue-300 transition-all duration-300"
  >
    <span className="relative z-10">{children}</span>
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
    <div className="absolute inset-0 bg-white/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
  </Link>
);

const SearchResultItem = ({
  course,
  isSelected,
  onClick,
  onMouseEnter,
  navigate,
}) => (
  <li
    className={`group flex items-center px-6 py-4 cursor-pointer transition-all duration-200 ${
      isSelected ? "bg-blue-50" : "hover:bg-gray-50"
    }`}
    onClick={() => navigate("/indi/id")}
    onMouseEnter={onMouseEnter}
  >
    <div className="mr-4 text-blue-600 transform group-hover:scale-110 transition-transform duration-300">
      {course.icon}
    </div>
    <div className="flex flex-col items-start flex-grow">
      <span
        className={`font-semibold ${
          isSelected
            ? "text-blue-600"
            : "text-gray-800 group-hover:text-blue-600"
        } transition-colors`}
      >
        {course.name}
      </span>
      <span className="text-sm text-gray-600">
        {course.institute} • {course.level}
      </span>
      <span className="text-xs text-gray-500">
        {course.duration} • ₹{course.fee.toLocaleString("en-IN")}
      </span>
    </div>
    <ArrowRight
      className={`w-5 h-5 ${
        isSelected ? "text-blue-600" : "text-gray-400"
      } transform ${
        isSelected ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
      } group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300`}
    />
  </li>
);

const LoadingState = () => (
  <div className="px-6 py-8 flex flex-col items-center space-y-4">
    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
    <p className="text-gray-500 text-sm">Searching courses...</p>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="px-6 py-8 flex flex-col items-center space-y-4 text-red-500">
    <p>{message}</p>
    <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
      Try again
    </button>
  </div>
);

const EmptyState = () => (
  <div className="px-6 py-8 flex flex-col items-center space-y-2 text-gray-500">
    <p>No courses found</p>
    <p className="text-sm">Try adjusting your search terms</p>
  </div>
);

const HeroSection = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const getIconForStream = (stream) => {
    const streamIcons = {
      Technology: <BookOpen className="w-6 h-6" />,
      Engineering: <BookOpen className="w-6 h-6" />,
      Design: <Layers className="w-6 h-6" />,
      Management: <Award className="w-6 h-6" />,
      Arts: <Star className="w-6 h-6" />,
      Finance: <Award className="w-6 h-6" />,
      default: <Grid className="w-6 h-6" />,
    };
    return streamIcons[stream] || streamIcons.default;
  };

  const fetchSearchResults = async (value) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchCollegesByquery(value);
      if (!response.success) {
        throw new Error("Failed to fetch courses");
      }

      const formattedSuggestions = response.courses.map((course) => ({
        id: course._id,
        name: course.courseName,
        institute: `${course.instituteName}, ${course.instituteCity}`,
        stream: course.courseStream,
        level: course.level,
        fee: course.fee,
        duration: `${course.courseDuration} ${course.durationType}`,
        icon: getIconForStream(course.courseStream),
      }));

      setFilteredSuggestions(formattedSuggestions);
      setIsSuggestionVisible(true);
      setSelectedIndex(-1);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please try again.");
      setFilteredSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchResults = useCallback(
    debounce((value) => {
      if (value.length >= 2) {
        fetchSearchResults(value);
      } else {
        setFilteredSuggestions([]);
        setIsSuggestionVisible(false);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);
    if (value.length >= 2) {
      setIsSuggestionVisible(true);
      debouncedFetchResults(value);
    } else {
      setIsSuggestionVisible(false);
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (course) => {
    setSearchTerm(course.name);
    setIsSuggestionVisible(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e) => {
    if (!isSuggestionVisible) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsSuggestionVisible(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSuggestionVisible(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={HeroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      <nav className="absolute top-0 left-0 w-full bg-transparent text-white py-6 z-20">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="hidden md:flex space-x-2">
            {[
              ["technology", "Technology"],
              ["creativity", "Creativity"],
              ["science", "Science"],
              ["finance", "Finance"],
              ["arts", "Arts & Humanities"],
              ["business", "Business"],
              ["health", "Health"],
            ].map(([to, label]) => (
              <NavLink key={to} to={`/${to}`}>
                {label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/new"
              className="relative group px-6 py-2 overflow-hidden rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              <span className="relative font-semibold">NEW</span>
            </Link>
            <Link
              to="/ai-career-predictor"
              className="group flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300"
            >
              <span>AI Career Predictor</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
        <div className="space-y-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-in">
            <span className="block mb-4">Explore Courses Based on</span>
            <AnimatedText />
          </h1>

          <div
            ref={searchRef}
            className="relative w-full max-w-2xl mx-auto animate-fade-in-up"
          >
            <div
              className={`flex rounded-full shadow-2xl transform transition-all duration-300 ${
                isSearchFocused
                  ? "scale-105 ring-2 ring-blue-500 ring-opacity-50"
                  : "scale-100"
              }`}
            >
              <div className="flex-grow relative">
                <Search
                  className={`absolute left-6 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    isSearchFocused ? "text-blue-500" : "text-gray-400"
                  }`}
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for colleges, courses, streams..."
                  className="w-full pl-16 pr-6 py-5 text-lg text-gray-700 outline-none rounded-l-full transition-all duration-300"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    searchTerm.length >= 2 && setIsSuggestionVisible(true);
                  }}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </div>
              <button className="bg-blue-600 text-white px-8 py-5 rounded-r-full font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                Search
              </button>
            </div>

            <div
              className={`absolute left-0 w-full mt-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-30 transition-all duration-300 transform origin-top ${
                isSuggestionVisible
                  ? "opacity-100 scale-y-100 translate-y-0"
                  : "opacity-0 scale-y-0 -translate-y-4"
              }`}
            >
              {isLoading ? (
                <LoadingState />
              ) : error ? (
                <ErrorState message={error} />
              ) : filteredSuggestions.length > 0 ? (
                <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
                  {filteredSuggestions.map((course, index) => (
                    <SearchResultItem
                      key={course.id}
                      navigate={navigate}
                      course={course}
                      isSelected={index === selectedIndex}
                      onClick={handleSuggestionClick}
                      onMouseEnter={() => setSelectedIndex(index)}
                    />
                  ))}
                </ul>
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
