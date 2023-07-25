import moment from "moment";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";

const ClientNoonTimeBtn = ({ item }) => {
  const { userDetails, navigate } = useAppContext();

  let t = new Date();
  let time = t.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  let activeTime = item.time;
  var compareTime = moment(activeTime, "hh:mm A").format("LT");

  let compareTimeRef = moment(compareTime, ["h:mm A"])
    .format("HH:mm")
    .replace(/:/g, "");
  let currentTimeRef = time.replace(/:/g, "");
  // console.log(currentTimeRef, compareTimeRef);

  const [bookedOut, setBookedOut] = useState(false);
  const [timePassed, setTimePassed] = useState(false);

  function link() {
    if (
      userDetails?.auth_token &&
      item.slots > 0 &&
      currentTimeRef < compareTimeRef
    ) {
      navigate(`/book-ride/summary/${item._id}`);
    } else if (
      userDetails &&
      item.slots > 0 &&
      currentTimeRef > compareTimeRef
    ) {
      setTimePassed(true);
    } else if (userDetails && item.slots < 1) {
      setBookedOut(true);
    } else {
      navigate("/login");
    }
  }
  function handleClose() {
    setBookedOut(false);
    setTimePassed(false);
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={link}
          className={`${
            item.slots < 1 || currentTimeRef > compareTimeRef
              ? "opacity-40"
              : "opacity-100"
          } px-3 py-1 bg-blue-300 hover:bg-blue-500 border border-slate-500 hover:text-white rounded-md text-[0.8rem] md:text-[0.85rem] transition-all duration-300`}
        >
          {item.time}
        </button>
        {(bookedOut || timePassed) && (
          <div
            // onMouseOut={handleMouseOut}
            className="w-full h-screen text-center p-4 flex justify-center items-center bg-black/80 fixed top-0 left-0 z-[999] scale"
          >
            <div className="w-full sm:w-[500px] h-fit bg-white px-5 pt-10 pb-5 border border-blue-400 rounded-lg">
              {bookedOut && (
                <>
                  <div>
                    Sorry, selected time{" "}
                    <span className="font-medium">{item.time}</span> is booked
                    out. Please choose a new time.
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-sm text-white text-[.85rem] bg-blue-500 px-10 py-2 mt-8 uppercase hover:bg-blue-400 border-blue-500 border-2 rounded-md transition-all duration-300"
                  >
                    Book new time
                  </button>
                </>
              )}{" "}
              {timePassed && (
                <>
                  <div>
                    Sorry, selected time{" "}
                    <span className="font-medium">{item.time}</span> has passed.
                    Please choose a new time.
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-sm text-white text-[.85rem] bg-blue-500 px-10 py-2 mt-8 uppercase hover:bg-blue-400 border-blue-500 border-2 rounded-md transition-all duration-300"
                  >
                    Book new time
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientNoonTimeBtn;
