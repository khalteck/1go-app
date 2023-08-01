import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useRef } from "react";
import html2canvas from "html2canvas";
import ScrollToTop from "../ScrollToTop";
import { useEffect } from "react";

const RideDetails = () => {
  const { rideHistory } = useAppContext();

  const { _id } = useParams();
  const ride = rideHistory?.filter((item) => item._id === _id)[0];

  const navigate = useNavigate();
  useEffect(() => {
    if (!ride) {
      navigate("/book-ride");
    }
  }, []);

  const pageRef = useRef(null);

  const handleScreenshotClick = () => {
    html2canvas(pageRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = url;
        link.click();
      });
    });
  };

  const terminalDescription =
    ride?.terminal?.toLowerCase() === "terminus"
      ? "In front of the Triple Tmall just beside the univerity terminus"
      : ride?.terminal?.toLowerCase() === "mark"
      ? "Just before mark junction in front of the Al Ummah mosque and directly opposite Bravo fuel station"
      : ride?.terminal?.toLowerCase() === "ilesanmi"
      ? "In front of Anchor Kiddies Palace just before the Tanke Iledu community junction while coming from Tipper garage"
      : ride?.terminal?.toLowerCase() === "sanrab"
      ? "Before the Sanrab/Tanke Bubu junction directly opposite Monique unisex hair Palace"
      : ride?.terminal?.toLowerCase() === "chapel"
      ? "Opposite Made Art Concept, Chapel junction"
      : ride?.terminal?.toLowerCase() === "okeodo"
      ? "Beside Puff Puff Town, opposite Item 7"
      : ride?.terminal?.toLowerCase() === "stella maris"
      ? "Stella Maris junction, Stella maris"
      : "At the entrance of the School park, just beside the Eatrite restaurant signboard, directly opposite Unilorin central mosque";

  return (
    <div className="w-full h-[100vh] py-16 px-4 md:px-8 bg-white flex justify-center">
      <div
        ref={pageRef}
        className="w-full h-fit text-[.9rem] text-slate-600 md:text-[1.2rem] rounded-2xl flex justify-center py-[40px]"
      >
        <div className="w-full sm:max-w-[550px] sm:h-fit scale flex flex-col gap-2 items-center bg-white sm:p-8 sm:shadow-md rounded-lg relative">
          <div className="w-full p-3 rounded-md bg-blue-300/20 mt-3 text-[.8rem]">
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Date:</p>
              <p className="font-medium">{ride?.date_created}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Departure time:</p>
              <p className="font-medium">{ride?.time}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Seats:</p>
              <p className="font-medium">{ride?.seat}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Pickup terminal:</p>
              <p className="font-medium">{ride?.terminal}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Booking code:</p>
              <p className="font-medium">{ride?.booking_code}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Price:</p>
              <p
                className={`${
                  ride?.price === "free" ? "uppercase text-green-500" : ""
                } font-medium`}
              >
                {ride?.price !== "free" && "NGN"} {ride?.price}
              </p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Ride coordinator contact:</p>
              <div className="font-medium flex gap-1 items-center">
                <img alt="" src="/images/icon-phone-png" className="w-5 h-5" />
                <a href="tel:+2348166864740">
                  <p>08166864740</p>
                </a>
              </div>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Vehicle description:</p>
              <p className="font-medium"> White Toyota Hiace (Hummer Bus)</p>
            </div>
            <div className="w-full p-2 flex flex-col justify-between items-start">
              <p className="font-medium">Terminal description:</p>
              <p>
                {terminalDescription}
                {/* {ride?.terminal === "Terminus"
                  ? "Terminus: infront of the triple t mall just beside the university terminus"
                  : ride?.terminal === "Mark"
                  ? "Mark:just before mark junction in front of the Al ummah mosque and directly opposite bravo fuel station"
                  : ride?.terminal === "Ilesanmi"
                  ? "Ilesanmi: in front of anchor kiddies palace just before the Tanke iledu community junction while coming from tipper garage"
                  : ride?.terminal === "Sanrab"
                  ? "Sanrab: before the sanrab / Tanke bubu junction directly opposite Monique unisex hair palace"
                  : ride?.terminal === "Chapel"
                  ? "Chapel junction, directly in front of Made art concept, Chapel, Tanke."
                  : ride?.terminal === "Okeodo"
                  ? "Okeodo: Directly opposite Item 7 restaurant, in front of Puff Puff town, Oke odo, Tanke."
                  : ride?.terminal === "Stella maris"
                  ? "Stella maris Junction, Stella maris, Tanke"
                  : ride?.terminal === "School park"
                  ? "University of Ilorin school park"
                  : null} */}
              </p>
            </div>
          </div>

          <div className="w-full flex gap-3 mt-4">
            <Link to="/book-ride" className="w-1/2">
              <button
                type="submit"
                className="w-full px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md"
              >
                Close
              </button>
            </Link>
            <button
              onClick={handleScreenshotClick}
              className="w-1/2 px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md flex gap-2 items-center justify-center"
            >
              <p className="whitespace-nowrap">Save PDF</p>
              <img
                alt=""
                src="/images/icons8-form-24.png"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default RideDetails;
