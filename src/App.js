import AddDoctor from "pages/dashboard/AddDoctor";
import Dashboard from "pages/dashboard/Dashboard";
import MyAppointments from "pages/dashboard/MyAppointments";
import ManageDoctors from "pages/dashboard/ManageDoctors";
import Users from "pages/dashboard/Users";
import PowerfulTags from "pages/html/PowerfulTags";
import Register from "pages/login/Register";
import NotFound from "pages/shared/NotFound";
import Protected from "pages/shared/Protected";
import RequireAdmin from "pages/shared/RequireAdmin";
import "react-day-picker/dist/style.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import About from "./pages/about/About";
import Appointment from "./pages/appointment/Appointment";
import Contact from "./pages/contact/Contact";
import Reviews from "./pages/dashboard/Reviews";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Navbar from "./pages/shared/Navbar";
import Payment from "pages/dashboard/Payment";
import UserProfile from "pages/dashboard/UserProfile";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/html" element={<PowerfulTags />} />
        <Route path="/appointment" element={<Protected>  <Appointment />  </Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>}>
          <Route index element={<MyAppointments />} />
          <Route path="my-appointment" element={<MyAppointments />} />
          <Route path="payment/:paymentId" element={<Payment />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="users" element={<RequireAdmin><Users /></RequireAdmin>} />
          <Route path="add-doctor" element={<RequireAdmin><AddDoctor /></RequireAdmin>} />
          <Route path="doctors" element={<RequireAdmin><ManageDoctors /></RequireAdmin>} />
        </Route>

        <Route path="/contact-us" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-left" draggable />
    </div>
  );
}

export default App;
