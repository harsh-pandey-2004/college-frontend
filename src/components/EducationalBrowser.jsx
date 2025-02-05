import React, { useState } from 'react';
import { Building2, Globe, Star, Users, ChevronLeft, ChevronRight, Download, BookOpen } from 'lucide-react';

const EducationalInstitutionBrowser = () => {
  const [activeTab, setActiveTab] = useState('offline');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const offlineColleges = [
    {
      name: 'IIT Bombay',
      location: 'Mumbai, Maharashtra',
      accreditation: 'AICTE, UGC',
      rating: '10/10',
      courseFee: '2.31 Lacs',
      reviews: 368,
      rank: 'Ranked 118 out of 1400 QS',
      stars: 4.4,
      image: '/api/placeholder/400/200'
    },
    {
      name: 'IIT Delhi',
      location: 'New Delhi, Delhi NCR',
      accreditation: 'AICTE, UGC',
      rating: '10/10',
      courseFee: '2.29 Lacs',
      reviews: 637,
      rank: 'Ranked 150 out of 1400 QS',
      stars: 4.3,
      image: '/api/placeholder/400/200'
    },
    {
      name: 'IIT Madras',
      location: 'Chennai, Tamil Nadu',
      accreditation: 'AICTE, UGC',
      rating: '10/10',
      courseFee: '2.25 Lacs',
      reviews: 542,
      rank: 'Ranked 125 out of 1400 QS',
      stars: 4.5,
      image: '/api/placeholder/400/200'
    },
    {
      name: 'IIT Kanpur',
      location: 'Kanpur, Uttar Pradesh',
      accreditation: 'AICTE, UGC',
      rating: '9.8/10',
      courseFee: '2.28 Lacs',
      reviews: 489,
      rank: 'Ranked 132 out of 1400 QS',
      stars: 4.4,
      image: '/api/placeholder/400/200'
    }
  ];

  const onlineColleges = [
    {
      name: 'Coursera',
      location: 'Global',
      accreditation: 'Various University Partners',
      rating: '9.5/10',
      courseFee: '₹2,000 - ₹50,000',
      reviews: 1500,
      rank: '#1 Online Learning Platform',
      stars: 4.5,
      image: '/api/placeholder/400/200'
    },
    {
      name: 'edX',
      location: 'Global',
      accreditation: 'Various University Partners',
      rating: '9.3/10',
      courseFee: '₹3,000 - ₹60,000',
      reviews: 1200,
      rank: '#2 Online Learning Platform',
      stars: 4.4,
      image: '/api/placeholder/400/200'
    },
    {
      name: 'Udacity',
      location: 'Global',
      accreditation: 'Tech Industry Partners',
      rating: '9.0/10',
      courseFee: '₹20,000 - ₹80,000',
      reviews: 950,
      rank: '#3 Online Learning Platform',
      stars: 4.3,
      image: '/api/placeholder/400/200'
    }
  ];

  const collegesData = activeTab === 'offline' ? offlineColleges : onlineColleges;
  const itemsPerPage = window.innerWidth >= 768 ? 2 : 1;
  const totalPages = Math.ceil(collegesData.length / itemsPerPage);

  const handleSlideChange = (direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % totalPages);
    } else {
      setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const renderCollege = (college) => (
    <div key={college.name} className="group bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col h-full">
        <div className="relative overflow-hidden">
          <img
            src={college.image}
            alt={college.name}
            className="h-40 sm:h-48 w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3 flex items-center bg-white bg-opacity-90 px-2 sm:px-3 py-1 rounded-full shadow-md">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
            <span className="text-sm sm:text-base font-semibold">{college.rating}</span>
          </div>
        </div>

        <div className="p-3 sm:p-6 flex-1 flex flex-col">
          <div className="space-y-1 sm:space-y-2">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
              {college.name}
            </h3>
            <div className="flex items-center text-gray-600 space-x-2">
              <Globe className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <p className="text-xs sm:text-sm line-clamp-1">{college.location}</p>
            </div>
            <p className="text-xs sm:text-sm text-blue-600 font-medium">{college.accreditation}</p>
          </div>
          
          <div className="mt-3 sm:mt-6 space-y-2 sm:space-y-4 flex-1">
            <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
              <span className="text-xs sm:text-base text-gray-700 font-medium">First Year Fees</span>
              <span className="text-xs sm:text-base text-blue-600 font-bold">{college.courseFee}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-gray-600">{college.reviews} reviews</span>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
              <p className="text-xs sm:text-sm text-gray-700 font-medium">{college.rank}</p>
            </div>
          </div>

          {/* <div className="mt-3 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-4">
            <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-base">
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">View Courses</span>
            </button>
            <button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-base">
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="whitespace-nowrap">Brochure</span>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 bg-gray-50">
      <div className="mb-6 sm:mb-8 flex justify-center overflow-x-auto scrollbar-hide border-b border-gray-200">
        <div className="flex space-x-2 sm:space-x-4">
          <button
            onClick={() => {
              setActiveTab('offline');
              setCurrentSlide(0);
            }}
            className={`flex items-center px-3 sm:px-6 py-2 sm:py-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
              activeTab === 'offline'
                ? 'border-blue-500 text-blue-600 scale-105'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Top Offline Colleges</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('online');
              setCurrentSlide(0);
            }}
            className={`flex items-center px-3 sm:px-6 py-2 sm:py-3 border-b-2 transition-all duration-300 whitespace-nowrap ${
              activeTab === 'online'
                ? 'border-blue-500 text-blue-600 scale-105'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Top Online Colleges</span>
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-white p-3 sm:p-6">
        <div 
          className="transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            display: 'grid',
            gridTemplateColumns: `repeat(${totalPages}, 100%)`,
            width: `${totalPages * 100}%`
          }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 px-2 sm:px-4">
              {collegesData
                .slice(pageIndex * itemsPerPage, (pageIndex * itemsPerPage) + itemsPerPage)
                .map(renderCollege)}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:mt-8 gap-4 sm:gap-6">
            <button
              onClick={() => handleSlideChange('prev')}
              className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200 disabled:opacity-50 transition-all duration-300 disabled:cursor-not-allowed"
              disabled={currentSlide === 0 || isAnimating}
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </button>
            
            <div className="flex gap-2 sm:gap-3 items-center">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === index ? 'w-6 sm:w-8 bg-blue-600' : 'w-1.5 sm:w-2 bg-blue-200 hover:bg-blue-300'
                  }`}
                  onClick={() => {
                    if (!isAnimating) {
                      setCurrentSlide(index);
                    }
                  }}
                />
              ))}
            </div>
            
            <button
              onClick={() => handleSlideChange('next')}
              className="p-2 sm:p-3 rounded-full bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-200 disabled:opacity-50 transition-all duration-300 disabled:cursor-not-allowed"
              disabled={currentSlide === totalPages - 1 || isAnimating}
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalInstitutionBrowser;