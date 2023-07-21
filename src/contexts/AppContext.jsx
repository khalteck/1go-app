import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

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
    firstname: "",
    lastname: "",
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
      // console.log("Login successful!", response.data);
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

  //to save current user from auth in state
  const [user, setUser] = useState({ name: "", email: "" });
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  //to save current user from db
  const [currentUserFromDb, setCurrentUserFromDb] = useState(
    JSON.parse(localStorage.getItem("userDetails")) || {}
  );

  useEffect(() => {
    setCurrentUserFromDb(JSON.parse(localStorage.getItem("userDetails")));
  }, [user]);

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
    if (userDetails?.auth_token) {
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
  const [activeRideChange, setActiveRideChange] = useState(false);
  const [updatedTime, setUpdatedTime] = useState(false);

  //to save booking time from db
  const [morningBookingTimesFromDb, setMorningBookingTimesFromDb] = useState(
    JSON.parse(localStorage.getItem("morningTimes")) || []
  );

  //to get morning booking times
  useEffect(() => {
    const getMorningBookingTime = async () => {
      setLoader(true);

      try {
        const querySnapshot = await getDocs(
          collection(db, "morningBookingTimes")
        );
        let times = [];
        querySnapshot.forEach((doc) => {
          times.push(doc.data());
        });
        let arranged = times?.sort(function (a, b) {
          return a.id.slice(-2) - b.id.slice(-2);
        });
        times.length > 0 &&
          localStorage.setItem("morningTimes", JSON.stringify(arranged));
        times.length > 0 && setMorningBookingTimesFromDb(arranged);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoader(false);
      }
    };
    getMorningBookingTime();
  }, [updatedTime, activeRideChange, currentPage]);

  //to send created notes to db
  const createMorningBookingTimeDocument = async (
    time,
    createdAt,
    slots,
    price
  ) => {
    setLoader(true);

    try {
      const querySnapshot = await getDocs(
        collection(db, "morningBookingTimes")
      );
      let times = [];
      querySnapshot.forEach((doc) => {
        times.push(doc.data());
      });
      times.length > 0 &&
        localStorage.setItem("morningTimes", JSON.stringify(times));
      await setDoc(
        doc(
          db,
          "morningBookingTimes",
          `${time.replace(/ /g, "_")}_${createdAt}_0${
            morningBookingTimesFromDb?.length + 1
          }`
        ),
        {
          time: time,
          id: `${time.replace(/ /g, "_")}_${createdAt}_0${
            morningBookingTimesFromDb?.length + 1
          }`,
          createdAt: createdAt,
          slots: slots,
          price: price,
          from: "outside",
        }
      );
      console.log("morning booking time created");
      setUpdatedTime((prev) => !prev);
      window.location.reload();
    } catch (err) {
      console.error("Error creating morning time: ", err);
    } finally {
      setLoader(false);
    }
  };

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
  const [noonBookingTimesFromDb, setNoonBookingTimesFromDb] = useState(
    JSON.parse(localStorage.getItem("noonTimes")) || []
  );

  //to get noon booking timesaved in db
  useEffect(() => {
    const getNoonBookingTime = async () => {
      setLoader(true);

      try {
        const querySnapshot = await getDocs(collection(db, "noonBookingTimes"));
        let times = [];
        querySnapshot.forEach((doc) => {
          times.push(doc.data());
        });
        let arranged = times?.sort(function (a, b) {
          return a.id.slice(-2) - b.id.slice(-2);
        });
        times.length > 0 &&
          localStorage.setItem("noonTimes", JSON.stringify(arranged));
        times.length > 0 && setNoonBookingTimesFromDb(arranged);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoader(false);
      }
    };
    getNoonBookingTime();
  }, [updatedTime, activeRideChange, currentPage]);

  //to send created notes to db
  const createNoonBookingTimeDocument = async (
    time,
    createdAt,
    slots,
    price
  ) => {
    setLoader(true);

    try {
      const querySnapshot = await getDocs(collection(db, "noonBookingTimes"));
      let times = [];
      querySnapshot.forEach((doc) => {
        times.push(doc.data());
      });
      times.length > 0 &&
        localStorage.setItem("noonTimes", JSON.stringify(times));
      await setDoc(
        doc(
          db,
          "noonBookingTimes",
          `${time.replace(/ /g, "_")}_${createdAt}_0${
            noonBookingTimesFromDb.length + 1
          }`
        ),
        {
          time: time,
          id: `${time.replace(/ /g, "_")}_${createdAt}_0${
            noonBookingTimesFromDb.length + 1
          }`,
          createdAt: createdAt,
          slots: slots,
          price: price,
          from: "inside",
        }
      );
      console.log("noon booking time created");
      setUpdatedTime((prev) => !prev);
      window.location.reload();
    } catch (err) {
      console.error("Error creating noon time: ", err);
    } finally {
      setLoader(false);
    }
  };

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
      setOpenNoonEdit(false);
    } catch (error) {
      console.error("Error adding off campus booking time", error);
    } finally {
      setLoader(false);
    }
  };

  //to delete time from db
  const deleteMorningTimeDoc = async (id) => {
    try {
      await deleteDoc(doc(db, "morningBookingTimes", id));
      console.log("morning time deleted");
    } catch (err) {
      console.log("error deleting morning time: ", err);
    }
  };

  //to delete morning time
  function handleDeleteMorningTime(id) {
    let mark = "Delete time?";

    if (confirm(mark) == true) {
      deleteMorningTimeDoc(id);
      setUpdatedTime((prev) => !prev);
      if (morningBookingTimesFromDb?.length === 1) {
        localStorage.removeItem("morningTimes");
        window.location.reload();
      }
    }
  }

  //to delete time from db
  const deleteNoonTimeDoc = async (id) => {
    try {
      await deleteDoc(doc(db, "noonBookingTimes", id));
      console.log("Noon time deleted");
    } catch (err) {
      console.log("error deleting Noon time: ", err);
    }
  };

  //to delete time
  function handleDeleteNoonTime(id) {
    let mark = "Delete time?";

    if (confirm(mark) == true) {
      deleteNoonTimeDoc(id);
      setUpdatedTime((prev) => !prev);
      if (noonBookingTimesFromDb.length === 1) {
        localStorage.removeItem("noonTimes");
        window.location.reload();
      }
    }
  }

  //to get number of users
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      // setLoader(true);

      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setAllUsers(users);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  //to get total number of rides
  const [allRides, setAllRides] = useState([]);
  useEffect(() => {
    async function getAllRides() {
      // setLoader(true);

      try {
        const querySnapshot = await getDocs(collection(db, "rideHistory"));
        let rides = [];
        querySnapshot.forEach((doc) => {
          rides.push(doc.data());
        });
        setAllRides(rides);
      } catch (err) {
        console.log(err);
      }
    }
    getAllRides();
  }, [userDetails]);

  //to get number of rides today
  const [ridesToday, setridesToday] = useState([]);

  useEffect(() => {
    if (userDetails?.auth_token) {
      const getRidesToday = async () => {
        // setLoader(true);
        const userQuery = query(
          collection(db, "rideHistory"),
          where("createdAt", "==", `${formattedDate}`)
        );
        try {
          const querySnapshot = await getDocs(userQuery);
          let ride = [];
          querySnapshot.forEach((doc) => {
            ride.push(doc.data());
          });
          let arranged = ride?.sort(function (a, b) {
            return b?.id.slice(-3) - a?.id.slice(-3);
          });
          setridesToday(arranged);
        } catch (err) {
          console.log(err.message);
        }
      };
      getRidesToday();
    }
  }, []);

  //to save contact us form data
  const [contactUsData, setContactUsData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: "",
  });

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

  const createContactUsDoc = async (
    fname,
    lname,
    email,
    phone,
    message,
    createdAt
  ) => {
    try {
      await setDoc(
        doc(
          db,
          "contactUs",
          `${email}_${createdAt}_00${messageFromDb?.length + 1}`
        ),
        {
          id: `${email}_${createdAt}_00${messageFromDb?.length + 1}`,
          fname: fname,
          lname: lname,
          email: email,
          phone: phone,
          message: message,
          createdAt: createdAt,
        }
      );
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  };

  const [sendingContact, setSendingContact] = useState(false);
  const [sent, setSent] = useState(false);
  async function handleSubmitContactUs(e) {
    e.preventDefault();
    if (contactUsData.email && contactUsData.message) {
      setSendingContact(true);

      try {
        await createContactUsDoc(
          contactUsData?.fname,
          contactUsData?.lname,
          contactUsData?.email,
          contactUsData?.phone,
          contactUsData?.message,
          formattedDate
        );
        setSent(true);
        setContactUsData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          message: "",
        });
      } catch (err) {
        console.log(err);
        setErrorMessage("Error sending message");
      } finally {
        setSendingContact(false);
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  }

  //to save price from db
  const [messageFromDb, setMessageFromDb] = useState(
    JSON.parse(localStorage.getItem("contactUs")) || []
  );

  //to get contact us messages saved in db
  useEffect(() => {
    if (userDetails?.id === "64ab0b80a43e25d96ded9000") {
      const getMessage = async () => {
        // setLoader(true);

        try {
          const querySnapshot = await getDocs(collection(db, "contactUs"));
          let message = [];
          querySnapshot.forEach((doc) => {
            message.push(doc.data());
          });
          let arranged = message?.sort(function (a, b) {
            return b.id.slice(-3) - a.id.slice(-3);
          });

          message.length > 0 &&
            localStorage.setItem("message", JSON.stringify(arranged));
          message.length > 0 && setMessageFromDb(arranged);
        } catch (err) {
          console.log(err.message);
        }
      };
      getMessage();
    }
  }, []);

  //admin login logic  //admin login logic  //admin login logic
  //admin login logic  //admin login logic  //admin login logic
  //admin login logic  //admin login logic  //admin login logic
  //96C0Zb&6rkh!

  //to save admin login form input
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

  // const loginAdmin = async (e) => {
  //   e.preventDefault();
  //   setLoader(true);

  //   try {
  //     const docRef = doc(db, "users", "admin1cx@gmail.com");
  //     const docSnap = await getDoc(docRef);
  //     let adminData = docSnap.data();
  //     console.log("adminData", adminData);

  //     if (
  //       adminLoginData.email === adminData.email &&
  //       adminLoginData.password === adminData.lastname
  //     ) {
  //       localStorage.setItem("admin", JSON.stringify(adminData));
  //       setAdmin(adminData);
  //       navigate("/admin");
  //       setTrackAdmin((prev) => !prev);
  //     } else if (
  //       adminLoginData.email === "" ||
  //       adminLoginData.password === ""
  //     ) {
  //       setErrorMessage("email & password required!");
  //     } else {
  //       setErrorMessage("Invalid admin details");
  //     }
  //   } catch (err) {
  //     err.message === "Failed to get document because the client is offline." &&
  //       setErrorMessage("Bad network connection");
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  const loginAdmin = async () => {
    setLoader(true);
    console.log("adminLoginData", adminLoginData);

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

  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment
  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment
  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment
  //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment   //upon payment

  //to get and store active rides
  const [activeRidesFromDb, setActiveRidesFromDb] = useState([]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("activeRide")) !== null) {
      setActiveRidesFromDb(JSON.parse(localStorage.getItem("activeRide")));
    } else {
      setActiveRidesFromDb([]);
    }
  }, [currentUserFromDb, activeRideChange, checkTime]);

  // console.log(activeRidesFromDb);

  const [active, setActive] = useState(
    JSON.parse(localStorage.getItem("active")) || false
  );
  useEffect(() => {
    if (rideHistoryFromDb[0]?.createdAt === formattedDate) {
      setActive(true);
      localStorage.setItem("active", JSON.stringify(true));
    } else {
      setActive(false);
      localStorage.setItem("active", JSON.stringify(false));
    }
  }, []);

  function toggleActive() {
    setActive(false);
    localStorage.setItem("active", JSON.stringify(active));
    window.scrollTo(0, 0);
  }

  //function to create active rides doc
  let bookingCode = Math.random().toString(10).slice(2, 8);

  // console.log(formattedDate);
  const createRideDoc = async (
    email,
    time,
    price,
    paymentRef,
    createdAt,
    terminal,
    seats
  ) => {
    setLoader(true);
    try {
      const freeRideQuery = doc(db, "freeRidesCounter", "countToday");
      const docSnap = await getDoc(freeRideQuery);
      let countData = docSnap.data();
      await updateDoc(freeRideQuery, {
        date:
          countData?.date === formattedDate ? countData?.date : formattedDate,
        count:
          countData?.date === formattedDate
            ? Number(countData?.count) + Number(seats)
            : Number(seats),
      });
      //to simultenousely create ride history
      await setDoc(
        doc(
          db,
          "rideHistory",
          `${email}_${time.replace(/ /g, "")}_${paymentRef}_00${
            rideHistoryFromDb ? rideHistoryFromDb?.length + 1 : 1
          }`
        ),
        {
          id: `${email}_${time.replace(/ /g, "")}_${paymentRef}_00${
            rideHistoryFromDb ? rideHistoryFromDb?.length + 1 : 1
          }`,
          email: email,
          time: time,
          price: price,
          paymentRef: paymentRef,
          active: `false_${email}`,
          createdAt: createdAt,
          bookingCode: bookingCode,
          terminal: terminal,
          seats: seats,
        }
      );
      const userQuery = query(
        collection(db, "rideHistory"),
        where("active", "==", `false_${userDetails?.email}`)
      );

      const querySnapshot = await getDocs(userQuery);
      let ride = [];
      querySnapshot.forEach((doc) => {
        ride.push(doc.data());
      });
      let arranged = ride?.sort(function (a, b) {
        return b?.id.slice(-3) - a?.id.slice(-3);
      });
      localStorage.setItem("rideHistory", JSON.stringify(arranged));
      setRideHistoryFromDb(arranged);
      // setBookingSuccess(true);
      setActive(true);
      localStorage.setItem("active", JSON.stringify(active));
      navigate("/booking-success");
    } catch (err) {
      console.error("Error adding document: ", err);
    } finally {
      setLoader(false);
    }
  };

  //to count free rides
  // const [freeRideCount, setFreeRideCount] = useState(
  //   JSON.parse(localStorage.getItem("freeRideCount")) || ""
  // );
  // useEffect(() => {
  //   const getFreeRidesCount = async () => {
  //     try {
  //       const freeRideQuery = doc(db, "freeRidesCounter", "countToday");
  //       const docSnap = await getDoc(freeRideQuery);
  //       let countData = docSnap.data();
  //       localStorage.setItem("freeRideCount", JSON.stringify(countData));
  //       setFreeRideCount(countData);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFreeRidesCount();
  // }, [userDetails, activeRideChange]);
  // console.log(freeRideCount);

  useEffect(() => {
    if (userDetails?.auth_token) {
      const getActiveRides = async () => {
        setLoader(true);
        const userQuery = query(
          collection(db, "activeRide"),
          where("active", "==", `true_${userDetails?.email}`)
        );
        try {
          const querySnapshot = await getDocs(userQuery);
          let ride = [];
          querySnapshot.forEach((doc) => {
            ride.push(doc.data());
          });
          let arranged = ride?.sort(function (a, b) {
            return a?.id.slice(-3) - b?.id.slice(-3);
          });
          localStorage.setItem("activeRide", JSON.stringify(arranged));
          setActiveRidesFromDb(arranged);
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoader(false);
          setTakingLong(false);
        }
      };
      getActiveRides();
    }
  }, [userDetails, activeRideChange]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCheckTime((prev) => !prev);
    }, 20000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (activeRidesFromDb?.length > 0) {
      function track(arr) {
        arr.forEach((item) => {
          let t = new Date();
          let time = t.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          });
          let activeTime = item.time;
          var compareTime = moment(activeTime, "hh:mm A")
            .add(20, "minutes")
            .format("LT");

          let currentTimeRef = time.replace(/:/g, "");
          let compareTimeRef = moment(compareTime, ["h:mm A"])
            .format("HH:mm")
            .replace(/:/g, "");

          console.log(currentTimeRef, "---", compareTimeRef);

          if (Number(currentTimeRef) >= Number(compareTimeRef)) {
            async function clearActiveRides() {
              await clearActiveRideDoc(item.id);
              let newArr = activeRidesFromDb.filter(
                (item) => item.time !== activeTime
              );
              let arranged = newArr?.sort(function (a, b) {
                return a?.id.slice(-3) - b?.id.slice(-3);
              });
              localStorage.setItem("activeRide", JSON.stringify(arranged));
              setActiveRidesFromDb(arranged);
              setActiveRideChange((prev) => !prev);
              if (activeRidesFromDb || activeRidesFromDb.lentgh > 0) {
                setActive(true);
                localStorage.setItem("active", JSON.stringify(active));
              } else {
                setActive(false);
                localStorage.setItem("active", JSON.stringify(active));
              }
              window.location.reload();
            }
            clearActiveRides();
          }
        });
      }
      track(activeRidesFromDb);
    }
  }, []);

  //to clear all active rides
  useEffect(() => {
    activeRidesFromDb?.map((item) => {
      if (userDetails?.auth_token && formattedDate !== item?.createdAt) {
        async function clearActiveRides() {
          await clearActiveRideDoc(item.id);
          let newArr = activeRidesFromDb.filter(
            (item) => item.createdAt === formattedDate
          );
          let arranged = newArr?.sort(function (a, b) {
            return a?.id.slice(-3) - b?.id.slice(-3);
          });
          localStorage.setItem("activeRide", JSON.stringify(arranged));
          setActiveRidesFromDb(arranged);
          setActiveRideChange((prev) => !prev);
          if (activeRidesFromDb || activeRidesFromDb.lentgh > 0) {
            setActive(true);
            localStorage.setItem("active", JSON.stringify(active));
          } else {
            setActive(false);
            localStorage.setItem("active", JSON.stringify(active));
          }
          window.location.reload();
        }
        clearActiveRides();
      }
    });
  }, [currentPage, checkTime]);

  //to get and store ride history
  const [rideHistoryFromDb, setRideHistoryFromDb] = useState(
    JSON.parse(localStorage.getItem("rideHistory")) || []
  );

  // console.log(rideHistoryFromDb);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("rideHistory")) !== null) {
      setRideHistoryFromDb(JSON.parse(localStorage.getItem("rideHistory")));
    } else {
      setRideHistoryFromDb([]);
    }
  }, [userDetails, activeRideChange, active]);

  // to get user's active ride saved in db
  useEffect(() => {
    if (userDetails?.auth_token) {
      const getRidesHistory = async () => {
        // setLoader(true);
        const userQuery = query(
          collection(db, "rideHistory"),
          where("active", "==", `false_${userDetails?.email}`)
        );
        try {
          const querySnapshot = await getDocs(userQuery);
          let ride = [];
          querySnapshot.forEach((doc) => {
            ride.push(doc.data());
          });
          let arranged = ride?.sort(function (a, b) {
            return b?.id.slice(-3) - a?.id.slice(-3);
          });
          localStorage.setItem("rideHistory", JSON.stringify(arranged));
          setRideHistoryFromDb(arranged);
        } catch (err) {
          console.log(err.message);
        }
      };
      getRidesHistory();
    }
  }, [userDetails, activeRideChange, active]);

  const [bookingSuccess, setBookingSuccess] = useState(false);
  function cloaseSuccessModal() {
    setBookingSuccess(false);
    navigate("/book-ride");
    // setActiveRideChange((prev) => !prev);
  }

  const clearActiveRideDoc = async (id) => {
    try {
      await deleteDoc(doc(db, "activeRide", id));
      console.log("Active ride cleared");
    } catch (err) {
      console.log("error clearing active booking: ", err);
    }
  };

  async function markCompleted() {
    setLoader(true);

    try {
      let mark = "Mark ride as completed?";

      if (confirm(mark) == true) {
        localStorage.removeItem("activeRide");
        await clearActiveRideDoc(activeRidesFromDb[0]?.id);
        window.location.reload();
        setActiveRideChange((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  }
  // console.log(activeRidesFromDb[0]?.id);

  //to display free ride modal
  // const [freeRideMod, setFreeRideMod] = useState(false);
  // useEffect(() => {
  //   if (!loader && Number(freeRideCount?.count) <= 50) {
  //     setTimeout(() => {
  //       setFreeRideMod(true);
  //     }, 3000);
  //   }
  // }, [freeRideCount]);
  // function cancelFreeRideMod() {
  //   setFreeRideMod(false);
  // }

  // const [freeRideBanner, setFreeRideBanner] = useState(false);
  // useEffect(() => {
  //   if (!loader && Number(freeRideCount?.count) <= 50) {
  //     setTimeout(() => {
  //       setFreeRideBanner(true);
  //     }, 3000);
  //   }
  // }, [freeRideCount]);

  function bookFreeRide() {
    setFreeRideMod(false);
    navigate("/book-ride");
  }

  function cancelBookFreeRide() {
    setFreeRideBanner(false);
  }

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
        user,
        login,
        logout,
        showLogout,
        toggleLogoutOn,
        toggleLogoutOff,
        currentUserFromDb,
        userNotLoggedIn,
        accessDashboard,
        errorMessage,
        morningForm,
        handleMorningChange,
        noonForm,
        handlenoonChange,
        handleMorningBookingTimeSubmit,
        morningBookingTimesFromDb,
        noonBookingTimesFromDb,
        handleNoonBookingTimeSubmit,
        handleDeleteMorningTime,
        handleDeleteNoonTime,
        allUsers,
        admin,
        loginAdmin,
        handleAdminChange,
        handleResetpswChange,
        forgotpswSubmit,
        bookingSuccess,
        cloaseSuccessModal,
        setBookingSuccess,
        setActiveRideChange,
        navigate,
        createRideDoc,
        formattedDate,
        rideHistoryFromDb,
        allRides,
        ridesToday,
        handleContactUsChange,
        handleSubmitContactUs,
        sendingContact,
        sent,
        contactUsData,
        messageFromDb,
        active,
        toggleActive,
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
