import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import qs from "qs";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import {
  getDocs,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const location = useLocation();
  let currentPage = location.pathname;

  const [checkTime, setCheckTime] = useState(true);

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

  //to save login form input
  const [resetpswForm, setResetpswForm] = useState({
    email: "",
  });

  //to handle form input change chnage
  function handleResetpswChange(event) {
    setErrorMessage("");
    const { id, value } = event.target;
    setResetpswForm((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  }

  const [loader, setLoader] = useState(false);
  const [inlineLoader, setinlineLoader] = useState(false);

  const navigate = useNavigate();

  // function to create user doc on sign up
  const createUserDocument = async (
    firstname,
    lastname,
    email,
    phone,
    createdAt
  ) => {
    try {
      const docRef = await setDoc(doc(db, "users", `${email}`), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        createdAt: createdAt,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

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
      console.log("Registration successful!", response.data);
      if (response.data.response !== "This account already exist! Sign In") {
        navigate("/login");
      } else {
        setErrorMessage("This account already exist! Sign In");
      }

      return response.data;
    } catch (error) {
      console.error("Registration failed!", error);
      throw error;
    } finally {
      setLoader(false);
    }
  };

  // to handle reg form data submit to firebase
  // const register = async (e) => {
  //   e.preventDefault();
  //   setLoader(true);

  //   try {
  //     await createUserWithEmailAndPassword(
  //       auth,
  //       regForm.email,
  //       regForm.password
  //     );
  //     setLoader(false);
  //     navigate("/book-ride");
  //     await createUserDocument(
  //       regForm.firstname,
  //       regForm.lastname,
  //       regForm.email,
  //       regForm.phone,
  //       formattedDate
  //     );
  //     window.location.reload();
  //   } catch (error) {
  //     if (error.message === "Firebase: Error (auth/network-request-failed).") {
  //       setErrorMessage("Bad network connection");
  //     }
  //     console.log(error.message);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const forgotpswSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    if (resetpswForm.email) {
      try {
        await sendPasswordResetEmail(auth, resetpswForm.email);
        alert("Password reset link sent successfully");
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    } else {
      alert("Type in your email");
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
      console.log("Login successful!", response.data);
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      setUserDetails(response.data);
      navigate("/book-ride");

      return response.data;
    } catch (error) {
      console.error("Login failed!", error);
      setErrorMessage("Invalid login credential");
      throw error;
    } finally {
      setLoader(false);
    }
  };

  //to log in users
  // const login = async (e) => {
  //   e.preventDefault();
  //   setLoader(true);

  //   try {
  //     await signInWithEmailAndPassword(
  //       auth,
  //       loginForm.email,
  //       loginForm.password
  //     );
  //     setLoader(false);
  //     navigate("/book-ride");
  //     window.location.reload();
  //   } catch (error) {
  //     setLoader(false);
  //     console.log(error.message);
  //     if (error.message === "Firebase: Error (auth/user-not-found).") {
  //       setErrorMessage("Email address does not exist");
  //     } else if (error.message === "Firebase: Error (auth/wrong-password).") {
  //       setErrorMessage("Invalid login credentials");
  //     } else if (
  //       error.message === "Firebase: Error (auth/network-request-failed)."
  //     ) {
  //       setErrorMessage("Bad network connection");
  //     }
  //   }
  // };

  //to log out users
  const logout = async () => {
    setLoader(true);
    try {
      localStorage.removeItem("userDetails");
      localStorage.removeItem("activeRide");
      localStorage.removeItem("rideHistory");
      localStorage.removeItem("active");
      setUserDetails({});

      signOut(auth).then(() => {
        navigate("/");
      });
    } catch (err) {
      console.log(err);
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
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/auth/all-ride";

      const headers = {
        Authorization: `${userDetails?.token}`,
      };

      const response = await axios.get(endpointURL, { headers });
      console.log("Ride history fetched successfully!", response.data.response);
      setrideHistory(response.data.response);
    } catch (error) {
      console.error("Error fetching ride history!", error);
    } finally {
      setinlineLoader(false);
    }
  };

  //to save current user from auth in state
  // const [user, setUser] = useState({ name: "", email: "" });
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  // }, []);

  //to save current user from db
  // const [currentUserFromDb, setCurrentUserFromDb] = useState(
  //   JSON.parse(localStorage.getItem("userDetails")) || {}
  // );

  // useEffect(() => {
  //   setCurrentUserFromDb(JSON.parse(localStorage.getItem("userDetails")));
  // }, [user]);

  const [takingLong, setTakingLong] = useState(false);

  //to get users saved in db
  // useEffect(() => {
  //   if (user) {
  //     const getUserDetails = async () => {
  //       setLoader(true);
  //       setTimeout(() => {
  //         loader ? setTakingLong(true) : setTakingLong(false);
  //       }, 5000);
  //       const userQuery = query(
  //         collection(db, "users"),
  //         where("email", "==", user?.email)
  //       );
  //       try {
  //         const querySnapshot = await getDocs(userQuery);
  //         let me;
  //         querySnapshot.forEach((doc) => {
  //           me = doc.data();
  //         });
  //         me && localStorage.setItem("userDetails", JSON.stringify(me));
  //         me && setCurrentUserFromDb(me);

  //         // setLoader(false);
  //       } catch (err) {
  //         console.log(err.message);
  //         // setLoader(false);
  //       } finally {
  //         setLoader(false);
  //         setTakingLong(false);
  //       }
  //     };
  //     getUserDetails();
  //   }
  // }, [user]);

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
  //function to save morning booking time doc on sign up
  //function to save morning booking time doc on sign up
  //function to save morning booking time doc on sign up
  //function to save morning booking time doc on sign up
  // const [activeRideChange, setActiveRideChange] = useState(false);
  // const [updatedTime, setUpdatedTime] = useState(false);

  // //to save booking time from db
  // const [morningBookingTimesFromDb, setMorningBookingTimesFromDb] = useState(
  //   JSON.parse(localStorage.getItem("morningTimes")) || []
  // );

  // //to get morning booking times
  // useEffect(() => {
  //   const getMorningBookingTime = async () => {
  //     setLoader(true);

  //     try {
  //       const querySnapshot = await getDocs(
  //         collection(db, "morningBookingTimes")
  //       );
  //       let times = [];
  //       querySnapshot.forEach((doc) => {
  //         times.push(doc.data());
  //       });
  //       let arranged = times?.sort(function (a, b) {
  //         return a.id.slice(-2) - b.id.slice(-2);
  //       });
  //       times.length > 0 &&
  //         localStorage.setItem("morningTimes", JSON.stringify(arranged));
  //       times.length > 0 && setMorningBookingTimesFromDb(arranged);
  //     } catch (err) {
  //       console.log(err.message);
  //     } finally {
  //       setLoader(false);
  //     }
  //   };
  //   getMorningBookingTime();
  // }, [updatedTime, activeRideChange, currentPage]);

  //to send created notes to db
  // const createMorningBookingTimeDocument = async (
  //   time,
  //   createdAt,
  //   slots,
  //   price
  // ) => {
  //   setLoader(true);

  //   try {
  //     const querySnapshot = await getDocs(
  //       collection(db, "morningBookingTimes")
  //     );
  //     let times = [];
  //     querySnapshot.forEach((doc) => {
  //       times.push(doc.data());
  //     });
  //     times.length > 0 &&
  //       localStorage.setItem("morningTimes", JSON.stringify(times));
  //     await setDoc(
  //       doc(
  //         db,
  //         "morningBookingTimes",
  //         `${time.replace(/ /g, "_")}_${createdAt}_0${
  //           morningBookingTimesFromDb?.length + 1
  //         }`
  //       ),
  //       {
  //         time: time,
  //         id: `${time.replace(/ /g, "_")}_${createdAt}_0${
  //           morningBookingTimesFromDb?.length + 1
  //         }`,
  //         createdAt: createdAt,
  //         slots: slots,
  //         price: price,
  //         from: "outside",
  //       }
  //     );
  //     console.log("morning booking time created");
  //     setUpdatedTime((prev) => !prev);
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Error creating morning time: ", err);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  //to handle booking time form data submit to firebase
  const [fieldsRequired, setFieldsRequired] = useState("");
  // const handleMorningBookingTimeSubmit = async (e) => {
  //   e.preventDefault();
  //   if (
  //     morningForm.morningHour &&
  //     morningForm.morningMinute &&
  //     morningForm.morningAmpm &&
  //     morningForm.slots &&
  //     morningForm.price
  //   ) {
  //     let morningTime = `${morningForm.morningHour}:${morningForm.morningMinute} ${morningForm.morningAmpm}`;
  //     setLoader(true);

  //     try {
  //       await createMorningBookingTimeDocument(
  //         morningTime,
  //         formattedDate,
  //         morningForm.slots,
  //         morningForm.price
  //       );
  //       setLoader(false);
  //     } catch (error) {
  //       setLoader(false);
  //       console.log(error.message);
  //     }
  //   } else {
  //     setFieldsRequired("Please fill all fields!");
  //   }
  // };

  const [openMorningEdit, setOpenMorningEdit] = useState(false);

  const handleMorningBookingTimeSubmit = async () => {
    setLoader(true);
    let morningTime = `${morningForm.morningHour}:${morningForm.morningMinute} ${morningForm.morningAmpm}`;
    const data = {
      slot: Number(morningForm?.slots),
      price: morningForm?.price,
      time: morningTime,
    };
    console.log("data", data);
    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/add-to-campus";
      const response = await axios.post(endpointURL, data);
      console.log("To campus booking time added!", response.data);
      fetchBookingTimes();
      setOpenMorningEdit(false);
    } catch (error) {
      console.error("Error adding to campus booking time", error);
    } finally {
      setLoader(false);
    }
  };

  //function to save noon booking time doc on sign up
  //function to save noon booking time doc on sign up
  //function to save noon booking time doc on sign up
  //function to save noon booking time doc on sign up

  //to save booking time from db
  // const [noonBookingTimesFromDb, setNoonBookingTimesFromDb] = useState(
  //   JSON.parse(localStorage.getItem("noonTimes")) || []
  // );

  // //to get noon booking timesaved in db
  // useEffect(() => {
  //   const getNoonBookingTime = async () => {
  //     setLoader(true);

  //     try {
  //       const querySnapshot = await getDocs(collection(db, "noonBookingTimes"));
  //       let times = [];
  //       querySnapshot.forEach((doc) => {
  //         times.push(doc.data());
  //       });
  //       let arranged = times?.sort(function (a, b) {
  //         return a.id.slice(-2) - b.id.slice(-2);
  //       });
  //       times.length > 0 &&
  //         localStorage.setItem("noonTimes", JSON.stringify(arranged));
  //       times.length > 0 && setNoonBookingTimesFromDb(arranged);
  //     } catch (err) {
  //       console.log(err.message);
  //     } finally {
  //       setLoader(false);
  //     }
  //   };
  //   getNoonBookingTime();
  // }, [updatedTime, activeRideChange, currentPage]);

  //to send created notes to db
  // const createNoonBookingTimeDocument = async (
  //   time,
  //   createdAt,
  //   slots,
  //   price
  // ) => {
  //   setLoader(true);

  //   try {
  //     const querySnapshot = await getDocs(collection(db, "noonBookingTimes"));
  //     let times = [];
  //     querySnapshot.forEach((doc) => {
  //       times.push(doc.data());
  //     });
  //     times.length > 0 &&
  //       localStorage.setItem("noonTimes", JSON.stringify(times));
  //     await setDoc(
  //       doc(
  //         db,
  //         "noonBookingTimes",
  //         `${time.replace(/ /g, "_")}_${createdAt}_0${
  //           noonBookingTimesFromDb.length + 1
  //         }`
  //       ),
  //       {
  //         time: time,
  //         id: `${time.replace(/ /g, "_")}_${createdAt}_0${
  //           noonBookingTimesFromDb.length + 1
  //         }`,
  //         createdAt: createdAt,
  //         slots: slots,
  //         price: price,
  //         from: "inside",
  //       }
  //     );
  //     console.log("noon booking time created");
  //     setUpdatedTime((prev) => !prev);
  //     window.location.reload();
  //   } catch (err) {
  //     console.error("Error creating noon time: ", err);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  //to handle booking time form data submit to firebase
  // const handleNoonBookingTimeSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     noonForm.noonHour &&
  //     noonForm.noonMinute &&
  //     noonForm.noonAmpm &&
  //     noonForm.slots &&
  //     noonForm.price
  //   ) {
  //     let noonTime = `${noonForm.noonHour}:${noonForm.noonMinute} ${noonForm.noonAmpm}`;
  //     setLoader(true);

  //     try {
  //       await createNoonBookingTimeDocument(
  //         noonTime,
  //         formattedDate,
  //         noonForm.slots,
  //         noonForm.price
  //       );
  //       await getNoonBookingTime();
  //       added = false;
  //       setLoader(false);
  //       window.location.reload();
  //     } catch (error) {
  //       setLoader(false);
  //       console.log(error.message);
  //     }
  //   } else {
  //     setFieldsRequired("Please fill all fields!");
  //   }
  // };

  const [openNoonEdit, setOpenNoonEdit] = useState(false);

  const handleNoonBookingTimeSubmit = async () => {
    setLoader(true);
    let noonTime = `${noonForm.noonHour}:${noonForm.noonMinute} ${noonForm.noonAmpm}`;
    const data = {
      slot: Number(noonForm?.slots),
      price: noonForm?.price,
      time: noonTime,
    };
    console.log("data", data);
    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/admin/add-off-campus";
      const response = await axios.post(endpointURL, data);
      console.log("Off campus booking time added!", response.data);
      fetchBookingTimes();
      setOpenNoonEdit(false);
    } catch (error) {
      console.error("Error adding off campus booking time", error);
    } finally {
      setLoader(false);
    }
  };

  // //to delete time from db
  // const deleteMorningTimeDoc = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "morningBookingTimes", id));
  //     console.log("morning time deleted");
  //   } catch (err) {
  //     console.log("error deleting morning time: ", err);
  //   }
  // };

  // //to delete morning time
  // function handleDeleteMorningTime(id) {
  //   let mark = "Delete time?";

  //   if (confirm(mark) == true) {
  //     deleteMorningTimeDoc(id);
  //     setUpdatedTime((prev) => !prev);
  //     if (morningBookingTimesFromDb?.length === 1) {
  //       localStorage.removeItem("morningTimes");
  //       window.location.reload();
  //     }
  //   }
  // }

  // //to delete time from db
  // const deleteNoonTimeDoc = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "noonBookingTimes", id));
  //     console.log("Noon time deleted");
  //   } catch (err) {
  //     console.log("error deleting Noon time: ", err);
  //   }
  // };

  // //to delete time
  // function handleDeleteNoonTime(id) {
  //   let mark = "Delete time?";

  //   if (confirm(mark) == true) {
  //     deleteNoonTimeDoc(id);
  //     setUpdatedTime((prev) => !prev);
  //     if (noonBookingTimesFromDb.length === 1) {
  //       localStorage.removeItem("noonTimes");
  //       window.location.reload();
  //     }
  //   }
  // }

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

  // //to get number of rides today
  // const [ridesToday, setridesToday] = useState([]);

  // useEffect(() => {
  //   if (userDetails?.token) {
  //     const getRidesToday = async () => {
  //       // setLoader(true);
  //       const userQuery = query(
  //         collection(db, "rideHistory"),
  //         where("createdAt", "==", `${formattedDate}`)
  //       );
  //       try {
  //         const querySnapshot = await getDocs(userQuery);
  //         let ride = [];
  //         querySnapshot.forEach((doc) => {
  //           ride.push(doc.data());
  //         });
  //         let arranged = ride?.sort(function (a, b) {
  //           return b?.id.slice(-3) - a?.id.slice(-3);
  //         });
  //         setridesToday(arranged);
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     };
  //     getRidesToday();
  //   }
  // }, []);

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

  // const createContactUsDoc = async (
  //   fname,
  //   lname,
  //   email,
  //   phone,
  //   message,
  //   createdAt
  // ) => {
  //   try {
  //     await setDoc(
  //       doc(
  //         db,
  //         "contactUs",
  //         `${email}_${createdAt}_00${messageFromDb?.length + 1}`
  //       ),
  //       {
  //         id: `${email}_${createdAt}_00${messageFromDb?.length + 1}`,
  //         fname: fname,
  //         lname: lname,
  //         email: email,
  //         phone: phone,
  //         message: message,
  //         createdAt: createdAt,
  //       }
  //     );
  //   } catch (err) {
  //     console.error("Error adding document: ", err);
  //   }
  // };

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
      console.log("Message sent successfully!", response.data);
    } catch (error) {
      console.error("Error sending message!", error);
    } finally {
      setSendingContact(false);
    }
  };

  // async function handleSubmitContactUs(e) {
  //   e.preventDefault();
  //   if (contactUsData.email && contactUsData.message) {
  //     setSendingContact(true);

  //     try {
  //       await createContactUsDoc(
  //         contactUsData?.fname,
  //         contactUsData?.lname,
  //         contactUsData?.email,
  //         contactUsData?.phone,
  //         contactUsData?.message,
  //         formattedDate
  //       );
  //       setSent(true);
  //       setContactUsData({
  //         fname: "",
  //         lname: "",
  //         email: "",
  //         phone: "",
  //         message: "",
  //       });
  //     } catch (err) {
  //       console.log(err);
  //       setErrorMessage("Error sending message");
  //     } finally {
  //       setSendingContact(false);
  //     }
  //   } else {
  //     setErrorMessage("Please fill all fields");
  //   }
  // }

  //to save price from db
  // const [messageFromDb, setMessageFromDb] = useState(
  //   JSON.parse(localStorage.getItem("contactUs")) || []
  // );

  // //to get contact us messages saved in db
  // useEffect(() => {
  //   if (userDetails?.id === "64ab0b80a43e25d96ded9000") {
  //     const getMessage = async () => {
  //       // setLoader(true);

  //       try {
  //         const querySnapshot = await getDocs(collection(db, "contactUs"));
  //         let message = [];
  //         querySnapshot.forEach((doc) => {
  //           message.push(doc.data());
  //         });
  //         let arranged = message?.sort(function (a, b) {
  //           return b.id.slice(-3) - a.id.slice(-3);
  //         });

  //         message.length > 0 &&
  //           localStorage.setItem("message", JSON.stringify(arranged));
  //         message.length > 0 && setMessageFromDb(arranged);
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     };
  //     getMessage();
  //   }
  // }, []);

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
      console.log("Login successful!", response.data);
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
        console.log("Time deleted successfully!", response.data);
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
  const data = {
    price: "500",
    time: "8.20am",
    terminal: "sanrab",
    slot: 3,
    ride_path: "to_campus",
    reference: "default",
    message: "approved",
    status: "success",
  };

  const verifyPayment = async () => {
    setLoader(true);
    console.log("data", data);

    try {
      const endpointURL =
        "https://onegoexploreapp.onrender.com/api/auth/verify-payment";

      const response = await axios.post(endpointURL, JSON.stringify(data), {
        headers: {
          Authorization: `${userDetails?.token}`,
          "Content-Type": "application/json", // Set Content-Type to JSON
        },
      });

      setBookingSuccess(true);
      console.log("Payment verified successfully!", response.data);
    } catch (error) {
      console.error("Error verifying payment!", error);
    } finally {
      setLoader(false);
    }
  };

  // const verifyPayment = async (data) => {
  //   setLoader(true);
  //   console.log("data", data);

  //   try {
  //     const endpointURL =
  //       "https://onegoexploreapp.onrender.com/api/auth/verify-payment";

  //     const response = await axios.post(endpointURL, data, {
  //       headers: {
  //         Authorization: `${userDetails?.token}`,
  //         "Content-Type": "application/json", // Set Content-Type to JSON
  //       },
  //     });

  //     setBookingSuccess(true);
  //     console.log("Payment verified successfully!", response.data);
  //   } catch (error) {
  //     console.error("Error verifying payment!", error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

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
        // user,
        login,
        logout,
        showLogout,
        toggleLogoutOn,
        toggleLogoutOff,
        // currentUserFromDb,
        userNotLoggedIn,
        accessDashboard,
        errorMessage,
        morningForm,
        handleMorningChange,
        noonForm,
        handlenoonChange,
        handleMorningBookingTimeSubmit,
        // morningBookingTimesFromDb,
        // noonBookingTimesFromDb,
        handleNoonBookingTimeSubmit,
        // handleDeleteMorningTime,
        // handleDeleteNoonTime,
        allUsers,
        admin,
        loginAdmin,
        handleAdminChange,
        handleResetpswChange,
        forgotpswSubmit,
        bookingSuccess,
        cloaseSuccessModal,
        setBookingSuccess,
        // setActiveRideChange,
        navigate,
        // createRideDoc,
        formattedDate,
        // rideHistoryFromDb,
        allRides,
        // ridesToday,
        handleContactUsChange,
        handleSubmitContactUs,
        sendingContact,
        sent,
        contactUsData,
        // messageFromDb,
        // active,
        // toggleActive,
        // freeRideMod,
        // bookFreeRide,
        // cancelBookFreeRide,
        // freeRideBanner,
        // cancelFreeRideMod,
        fieldsRequired,
        // freeRideCount,
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
