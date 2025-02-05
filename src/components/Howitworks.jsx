import React, { useState, useEffect } from "react";
import {
  FilePen,
  Clock3,
  Building2,
  Headphones,
  Award,
  GraduationCap,
} from "lucide-react";

const CollegeProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(Array(6).fill(false));
  const [hoverIndex, setHoverIndex] = useState(null);

  const steps = [
    { id: 1, label: "Register", icon: <GraduationCap />, completed: true },
    { id: 2, label: "Select Course", icon: <FilePen />, completed: true },
    { id: 3, label: "Fill Application", icon: <Clock3 />, completed: true },
    { id: 4, label: "Upload Documents", icon: <Building2 />, completed: false },
    { id: 5, label: "Make Payment", icon: <Headphones />, completed: false },
    {
      id: 6,
      label: "Admission Confirmation",
      icon: <Award />,
      completed: false,
    },
  ];

  const features = [
    {
      title: "Get Your Career Match",
      description:
        "Take our free career compass personality quiz and get top career options for you.",
      icon: <FilePen className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      title: "Apply With One Form",
      description: "One platform to apply to 2000+ esteemed colleges",
      icon: <FilePen className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Track Applications",
      description:
        "Apply to and manage all college applications through My Profile",
      icon: <Building2 className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      title: "Expert Guidance",
      description:
        "Get free personalised expert guidance on colleges & courses",
      icon: <Headphones className="w-8 h-8" />,
      color: "bg-yellow-500",
    },
    {
      title: "Quick 5-min Apply",
      description: "Fill your college applications in 5 minutes or less.",
      icon: <Clock3 className="w-8 h-8" />,
      color: "bg-red-500",
    },
    {
      title: "Win Rewards",
      description: "Win amazing rewards and cash-backs while applying",
      icon: <Award className="w-8 h-8" />,
      color: "bg-indigo-500",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const showFeatures = () => {
      isVisible.forEach((_, index) => {
        setTimeout(() => {
          setIsVisible((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }, index * 300);
      });
    };
    showFeatures();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-6xl font-bold text-blue-600 mb-6">
          Your College Journey Starts Here
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          We're here to guide you at every step of your college journey.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg mb-16 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center md:items-center relative flex-col md:flex-row gap-5 md:gap-0 md:justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center relative">
                <div
                  className={`flex flex-col items-center ${
                    index !== steps.length - 1 ? "w-full" : ""
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 transform hover:scale-110 ${
                      index === activeStep
                        ? "bg-blue-600 scale-110"
                        : index < activeStep
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  >
                    <div className="text-white transform transition-transform duration-500">
                      {step.icon}
                    </div>
                  </div>
                  <span
                    className={`text-sm mt-3 font-medium transition-all duration-500 ${
                      index === activeStep
                        ? "text-blue-600 scale-110"
                        : "text-gray-600"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div className="h-1 w-full bg-gray-200 relative">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000"
                      style={{
                        width:
                          index < activeStep
                            ? "100%"
                            : index === activeStep
                            ? "50%"
                            : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`transform transition-all duration-1000 ${
              isVisible[index]
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            }`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`${feature.color} p-4 rounded-xl text-white transform transition-all duration-500 group-hover:rotate-12 group-hover:scale-110`}
                  >
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.description}
                      
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <button className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-bold hover:shadow-xl hover:-translate-y-1 transform">
          Start Your Journey Now
        </button>
        <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 font-bold hover:shadow-xl hover:-translate-y-1 transform">
          Speak with an Expert
        </button>
      </div>
    </div>
  );
};

export default CollegeProcess;
