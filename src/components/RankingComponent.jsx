import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  ChevronDown,
  Search,
  School,
  MapPin,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { fetchCollegesFilter } from "../network/college";

const FilterButton = ({
  value,
  onChange,
  options,
  placeholder,
  icon: Icon,
}) => (
  <div className="relative group">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none pl-10 pr-8 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all duration-300 shadow-sm"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <Icon
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
      size={18}
    />
    <ChevronDown
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
      size={18}
    />
  </div>
);

const CollegeRanking = () => {
  const [colleges, setColleges] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [feeRange, setFeeRange] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [level, setLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollegesFilter()
        .then((response) => {
          setColleges(response);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetchData();
  }, []);

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      const matchesState =
        stateFilter === "" || college.instituteState === stateFilter;
      const matchesSearch =
        searchQuery === "" ||
        college.instituteName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = level === "" || college.level === level;
      const matchesDuration =
        courseDuration === "" ||
        college.courseDuration === parseInt(courseDuration);
      const matchesFee =
        feeRange === "" ||
        (feeRange === "low" && college.fee < 50000) ||
        (feeRange === "medium" &&
          college.fee >= 50000 &&
          college.fee <= 100000) ||
        (feeRange === "high" && college.fee > 100000);

      return (
        matchesState &&
        matchesSearch &&
        matchesFee &&
        matchesDuration &&
        matchesLevel
      );
    });
  }, [colleges, stateFilter, searchQuery, feeRange, courseDuration, level]);

  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);
  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * collegesPerPage,
    currentPage * collegesPerPage
  );

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8">
            <h1 className="text-4xl font-bold text-white">College Rankings</h1>
            <p className="text-blue-100 mt-2 text-lg">
              Find your perfect educational path
            </p>
          </div>

          <div className="p-8 bg-white space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search colleges..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 hover:border-blue-500 transition-all duration-300 shadow-sm"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                  size={18}
                />
              </div>

              <FilterButton
                value={stateFilter}
                onChange={setStateFilter}
                options={Array.from(
                  new Set(colleges.map((college) => college.instituteState))
                ).map((state) => ({
                  value: state,
                  label: state,
                }))}
                placeholder="Filter by State"
                icon={MapPin}
              />

              <FilterButton
                value={feeRange}
                onChange={setFeeRange}
                options={[
                  { value: "low", label: "Below ₹50,000" },
                  { value: "medium", label: "₹50,000 - ₹1,00,000" },
                  { value: "high", label: "Above ₹1,00,000" },
                ]}
                placeholder="Filter by Fee"
                icon={Tag}
              />

              <FilterButton
                value={courseDuration}
                onChange={setCourseDuration}
                options={[
                  { value: "1", label: "1 Year" },
                  { value: "2", label: "2 Years" },
                  { value: "3", label: "3 Years" },
                  { value: "4", label: "4 Years" },
                ]}
                placeholder="Filter by Duration"
                icon={Clock}
              />

              <FilterButton
                value={level}
                onChange={setLevel}
                options={[
                  { value: "UG", label: "Undergraduate" },
                  { value: "PG", label: "Postgraduate" },
                ]}
                placeholder="Filter by Level"
                icon={School}
              />
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {[
                      "Institute Name",
                      "City",
                      "State",
                      "Course",
                      "Fee",
                      "Duration",
                      "Level",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-gray-600 font-semibold"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedColleges.length > 0 ? (
                    paginatedColleges.map((college, index) => (
                      <tr
                        key={index}
                        className="hover:bg-blue-50/50 transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium text-blue-600 group-hover:text-blue-700">
                          {college.instituteName}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {college.instituteCity}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {college.instituteState}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {college.courseName}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          ₹{college.fee.toLocaleString("en-IN")}{" "}
                          {college.feeType}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {college.courseDuration} {college.durationType}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              college.level === "UG"
                                ? "bg-green-100 text-green-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {college.level}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No colleges found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeRanking;
