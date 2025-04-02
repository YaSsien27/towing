import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage/CreatePage";
import HomePage from "./pages/HomePage/HomePage";
import UserTowingHome from "./pages/UserTowingHome/UserTowingHome"; 
import UserTowingForm from "./pages/UserTowingForm/UserTowingForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/user-towing-home" element={<UserTowingHome />} /> 
        <Route path="/towing-form/:serviceId" element = {< UserTowingForm />} />
      </Routes>
    </div>
  );
}

export default App;
