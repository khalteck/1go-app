import Sidebar from "./Sidebar";
import ScrollToTop from "../ScrollToTop";
import RideHistory from "../components/RideHistory";
import { useAppContext } from "../contexts/AppContext";
import ContactMessage from "../components/ContactMessage";
import Loader from "../components/Loader";
import { useState } from "react";
import RideHistoryAdmin from "../components/RideHistoryAdmin";
import { useEffect } from "react";

const AdminDashboard = () => {
  const {
    allUsers,
    allRides,
    ridesToday,
    loader,
    fetchAllUsers,
    allUsersFromFirebase,
    fetchAllRides,
    allRidesFromFrirebase,
    fetchAllContacts,
    allContacts,
  } = useAppContext();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchField, setSearchField] = useState("");

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setSearchField("");
  };

  const filteredItems = allRides?.filter((item) => {
    return item?.time.includes(searchField);
  });

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  useEffect(() => {
    fetchAllUsers();
    fetchAllRides();
    fetchAllContacts();
  }, []);

  return (
    <div className="w-full">
      {loader && <Loader />}
      <Sidebar />
      <div
        className={`w-full md:w-[80%] min-h-screen mb-16 float-right bg-sky-50 pt-[80px] md:pt-[60px] px-3 md:px-12 transition-all duration-500 text-slate-700`}
      >
        <h1 className="w-full font-bold text-[1.75rem]">Admin dashboard</h1>
        <div className="w-full block md:flex mt-8">
          <div className="w-full md:w-1/2 md:pr-3">
            <div className="p-3 bg-white rounded-lg shadow-xl shadow-slate-300/30 border border-sky-500 flex gap-4">
              <div className="w-[80px] rounded-lg bg-blue-400 flex justify-center items-center">
                <img
                  alt=""
                  src="/images/icons8-user-64.png"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="text-[0.9rem] md:text-[1.2rem]">Total users</h3>
                <h3 className="font-bold text-[1.5rem]">{allUsers?.length}</h3>
                <div className="font-medium text-[.85rem]">
                  Firebase users: {allUsersFromFirebase?.length}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 md:mt-0 md:w-1/2 md:pl-3">
            <div className="p-3 bg-white rounded-lg shadow-xl shadow-slate-300/30 border border-sky-500 flex gap-4">
              <div className="w-[80px] rounded-lg bg-green-500 flex justify-center items-center">
                <img
                  alt=""
                  src="/images/icons8-purchase-order-50.png"
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="text-[0.9rem] md:text-[1.2rem]">
                  Total bookings
                </h3>
                <h3 className="font-bold text-[1.5rem]">{allRides?.length}</h3>
                <div className="font-medium text-[.85rem]">
                  Firebase rides: {allRidesFromFrirebase?.length}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white rounded-lg shadow-xl shadow-slate-300/30 border border-sky-500 mt-8 transition-all duration-300">
          <div className="w-full flex border-b border-slate-300 pb-2 mb-4">
            <h3 className="text-[1.1rem] font-medium mr-auto">
              Booking history
            </h3>
            <div className="flex gap-3 flex-col-reverse items-end sm:flex-row">
              {searchOpen && (
                <form className="slide">
                  <input
                    type="text"
                    className="w-[100px] sm:w-[150px] bg-blue-100 p-[6px] text-[.9rem] outline-none border border-blue-400 rounded-md"
                    placeholder="Search Time"
                    onChange={handleChange}
                    value={searchField}
                  />
                </form>
              )}
              <div
                onClick={toggleSearch}
                className="w-fit h-fit p-1 rounded-full bg-blue-100 cursor-pointer"
              >
                <img
                  alt=""
                  src="/images/icons8-search-64.png"
                  className="w-6 h-6"
                />
              </div>
            </div>
          </div>

          {!searchField &&
            (allRides?.length > 0 ? (
              allRides?.map((item, index) => {
                return (
                  <RideHistoryAdmin item={item} index={index} key={index} />
                );
              })
            ) : (
              <div className="w-full py-12 bg-sky-50 flex flex-col items-center">
                <img
                  alt=""
                  src="/images/empty.png"
                  className="w-20 h-20 mb-8"
                />
                <p className="text-slate-400">
                  No booking history today yet...
                </p>
              </div>
            ))}

          {searchField && (
            <>
              <h2 className="w-fit mx-auto mb-4 border-b border-slate-300">
                Search results for "{searchField}"
              </h2>
              {filteredItems?.length > 0 ? (
                filteredItems?.map((item, index) => {
                  return (
                    <div key={index} className="w-full">
                      <RideHistoryAdmin item={item} />
                    </div>
                  );
                })
              ) : (
                <div className="w-full py-12 bg-sky-50 flex flex-col items-center">
                  <img
                    alt=""
                    src="/images/empty.png"
                    className="w-20 h-20 mb-8"
                  />
                  <p className="text-slate-400">
                    "{searchField}" yielded no results...
                  </p>
                </div>
              )}
            </>
          )}
          {/* <div className="w-full text-center">
            <button
              className="px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3 disabled:opacity-75"
              disabled
            >
              Load nore
            </button>
          </div> */}
        </div>

        <div className="p-3 bg-white rounded-lg shadow-xl shadow-slate-300/30 border border-sky-500 mt-12">
          <h3 className="text-[1.1rem] sm:text-[1.3rem] font-medium pb-2 mb-4 border-b border-slate-300 text-center">
            Contact Us messages
          </h3>

          {allContacts.length > 0 ? (
            allContacts?.map((item, index) => {
              return <ContactMessage key={index} item={item} />;
            })
          ) : (
            <div className="w-full py-12 bg-sky-50 flex flex-col items-center">
              <img alt="" src="/images/empty.png" className="w-20 h-20 mb-8" />
              <p className="text-slate-400">No contact us messages yet...</p>
            </div>
          )}
          <div className="w-full text-center">
            <button
              className="px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3 disabled:opacity-75"
              disabled
            >
              Load nore
            </button>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default AdminDashboard;
