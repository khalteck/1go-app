import { Routes, Route } from "react-router-dom";
import "./output.css";
import Homepage from "./pages/Homepage";
import { useAppContext } from "./contexts/AppContext";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";
// import Maintenance from "./pages/Maintenance";
const About = lazy(() => import("./pages/About"));
const BookRides = lazy(() => import("./pages/BookRides"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Summary = lazy(() => import("./pages/Summary"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const BookingTimes = lazy(() => import("./admin/BookingTimes"));
const AdminLogin = lazy(() => import("./admin/AdminLogin"));
const BusRiders = lazy(() => import("./bus riders/BusRiders"));
const BookingSuccess = lazy(() => import("./pages/BokkingSuccess"));
const RideDetails = lazy(() => import("./pages/RideDetails"));

function App() {
  const { userDetails, admin } = useAppContext();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* dashboard controlled access */}
        {userDetails?.token ? (
          <>
            <Route path="/book-ride" element={<BookRides />} />
            <Route path="/book-ride/summary/:_id" element={<Summary />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/ride-history/:_id" element={<RideDetails />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        {/* admin access */}
        <Route
          path="/admin"
          element={admin ? <AdminDashboard /> : <AdminLogin />}
        />
        <Route
          path="/admin/booking-times"
          element={admin ? <BookingTimes /> : <AdminLogin />}
        />

        {/* Bus riders page */}
        <Route path="/bus-riders" element={<BusRiders />} />

        {/* page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
