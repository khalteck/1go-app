import moment from "moment";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import ActiveBooking from "../components/ActiveBooking";
import BookSuccessModal from "../components/BookSuccessModal";
import ClientMorningTimeBtn from "../components/ClientMorningTimeBtn";
import ClientNoonTimeBtn from "../components/ClientNoonTimeBtn";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import RideHistory from "../components/RideHistory";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const BookRides = () => {
  const {
    morningBookingTimesFromDb,
    noonBookingTimesFromDb,
    bookingSuccess,
    rideHistoryFromDb,
    formattedDate,
    toggleActive,
    active,
    loader,
    freeRideMod,
    bookFreeRide,
    ridesToday,
    cancelBookFreeRide,
    freeRideBanner,
    cancelFreeRideMod,
    userDetails,
    fetchBookingTimes,
    allBookingTimes,
    fetchRideHistory,
    inlineLoader,
    rideHistory,
  } = useAppContext();

  let firstFive = rideHistoryFromDb?.slice(0, 5);
  const [displayAll, setDisplayAll] = useState(false);
  function showAll() {
    setDisplayAll((prev) => !prev);
  }

  // console.log("allBookingTimes", allBookingTimes);

  useEffect(() => {
    fetchBookingTimes();
    // fetchRideHistory();
  }, []);

  const toCampusTimes = allBookingTimes?.to_campus;
  const offCampusTimes = allBookingTimes?.off_campus;

  let sortedToCampus = toCampusTimes?.slice()?.sort((a, b) => {
    const timeA = moment(a.time, ["h:mm A"]).format("HH:mm");
    const timeB = moment(b.time, ["h:mm A"]).format("HH:mm");
    return Number(timeA.replace(/:/g, "")) - Number(timeB.replace(/:/g, ""));
  });

  let sortedOffCampus = offCampusTimes?.slice()?.sort((a, b) => {
    const timeA = moment(a.time, ["h:mm A"]).format("HH:mm");
    const timeB = moment(b.time, ["h:mm A"]).format("HH:mm");
    return Number(timeA.replace(/:/g, "")) - Number(timeB.replace(/:/g, ""));
  });

  // console.log(active);
  return (
    <>
      {loader && <Loader />}
      <Header />

      <section className="w-full min-h-screen pb-32 bg-slate-100 text-slate-700">
        <section className="w-full bg-reg1 bg-cover bg-right lg:bg-center bg-no-repeat">
          <section className="w-full bg-gradient-to-b from-zinc-900/70 to-zinc-700/40 py-[150px] px-[5%] sm:px-[10.5%]">
            <Link to="/contact">
              <div className="absolute top-0 md:top-1 left-4 md:left-[10.5%] text-[0.9rem] text-slate-200 flex gap-2 items-center">
                <img
                  alt=""
                  src="/images/icons8-information-64.png"
                  className="w-4 h-4"
                />
                <p className="underline">Contact us</p>
              </div>
            </Link>

            <section className="w-full border-b border-zinc-300 pb-4 text-white flex">
              <div className="w-2/3 mr-auto">
                <h2 className="text-[1.5rem] font-bold flex gap-2 items-center">
                  <p> Hello</p>{" "}
                  {userDetails?.first_name &&
                    userDetails?.first_name?.charAt(0).toUpperCase() +
                      userDetails?.first_name?.slice(1)}
                </h2>
                <p className="text-[0.9rem] md:text-[1.1rem] font-medium">
                  Welcome to your dashboard. You can book rides & view ride
                  history here!
                </p>
              </div>
              <div className="h-[fit-content] px-4 md:px-8 p-2 rounded-lg bg-white/40">
                <img
                  alt=""
                  src="/images/icons8-user-64.png"
                  className="md:w-16 w-10 md:h-16 h-10"
                />
              </div>
            </section>

            {
              <section className="w-full border-b border-zinc-300 pb-16 pt-12">
                <h1 className="text-[1.5rem] md:text-[2rem] font-medium text-center text-white">
                  Departure times
                </h1>
                <div className="w-[fit-content] text-[.9rem] sm:text-[1.1rem] font-medium text-white text-center mb-3 flex items-center gap-3 mx-auto">
                  <p> Click on an available time to book now</p>
                  {/* <p className="bg-blue-400 px-2 py-[2px] rounded-lg text-[0.9rem] sm:text-[1rem]">
                    NGN {priceFromDb[0]?.price}
                  </p> */}
                </div>
                <div className="w-full block md:flex">
                  <div className="w-full md:w-1/2 md:p-4 p-0">
                    <div className="w-full min-h-[200px] bg-white rounded-lg p-4">
                      <div className=" mt-1 flex gap-1 items-center mb-3">
                        <div className="bg-blue-400 rounded-full flex justify-center items-center">
                          <img
                            alt=""
                            src="/images/icons8-information-64.png"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full">
                          Click on an available time to book a ride
                        </p>
                      </div>
                      <p className="font-medium text-[.8rem] md:text-[.9rem]">
                        Today: {formattedDate}
                      </p>
                      <h2 className="pb-1 border-b border-b-slate-400/80 text-[0.85rem] md:text-[1rem]">
                        From Outside school - Going to school park
                      </h2>
                      <div className="my-4 w-full flex gap-3 md:gap-4 flex-wrap">
                        {sortedToCampus?.length > 0 ? (
                          sortedToCampus?.map((item, index) => {
                            return (
                              <ClientMorningTimeBtn key={index} item={item} />
                            );
                          })
                        ) : (
                          <>
                            <p className="text-black/50">
                              No booking times yet
                            </p>
                            <div className="w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto">
                              {/* <div className="w-1/3 h-full bg-white"></div> */}
                              <div className="w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 md:p-4 p-0 mt-5 md:mt-0">
                    <div className="w-full min-h-[200px] bg-white rounded-lg p-4">
                      <div className=" mt-1 flex gap-1 items-center mb-3">
                        <div className="bg-blue-400 rounded-full flex justify-center items-center">
                          <img
                            alt=""
                            src="/images/icons8-information-64.png"
                            className="w-4 h-4"
                          />
                        </div>
                        <p className="text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full">
                          Click on an available time to book a ride
                        </p>
                      </div>
                      <p className="font-medium text-[.8rem] md:text-[.9rem]">
                        Today: {formattedDate}
                      </p>
                      <h2 className="pb-1 border-b border-b-slate-400/80 text-[0.85rem] md:text-[1rem]">
                        From Inside school - Going off-campus
                      </h2>
                      <div className="my-4 w-full flex gap-3 md:gap-4 flex-wrap">
                        {sortedOffCampus?.length > 0 ? (
                          sortedOffCampus?.map((item, index) => {
                            return (
                              <ClientNoonTimeBtn key={index} item={item} />
                            );
                          })
                        ) : (
                          <>
                            <p className="text-black/50">
                              No booking times yet
                            </p>
                            <div className="w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto">
                              {/* <div className="w-1/3 h-full bg-white"></div> */}
                              <div className="w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            }
          </section>
        </section>

        {
          <section className="w-full mt-10 px-[5%] sm:px-[10.5%]">
            <div className="text-[1rem] md:text-[1.5rem] font-medium w-[fit-content] bg-white py-2 px-5 rounded-t-lg border-none relative bottom-[-2px] flex items-center gap-2">
              <h2>Successful bookings</h2>
              {rideHistory?.length > 0 && (
                <div className="w-4 h-4 p-[10px] text-[.85rem] flex justify-center items-center border-2 border-slate-400/50 rounded-full">
                  {rideHistory?.length}
                </div>
              )}
            </div>
            <div className="w-full min-h-[200px] bg-white rounded-b-lg p-4 flex flex-col items-center transition-all duration-300">
              {/* each ride history */}
              {rideHistory?.map((item, index) => {
                return (
                  <RideHistory
                    key={index}
                    item={item}
                    rideHistoryFromDb={rideHistoryFromDb}
                  />
                );
              })}

              {rideHistory?.length === 0 && !inlineLoader && (
                <div className="w-full py-12 bg-sky-50 flex flex-col items-center">
                  <img
                    alt=""
                    src="/images/empty.png"
                    className="w-20 h-20 mb-8"
                  />
                  <p className="text-slate-400">No bookings yet...</p>
                </div>
              )}

              {inlineLoader && (
                <div className="w-full py-12 bg-sky-50 flex flex-col items-center">
                  <PulseLoader color="#3b82f6" size={20} />
                </div>
              )}

              {/* Paginate this */}
              {/* {rideHistoryFromDb?.length > 0 && !displayAll ? (
                firstFive?.map((item, index) => {
                  return (
                    <RideHistory
                      key={index}
                      item={item}
                      rideHistoryFromDb={rideHistoryFromDb}
                    />
                  );
                })
              ) : rideHistoryFromDb?.length > 0 && displayAll ? (
                rideHistoryFromDb?.map((item, index) => {
                  return (
                    <RideHistory
                      key={index}
                      item={item}
                      rideHistoryFromDb={rideHistoryFromDb}
                    />
                  );
                })
              ) : (
                <div className="w-full py-12 bg-sky-50 flex flex-col items-center">
                  <img
                    alt=""
                    src="/images/empty.png"
                    className="w-20 h-20 mb-8"
                  />
                  <p className="text-slate-400">No bookings yet...</p>
                </div>
              )} */}

              {rideHistoryFromDb?.length > 5 && (
                <button
                  onClick={showAll}
                  className=" px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3"
                >
                  {displayAll ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          </section>
        }
      </section>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default BookRides;
