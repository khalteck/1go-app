import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { db } from "../firebase/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import { useLocation } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;

  //to save reg form input
  const [regForm, setRegForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  // console.log(regForm);

  //to handle form input change chnage
  function handleRegChange(event) {
    setErrorMessage("");
    const { id, value } = event.target;
    setRegForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  //to save login form input
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  //to handle form input change chnage
  function handleLoginChange(event) {
    setErrorMessage("");
    const { id, value } = event.target;
    setLoginForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  const [loader, setLoader] = useState(false);
  const [inlineLoader, setinlineLoader] = useState(false);

  const navigate = useNavigate();

  //to formate date
  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");

  const register = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const response = await axios.post(
        "https://onegoexploreapp.onrender.com/api/register",
        regForm
      );
      // console.log("Registration successful!", response.data);
      if (response.data.response !== "This account already exist! Sign In") {
        navigate("/login");
      } else {
        setErrorMessage("This account already exist! Sign In");
      }

      return response.data;
    } catch (error) {
      // console.error("Registration failed!", error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setErrorMessage("");
  }, [currentPage]);

  const [userDetails, setUserDetails] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {}
  );

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const response = await axios.post(
        "https://onegoexploreapp.onrender.com/api/login",
        loginForm
      );
      // console.log("Login successful!", response.data);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      setUserDetails(response.data);
      navigate("/book-ride");

      return response.data;
    } catch (error) {
      // console.error("Login failed!", error);
      setErrorMessage("Invalid login credential");
      throw error;
    } finally {
      setLoader(false);
    }
  };

  //to log out users
  const logout = async () => {
    setLoader(true);
    try {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("activeRide");
      localStorage.removeItem("rideHistory");
      localStorage.removeItem("active");
      setUserDetails({});
      navigate("/");
    } catch (err) {
      // console.log(err);
    } finally {
      setLoader(false);
    }
  };

  //to show and hide password
  const [showPassword, setShowPassword] = useState(false);
  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  //to show logout tray
  const [showLogout, setShowLogout] = useState(false);
  function toggleLogoutOn() {
    setShowLogout(true);
  }
  function toggleLogoutOff() {
    setShowLogout(false);
  }

  window.addEventListener("click", () => {
    setShowLogout(false);
  });

  //======================================================================to get current users ride hitory
  const [rideHistory, setrideHistory] = useState([]);
  const fetchRideHistory = async () => {
    setinlineLoader(true);
    // console.log(userDetails?.token);

    try {
      const endpointURL = `https://onegoexploreapp.onrender.com/api/auth/all-ride/${userDetails?.id}`;

      const headers = {
        Authorization: `${userDetails?.token}`,
      };

      const response = await axios.get(endpointURL, { headers });
      // console.log("Ride history fetched successfully!", response.data.response);
      setrideHistory(response.data.response);
    } catch (error) {
      // console.error("Error fetching ride history!", error);
    } finally {
      setinlineLoader(false);
    }
  };

  //dashboard access
  const [userNotLoggedIn, setuserNotLoggedIn] = useState(false);
  function accessDashboard() {
    setuserNotLoggedIn(true);
    if (userDetails?.token) {
      navigate("/book-ride");
      setuserNotLoggedIn(false);
    } else {
      navigate("/login");
      setuserNotLoggedIn(true);
      setTimeout(() => {
        setuserNotLoggedIn(false);
      }, 7000);
    }
  }

  //to save morning time form input
  const [morningForm, setMorningForm] = useState({
    morningHour: "",
    morningMinute: "",
    morningAmpm: "",
    slots: "",
    price: "",
  });

  //to save morning time form input
  function handleMorningChange(event) {
    setFieldsRequired("");
    const { id, value } = event.target;
    setMorningForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  //to save noon time form input
  const [noonForm, setNoonForm] = useState({
    noonHour: "",
    noonMinute: "",
    noonAmpm: "",
    slots: "",
    price: "",
  });

  //to save noon time form input
  function handlenoonChange(event) {
    setFieldsRequired("");
    const { id, value } = event.target;
    setNoonForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  //to handle booking time form data submit to firebase
  const [fieldsRequired, setFieldsRequired] = useState("");

  const [openMorningEdit, setOpenMorningEdit] = useState(false);

  const handleMorningBookingTimeSubmit = async () => {
    setLoader(true);
    let morningTime = `${morningForm.morningHour}:${morningForm.morningMinute} ${morningForm.morningAmpm}`;
    const data = {
      slot: Number(morningForm?.slots),
      price: morningForm?.price,
      time: morningTime,
    };
    // console.log("data", data);
    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/add-to-campus";
      const response = await axios.post(endpointURL, data);
      // console.log("To campus booking time added!", response.data);
      fetchBookingTimes();
      setOpenMorningEdit(false);
    } catch (error) {
      console.error("Error adding to campus booking time", error);
    } finally {
      setLoader(false);
    }
  };

  const [openNoonEdit, setOpenNoonEdit] = useState(false);

  const handleNoonBookingTimeSubmit = async () => {
    setLoader(true);
    let noonTime = `${noonForm.noonHour}:${noonForm.noonMinute} ${noonForm.noonAmpm}`;
    const data = {
      slot: Number(noonForm?.slots),
      price: noonForm?.price,
      time: noonTime,
    };
    // console.log("data", data);
    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/add-off-campus";
      const response = await axios.post(endpointURL, data);
      // console.log("Off campus booking time added!", response.data);
      fetchBookingTimes();
      setOpenNoonEdit(false);
    } catch (error) {
      console.error("Error adding off campus booking time", error);
    } finally {
      setLoader(false);
    }
  };

  //to get number of users from firebase
  const [allUsersFromFirebase, setAllUsersFromFirebase] = useState([]);
  useEffect(() => {
    async function getUsers() {
      // setLoader(true);

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setAllUsersFromFirebase(users);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  //to get total number of rides
  const [allRidesFromFrirebase, setAllRidesFromFrirebase] = useState([]);
  useEffect(() => {
    async function getAllRides() {
      // setLoader(true);

      try {
        const querySnapshot = await getDocs(collection(db, "rideHistory"));
        let rides = [];
        querySnapshot.forEach((doc) => {
          rides.push(doc.data());
        });
        setAllRidesFromFrirebase(rides);
      } catch (err) {
        console.log(err);
      }
    }
    getAllRides();
  }, [userDetails]);

  //to save contact us form data
  const [contactUsData, setContactUsData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  // console.log("contactUsData", contactUsData);

  //to save noon time form input
  function handleContactUsChange(event) {
    setErrorMessage("");
    setSent(false);
    const { id, value } = event.target;
    setContactUsData((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  const [sendingContact, setSendingContact] = useState(false);
  const [sent, setSent] = useState(false);

  //======================================================================to delete booking time
  const handleSubmitContactUs = async () => {
    setSendingContact(true);

    try {
      const endpointURL = "https://onegoexploreapp.onrender.com/api/contact-us";
      const response = await axios.post(endpointURL, contactUsData);
      setSent(true);
      setContactUsData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
      });
      // fetchBookingTimes();
      // console.log("Message sent successfully!", response.data);
    } catch (error) {
      console.error("Error sending message!", error);
    } finally {
      setSendingContact(false);
    }
  };

  //admin login logic  //admin login logic  //admin login logic
  //admin login logic  //admin login logic  //admin login logic
  //admin login logic  //admin login logic  //admin login logic

  //====    "email": "admin1cx@gmail.com",
  //====    "password": "admin1cx@gmail.com.admin"

  //===============================================================to save admin login form input
  const [adminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
  });

  //to save noon time form input
  function handleAdminChange(event) {
    setErrorMessage("");
    const { id, value } = event.target;
    setAdminLoginData((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("admin")) || {}
  );
  const [trackAdmin, setTrackAdmin] = useState(false);
  useEffect(() => {
    setAdmin(JSON.parse(localStorage.getItem("admin")));
  }, [trackAdmin]);

  const loginAdmin = async () => {
    setLoader(true);

    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/login";
      const response = await axios.post(endpointURL, adminLoginData);
      // console.log("Login successful!", response.data);
      localStorage.setItem("admin", JSON.stringify(response.data));
      setAdmin(response.data);
      navigate("/admin");
      setTrackAdmin((prev) => !prev);
    } catch (error) {
      console.error("Login failed!", error);
      setErrorMessage("An error occured: Invalid Credentials");
    } finally {
      setLoader(false);
    }
  };

  //======================================================================to get all booking times
  const [allBookingTimes, setAllBookingTimes] = useState({});
  const fetchBookingTimes = async () => {
    setLoader(true);

    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/ride-to-off-campus";
      const response = await axios.get(endpointURL);
      // console.log("Booking times fetched successfully!", response.data);
      setAllBookingTimes(response.data);
    } catch (error) {
      console.error("Fetching booking times failed!", error);
    } finally {
      setLoader(false);
    }
  };

  //======================================================================to delete booking time
  const deleteBookingTime = async (data) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this booking time?"
    );
    if (userConfirmed) {
      setLoader(true);
      try {
        const endpointURL =
          "https://onegoexploreapp.onrender.com/api/admin/delete-book-ride";
        const response = await axios.post(endpointURL, data);
        fetchBookingTimes();
        // console.log("Time deleted successfully!", response.data);
      } catch (error) {
        console.error("Error deleting time!", error);
      } finally {
        setLoader(false);
      }
    }
  };

  //======================================================================to get all users
  const [allUsers, setallUsers] = useState([]);
  const fetchAllUsers = async () => {
    setLoader(true);

    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/load-users";
      const response = await axios.get(endpointURL);
      // console.log("All users fetched successfully!", response.data.response);
      setallUsers(response.data.response);
    } catch (error) {
      console.error("Fetching all users failed!", error);
    } finally {
      setLoader(false);
    }
  };

  //======================================================================to get all rides
  const [allRides, setallRides] = useState([]);
  const fetchAllRides = async () => {
    setLoader(true);

    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/all-ride";
      const response = await axios.get(endpointURL);
      // console.log("All rides fetched successfully!", response.data.response);
      setallRides(response.data.response);
    } catch (error) {
      console.error("Fetching all rides failed!", error);
    } finally {
      setLoader(false);
    }
  };

  //======================================================================to get all contact us messages
  const [allContacts, setallContacts] = useState([]);
  const fetchAllContacts = async () => {
    setLoader(true);

    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/contact";
      const response = await axios.get(endpointURL);
      // console.log(
      //   "All contact messages fetched successfully!",
      //   response.data.response
      // );
      setallContacts(response.data.response);
    } catch (error) {
      console.error("Fetching all contact messages failed!", error);
    } finally {
      setLoader(false);
    }
  };

  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment
  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment
  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment
  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment

  const [bookingSuccess, setBookingSuccess] = useState(false);
  function cloaseSuccessModal() {
    setBookingSuccess(false);
    navigate("/book-ride");
  }

  //======================================================================to verify payment

  const verifyPayment = async (data) => {
    setLoader(true);
    // console.log("data", data);

    try {
      const endpointURL = `https://onegoexploreapp.onrender.com/api/auth/verify-payment/${userDetails?.id}`;

      const response = await axios.post(endpointURL, JSON.stringify(data), {
        headers: {
          Authorization: `${userDetails?.token}`,
          "Content-Type": "application/json",
        },
      });

      setBookingSuccess(true);
      // console.log("Payment verified successfully!", response.data);
    } catch (error) {
      console.error("Error verifying payment!", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        regForm,
        handleRegChange,
        loader,
        setLoader,
        register,
        showPassword,
        togglePassword,
        handleLoginChange,
        login,
        logout,
        showLogout,
        toggleLogoutOn,
        toggleLogoutOff,
        userNotLoggedIn,
        accessDashboard,
        errorMessage,
        morningForm,
        handleMorningChange,
        noonForm,
        handlenoonChange,
        handleMorningBookingTimeSubmit,
        handleNoonBookingTimeSubmit,
        allUsers,
        admin,
        loginAdmin,
        handleAdminChange,
        bookingSuccess,
        cloaseSuccessModal,
        setBookingSuccess,
        navigate,
        formattedDate,
        allRides,
        handleContactUsChange,
        handleSubmitContactUs,
        sendingContact,
        sent,
        contactUsData,
        fieldsRequired,
        userDetails,
        adminLoginData,
        setErrorMessage,
        setFieldsRequired,
        openMorningEdit,
        setOpenMorningEdit,
        openNoonEdit,
        setOpenNoonEdit,
        fetchBookingTimes,
        allBookingTimes,
        deleteBookingTime,
        fetchAllUsers,
        allUsersFromFirebase,
        allRidesFromFrirebase,
        fetchAllRides,
        allContacts,
        fetchAllContacts,
        fetchRideHistory,
        rideHistory,
        verifyPayment,
        inlineLoader,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContextProvider;
