import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NotificationBar from "./components/UpdateBar";
import RegistrationForm from "./components/Register";
import LoginForm from "./components/Login";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import UniversityPage from "./pages/IndividualPage";

const App = () => {
  return (
    <Router>
      <NotificationBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/indi/:id" element={<UniversityPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
