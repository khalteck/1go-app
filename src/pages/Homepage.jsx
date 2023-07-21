import { Link } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Testimonials from "../components/Testimonials";
import ContactUS from "../components/ContactUs";
import ScrollToTop from "../ScrollToTop";
import { useAppContext } from "../contexts/AppContext";
import ClientMorningTimeBtn from "../components/ClientMorningTimeBtn";
import ClientNoonTimeBtn from "../components/ClientNoonTimeBtn";
import Loader from "../components/Loader";
import moment from "moment";

const Homepage = () => {
  const {
    accessDashboard,
    morningBookingTimesFromDb,
    noonBookingTimesFromDb,
    formattedDate,
    freeRideMod,
    bookFreeRide,
    cancelBookFreeRide,
    freeRideBanner,
    cancelFreeRideMod,
  } = useAppContext();

  let sortedArrMorn = morningBookingTimesFromDb.slice().sort((a, b) => {
    const timeA = moment(a.time, ["h:mm A"]).format("HH:mm");
    const timeB = moment(b.time, ["h:mm A"]).format("HH:mm");
    return Number(timeA.replace(/:/g, "")) - Number(timeB.replace(/:/g, ""));
  });

  let sortedArrNoon = noonBookingTimesFromDb.slice().sort((a, b) => {
    const timeA = moment(a.time, ["h:mm A"]).format("HH:mm");
    const timeB = moment(b.time, ["h:mm A"]).format("HH:mm");
    return Number(timeA.replace(/:/g, "")) - Number(timeB.replace(/:/g, ""));
  });
  return (
    <>
      <Header />

      <main className="w-full bg-slate-200">
        <section className="w-full h-[fit-content] sm:min-h-[105vh] bg-unilorin bg-cover bg-bottom lg:bg-bottom bg-no-repeat relative">
          <div className="overlay w-full h-[fit-content] sm:min-h-[105vh] bg-black/30 block md:flex text-white px-[5%] sm:px-[10.5%] pt-[130px] md:pt-[200px] lg:pt-[15%] pb-40">
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
            <div className="first-section-text mr-auto">
              <p className="text-[0.95rem] tracking-widest">AVOID THE RUSH</p>
              <h1 className="text-[2rem] font-bold uppercase md:text-[2.5rem] lg:text-[3.5rem]">
                THE 1GO EXPERIENCE
              </h1>
              <div className="pb-3 font-medium text-[0.95rem] md:text-[1.23rem] uppercase">
                <p> Experience a new class of ride</p>
                <p>When moving in and out of the University of Ilorin</p>
              </div>
              <button
                onClick={accessDashboard}
                className="text-sm bg-blue-500 px-10 py-3 uppercase hover:bg-transparent border-blue-500 border-2 rounded-md transition-all duration-300"
              >
                Book Now
              </button>
            </div>
            <div className="w-full md:w-[40%] mt-8 md:mt-0 z-[5]">
              <div className="bg-white/30 px-4 py-1 md:py-3 w-[fit-content] rounded-t-md text-[0.85rem] md:text-[1rem]">
                Departure Times Today:{" "}
                <span className="font-bold first-section-text">
                  {formattedDate}
                </span>
              </div>
              <div className="w-full h-[fit-content] bg-white rounded-md px-3 py-2 md:py-3 text-slate-700">
                <div className=" mt-1 flex gap-1 items-center mb-3">
                  <div className="bg-blue-400 rounded-full flex justify-center items-center">
                    <img
                      alt=""
                      src="/images/icons8-information-64.png"
                      className="w-4 h-4"
                    />
                  </div>
                  <p className="text-[0.75rem] bg-blue-400/30 px-2 py-[1px] rounded-full">
                    Book a ride by selecting an available time
                  </p>
                </div>
                <div>
                  <h2 className="pb-1 border-b border-b-slate-400/80 text-[0.75rem] md:text-[1rem]">
                    From Outside school - Going to school park
                  </h2>
                  <div className="my-4 w-full flex gap-3 md:gap-4 flex-wrap">
                    {morningBookingTimesFromDb?.length > 0 ? (
                      sortedArrMorn?.map((item, index) => {
                        return <ClientMorningTimeBtn key={index} item={item} />;
                      })
                    ) : (
                      <>
                        <p>No booking times yet</p>
                        <div className="w-[35px] h-[35px] bg-gradient-to-b from-blue-500 to-white rounded-full relative rotate mx-auto">
                          {/* <div className="w-1/3 h-full bg-white"></div> */}
                          <div className="w-1/2 h-1/2 bg-white rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* afternoon rides */}
                <div className="mt-5 md:mt-8">
                  <h2 className="pb-1 border-b border-b-slate-400/80 text-[0.75rem] md:text-[1rem]">
                    From Inside school - Going off-campus
                  </h2>
                  <div className="my-4 w-full flex gap-3 md:gap-4 flex-wrap">
                    {noonBookingTimesFromDb?.length > 0 ? (
                      sortedArrNoon?.map((item, index) => {
                        return <ClientNoonTimeBtn key={index} item={item} />;
                      })
                    ) : (
                      <>
                        <p>No booking times yet</p>
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
          </div>
          <svg
            className="w-full absolute bottom-[-1px] left-0 z-0 hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#e2e8f0"
              fillOpacity="1"
              d="M0,128L60,149.3C120,171,240,213,360,218.7C480,224,600,192,720,176C840,160,960,160,1080,170.7C1200,181,1320,203,1380,213.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>

          {/* mobile wave */}
          <svg
            className="w-full absolute bottom-[-1px] left-0 z-0 block md:hidden"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#e2e8f0"
              fillOpacity="1"
              d="M0,0L60,0C120,0,240,0,360,16C480,32,600,64,720,101.3C840,139,960,181,1080,181.3C1200,181,1320,139,1380,117.3L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </section>

        {/* Testimonial */}
        <section className="w-full pb-[100px]">
          <h2 className="text-[1.65rem] md:text-[3rem] font-bold text-center">
            Testimonial from our users
          </h2>
          <p className="font-light text-center text-[1rem] md:pb-16 w-[90%] mx-auto">
            We are here to stay, see what our users have to say about our rides.
          </p>
          <Testimonials />
          {/* <p className="text-[0.75rem]">Swipe..</p> */}
        </section>

        {/* Contact form */}
        <section className="w-full bg-contactBg bg-right lg:bg-center bg-repeat bg-cover">
          <ContactUs />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
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
          </div>
        </div>
      )} */}
    </>
  );
};

export default Homepage;
