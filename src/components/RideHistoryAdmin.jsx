import { useAppContext } from "../contexts/AppContext";

const RideHistoryAdmin = ({ item }) => {
  // const { priceFromDb } = useAppContext();
  return (
    <>
      <div className="w-full p-3 mb-4 bg-slate-400/10 text-[0.85rem] md:text-[0.7rem] lg:text-[.9rem] rounded-md hidden md:flex flex-wrap md:flex-nowrap transition-all duration-300">
        {/* <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md md:mr-4">
          <p>
            Date: <strong>{item?.createdAt}</strong>
          </p>
        </div> */}
        <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md md:mr-4">
          <p>
            Time: <strong>{item?.time}</strong>
          </p>
        </div>
        <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md md:mr-4">
          <p>
            Booking Code: <strong>{item?.booking_code}</strong>
          </p>
        </div>
        <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md md:mr-4">
          <p>
            Terminal: <strong>{item?.terminal}</strong>
          </p>
        </div>
        <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md mr-auto">
          <p>
            Seats: <strong>{item?.seat}</strong>
          </p>
        </div>
        <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md">
          <p>
            Price:{" "}
            {item?.price !== "free" ? (
              <strong>NGN {item?.price}</strong>
            ) : (
              <strong className="uppercase font-bold text-green-500">
                {item?.price}
              </strong>
            )}
          </p>
        </div>
        {/* <div className="flex items-center px-2 py-1 md:p-2 border-2 border-slate-400/50 rounded-md">
          <img
            alt=""
            src="/images/icons8-checkmark-64.png"
            className="w-6 h-6 mr-1"
          />
          <p>Successful</p>
        </div> */}
      </div>

      {/* mobile ui */}

      <div className="w-full px-3 py-2 mb-4 bg-slate-400/10 border-2 border-slate-400/20 text-[0.75rem] md:text-[1rem] rounded-md flex md:hidden flex-wrap md:flex-nowrap items-center transition-all duration-300 scale">
        {/* <div className="mr-2">
          <img
            alt=""
            src="/images/icons8-checkmark-64.png"
            className="w-6 h-6"
          />
        </div> */}
        {/* <div className=" pr-2 md:p-2 md:mr-4">
          <div>Date:</div>
          <div>{item?.createdAt}</div>
        </div> */}
        <div className=" pr-2 md:p-2 border-r-2 border-slate-400/50 md:mr-4">
          <div>Time:</div>
          <div>{item?.time}</div>
        </div>
        <div className="px-2 md:p-2 border-r-2 border-slate-400/50">
          <div>Code:</div>
          <div>{item?.bookingCode}</div>
        </div>
        <div className="px-2 md:p-2 border-r-2 border-slate-400/50">
          <div>Termi..:</div>
          <div>{item?.terminal}</div>
        </div>
        <div className="px-2 md:p-2 border-r-2 border-slate-400/50">
          <div>Seats:</div>
          <div>{item?.seats}</div>
        </div>
        <div className="pl-2">
          <div>Price:</div>
          {item?.price !== "free" ? (
            <div>NGN {item?.price}</div>
          ) : (
            <div className="uppercase font-bold text-green-500">
              {item?.price}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RideHistoryAdmin;
