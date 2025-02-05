import React from "react";
import CollegeRanking from "../components/RankingComponent";
import HeroSection from "../components/HeroSection";
import WhatweAre from "../components/WhatweAre";
import EducationalInstitutionBrowser from "../components/EducationalBrowser";
import CollegeProcess from "../components/Howitworks";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CollegeRanking />
      <WhatweAre />
      <EducationalInstitutionBrowser />
      <CollegeProcess />
    </div>
  );
};

export default HomePage;
