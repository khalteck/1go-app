import Footer from "../components/Footer";
import Header from "../components/Header";
import ScrollToTop from "../ScrollToTop";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { usePaystackPayment } from "react-paystack";
import {
  collection,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useState } from "react";
import Loader from "../components/Loader";
import BookSuccessModal from "../components/BookSuccessModal";
import { useEffect } from "react";

const Summary = () => {
  const {
    // morningBookingTimesFromDb,
    // noonBookingTimesFromDb,
    loader,
    userDetails,
    setActiveRideChange,
    setBookingSuccess,
    navigate,
    createRideDoc,
    formattedDate,
    setLoader,
    createdAt,
    ridesToday,
    freeRideBanner,
    cancelBookFreeRide,
    bookFreeRide,
    bookingSuccess,
    allBookingTimes,
    fetchBookingTimes,
    verifyPayment,
    // freeRideCount,
  } = useAppContext();

  useEffect(() => {
    fetchBookingTimes();
  }, []);

  const toCampusTimes = allBookingTimes?.to_campus || [];
  const offCampusTimes = allBookingTimes?.off_campus || [];

  const [allTimes, setAllTimes] = useState([]);
  useEffect(() => {
    if (toCampusTimes || offCampusTimes) {
      setAllTimes([...toCampusTimes, ...offCampusTimes]);
    }
  }, [allBookingTimes]);

  const { _id } = useParams();
  const currentTime = allTimes?.filter((item) => item._id === _id)[0];
  // console.log(currentTime);

  //to control details form
  const [detailsError, setDetailsError] = useState("");
  const [detailsForm, setDetailsForm] = useState({
    terminal: "",
    seats: "",
  });
  function handleChange(event) {
    setDetailsError("");
    const { id, value } = event.target;
    setDetailsForm((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  }

  // paystack integration
  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: `${userDetails?.email}`, //their mail
    amount: `${
      detailsForm?.seats
        ? currentTime?.price * detailsForm?.seats
        : currentTime?.price
    }00`, //amount is in Kobo
    publicKey: "pk_test_e56146887f0492a4016277927d6b67d19843cb32", //pk_test_e56146887f0492a4016277927d6b67d19843cb32 //pk_live_4ec101f882797185958e8fd5ef0fb5e3907622b1
  };

  //to init paystack
  const initializePayment = usePaystackPayment(paystackConfig);

  //paystack functions
  const onSuccess = (transaction) => {
    console.log("transaction", transaction);
    setLoader(true);

    const data = {
      price: `${detailsForm?.seats}`
        ? currentTime?.price * detailsForm?.seats
        : currentTime?.price,
      time: currentTime?.time,
      terminal: detailsForm?.terminal,
      slot: Number(detailsForm?.seats),
      payment_ref: {
        reference: transaction?.reference,
        message: transaction?.message,
        status: transaction?.status,
      },
    };

    verifyPayment(data);
    // navigate("/book-ride");
  };
  const onClose = () => {
    alert("Transaction was not completed, window closed.");
  };

  const PaystackHook = () => {
    return (
      <div>
        <button
          type="submit"
          className="w-full md:w-[fit-content] px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Proceed to payment
        </button>
      </div>
    );
  };

  //to control booking and summary sub-pages
  const [summaryPage, setSummaryPage] = useState(false);
  function gotoSummary() {
    setSummaryPage(true);
  }
  function gotoDetails() {
    setSummaryPage(false);
  }

  //to proceed to summary

  function proceedToSummary(e) {
    e.preventDefault();
    if (
      detailsForm.terminal &&
      detailsForm.seats &&
      detailsForm.seats <= currentTime?.slot
    ) {
      gotoSummary();
    } else if (!detailsForm.terminal || !detailsForm.seats) {
      setDetailsError("Please fill all fields");
    } else if (Number(detailsForm?.seats) > Number(currentTime?.slot)) {
      setDetailsError("Number of seats cannot be more than available seats");
    } else {
      gotoSummary();
    }
  }
  return (
    <>
      <Header />
      {loader && <Loader />}

      <section className="w-full min-h-screen py-40 bg-gradient-to-b from-zinc-500/70 to-blue-400/10 text-slate-700">
        <div className="absolute top-0 md:top-1 left-4 md:left-[10.5%] text-[0.9rem] text-slate-200 flex gap-2 items-center">
          <img
            alt=""
            src="/images/icons8-information-64.png"
            className="w-4 h-4"
          />
          <p className="underline">Contact us</p>
        </div>
        <div className="w-full px-[5%] sm:px-[10.5%]">
          <div className="flex">
            <h2
              onClick={gotoDetails}
              className={` ${
                !summaryPage ? "bg-white text-black" : "bg-white/30 text-white"
              } text-[.9rem] md:text-[1.2rem] font-medium w-[fit-content] py-2 px-5 rounded-t-lg border-none relative bottom-[-2px]`}
            >
              Set details
            </h2>
            <h2
              onClick={proceedToSummary}
              className={` ${
                summaryPage ? "bg-white text-black" : "bg-white/30 text-white"
              } text-[.9rem] md:text-[1.2rem] font-medium w-[fit-content] py-2 px-5 rounded-t-lg border-none relative bottom-[-2px]`}
            >
              Summary
            </h2>
          </div>
          {/* the details page */}
          {!summaryPage && (
            <div className="w-full min-h-[340px] md:min-h-[260px] bg-white rounded-b-lg rounded-tr-lg p-4 relative">
              <div className="w-full p-3 mb-4 bg-blue-400/10 text-[0.9rem] md:text-[1rem] rounded-md hidden md:flex flex-wrap md:flex-nowrap">
                <div className="flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <img
                    alt=""
                    src="/images/icons8-time-30.png"
                    className="w-6 h-6 mr-1"
                  />
                  <p>
                    Time: <strong>{currentTime?.time}</strong>
                  </p>
                </div>
                <div className="flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <img
                    alt=""
                    src="/images/icons8-calendar-50.png"
                    className="w-6 h-6 mr-1"
                  />
                  <p>
                    Date: <strong>{formattedDate}</strong>
                  </p>
                </div>
                <div className="flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md mr-auto">
                  <img
                    alt=""
                    src="/images/icons8-cost-58.png"
                    className="w-6 h-6 mr-1"
                  />
                  {/* {ridesToday.length > 200 ? ( */}
                  <p>
                    Price:{" "}
                    <strong>
                      NGN{" "}
                      {detailsForm?.seats
                        ? currentTime?.price * detailsForm?.seats
                        : currentTime?.price}
                    </strong>
                  </p>
                  {/* // ) : (
                  //   <p>
                  //     Price: <strong className="text-green-500">FREE</strong>
                  //   </p>
                  // )} */}
                </div>
              </div>

              {/* mobile ui */}

              <div className="w-full p-3 mb-4 bg-blue-400/10 text-[0.9rem] md:text-[1rem] rounded-md flex md:hidden flex-wrap md:flex-nowrap">
                <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <div className="mr-auto flex items-center">
                    <img
                      alt=""
                      src="/images/icons8-time-30.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>Time: </p>
                  </div>
                  <p className="font-bold">{currentTime?.time}</p>
                </div>
                <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <div className="mr-auto flex items-center">
                    <img
                      alt=""
                      src="/images/icons8-calendar-50.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>Date: </p>
                  </div>
                  <p className="font-bold">{formattedDate}</p>
                </div>
                <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <div className="mr-auto flex items-center">
                    <img
                      alt=""
                      src="/images/icons8-cost-58.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>Price: </p>
                  </div>
                  <p className="font-bold">
                    NGN
                    {detailsForm?.seats
                      ? currentTime?.price * detailsForm?.seats
                      : currentTime?.price}
                  </p>
                </div>
              </div>

              <form className="max-w-[400px]">
                <label htmlFor="terminal" className="font-bold text-[1.1rem]">
                  Choose a Pick-up terminal{" "}
                  <span className="text-red-600">*</span>
                </label>{" "}
                <br />
                <select
                  id="terminal"
                  onChange={handleChange}
                  defaultValue={"DEFAULT"}
                  className="w-full bg-blue-400/10 mt-2 py-1 px-3 mb-4 rounded-md cursor-pointer outline-none border border-blue-400/50"
                >
                  <option value="DEFAULT" disabled hidden>
                    Select terminal
                  </option>
                  {currentTime?.from === "inside" ? (
                    <option value="School park">School park</option>
                  ) : (
                    <>
                      <option value="Terminus">Terminus</option>
                      <option value="Mark">Mark</option>
                      <option value="Ilesanmi">Ilesanmi</option>
                      <option value="Sanrab">Sanrab</option>
                      <option value="Chapel">Chapel</option>
                      <option value="Okeodo">Okeodo</option>
                      <option value="Stella maris">Stella maris</option>
                    </>
                  )}
                </select>
                <label htmlFor="terminal" className="font-bold text-[1.1rem]">
                  Select number of seats <span className="text-red-600">*</span>
                </label>
                <br />
                <p className="text-[.8rem] text-blue-400">
                  Number of available seats:{" "}
                  <span className="font-bold">{currentTime?.slot}</span>
                </p>
                <input
                  id="seats"
                  type="number"
                  onChange={handleChange}
                  value={detailsForm.seats}
                  className="w-full bg-blue-400/10 mt-2 py-1 px-3 mb-4 rounded-md outline-none border border-blue-400/50"
                />
                {detailsError !== "" && (
                  <div className="w-full flex gap-4 items-center py-3 px-10 my-2 bg-red-400/20 text-[0.85rem] rounded-lg border border-red-400">
                    <p>{detailsError}</p>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full md:w-[fit-content] px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3"
                  onClick={proceedToSummary}
                >
                  Proceed
                </button>
              </form>
            </div>
          )}

          {/* the summary page */}
          {summaryPage && (
            <div className="w-full min-h-[430px] md:min-h-[350px] bg-white rounded-b-lg rounded-tr-lg p-4 relative">
              {/* each active booking */}
              <div className="w-full p-3 mb-4 bg-blue-400/10 text-[0.9rem] md:text-[1rem] rounded-md hidden md:flex flex-wrap md:flex-nowrap">
                <div className="flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <img
                    alt=""
                    src="/images/icons8-time-30.png"
                    className="w-6 h-6 mr-1"
                  />
                  <p>
                    Time: <strong>{currentTime?.time}</strong>
                  </p>
                </div>
                <div className="flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <img
                    alt=""
                    src="/images/icons8-calendar-50.png"
                    className="w-6 h-6 mr-1"
                  />
                  <p>
                    Date: <strong>{formattedDate}</strong>
                  </p>
                </div>
                <div className="flex items-center px-2 py-1 md:p-2 border-2 border-blue-400/50 rounded-md mr-auto">
                  <img
                    alt=""
                    src="/images/icons8-cost-58.png"
                    className="w-6 h-6 mr-1"
                  />
                  {/* {ridesToday.length > 200 ? ( */}
                  <p>
                    Price:{" "}
                    <strong>
                      NGN{" "}
                      {detailsForm?.seats
                        ? currentTime?.price * detailsForm?.seats
                        : currentTime?.price}
                    </strong>
                  </p>
                  {/* // ) : (
                  //   <p>
                  //     Price: <strong className="text-green-500">FREE</strong>
                  //   </p>
                  // )} */}
                </div>
              </div>

              {/* mobile ui */}

              <div className="w-full p-3 mb-4 bg-blue-400/10 text-[0.9rem] md:text-[1rem] rounded-md flex md:hidden flex-wrap md:flex-nowrap">
                <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <div className="mr-auto flex items-center">
                    <img
                      alt=""
                      src="/images/icons8-time-30.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>Time: </p>
                  </div>
                  <p className="font-bold">{currentTime?.time}</p>
                </div>
                <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <div className="mr-auto flex items-center">
                    <img
                      alt=""
                      src="/images/icons8-calendar-50.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>Date: </p>
                  </div>
                  <p className="font-bold">{formattedDate}</p>
                </div>
                <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                  <div className="mr-auto flex items-center">
                    <img
                      alt=""
                      src="/images/icons8-cost-58.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>Price: </p>
                  </div>
                  <p className="font-bold">
                    NGN
                    {detailsForm?.seats
                      ? currentTime?.price * detailsForm?.seats
                      : currentTime?.price}
                  </p>
                </div>
                {/* // ) : (
                //   <div className="w-full flex items-center px-2 py-1 mb-2 md:p-2 border-2 border-blue-400/50 rounded-md md:mr-4">
                //     <div className="mr-auto flex items-center">
                //       <img
                //         alt=""
                //         src="/images/icons8-cost-58.png"
                //         className="w-6 h-6 mr-1"
                //       />
                //       <p>Price: </p>
                //     </div>
                //     <p className="font-bold text-green-500">FREE</p>
                //   </div>
                // )} */}
              </div>

              <div className="w-full p-3 mb-4 bg-blue-400/10 text-[0.9rem] md:text-[1rem] rounded-md flex flex-wrap gap-2 border sm:border-none border-blue-400/50">
                <p>Pick-up Terminal:</p>
                <p className="font-bold"> {detailsForm?.terminal}</p>
              </div>
              <div className="w-full p-3 mb-4 bg-blue-400/10 text-[0.9rem] md:text-[1rem] rounded-md flex flex-wrap gap-2 border sm:border-none border-blue-400/50">
                <p>Number of seats:</p>
                <p className="font-bold"> {detailsForm?.seats}</p>
              </div>

              <p className="text-[0.75rem] text-slate-500 absolute bottom-4 p-1 bg-blue-400/10">
                PS: Prices may vary based on demand
              </p>
              <PaystackHook />
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ScrollToTop />

      {bookingSuccess && (
        <BookSuccessModal currentTime={currentTime} detailsForm={detailsForm} />
      )}
      {/* {freeRideBanner && (
        <div className="w-full bg-white px-2 md:px-5 py-[6px] md:py-3 fixed bottom-0 left-0 flex items-center z-10">
          <div className="flex items-center gap-2 md:gap-4 mr-auto">
            <img
              alt=""
              src="/images/icons8-discount-50.png"
              className="w-8 h-8 md:w-12 md:h-12"
            />
            <p className="text-[.75rem] md:text-[1rem]">
              Limited time offer: Free rides today for first 50 users! Book now!
            </p>
          </div>
          <div
            onClick={cancelBookFreeRide}
            className="w-8 h-7 bg-white flex items-center justify-center rounded-full border border-blue-500 cursor-pointer"
          >
            <img alt="" src="/images/icons8-close-30.png" className="w-3 h-3" />
          </div>
          {/* <div className="md:flex gap-3 hidden">
            <button
              onClick={cancelBookFreeRide}
              className="h-fit text-sm text-blue-500 text-[.75rem] bg-blue-500/20 px-6 py-1 md:py-2 uppercase hover:bg-blue-400 hover:text-white border-blue-500 border-2 rounded-md transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={bookFreeRide}
              className="h-fit text-sm text-white text-[.75rem] bg-blue-500 px-6 py-1 md:py-2 uppercase hover:bg-blue-400 border-blue-500 border-2 rounded-md transition-all duration-300"
            >
              Book now
            </button>
          </div> */}
      {/* </div>
      // )} */}
    </>
  );
};

export default Summary;
