import Footer from "../components/Footer";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";

const BookRides = () => {
  const { currentUserFromDb } = useAppContext();
  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-slate-100 py-[150px] px-[5%] sm:px-[10.5%] text-slate-700">
        <section className="w-full border-b border-zinc-300 pb-4">
          <h2 className="text-[1.5rem] font-bold">
            Hello {currentUserFromDb.firstname}
          </h2>
          <p className="text-[1.1rem] text-black font-light">
            Welcome to your dashboard. You can book rides & view ride history!
          </p>
        </section>
        <section className="w-full mt-16 border-b border-zinc-300 pb-16">
          <h1 className="text-[1.5rem] md:text-[2rem] font-medium text-center">
            Available booking times
          </h1>
          <div className="w-full block md:flex">
            <div className="w-full md:w-1/2 md:p-4 p-0">
              <div className="w-full min-h-[200px] bg-white rounded-lg p-4">
                <h2 className="pb-1 border-b border-b-slate-400/80">
                  From Oke-odo - Morning Rides
                </h2>
                <div className="my-4 w-full flex gap-2 flex-wrap">
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    6:55AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    7:35AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    8:15AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    8:55AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    9:35AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    10:15AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    10:55AM
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 md:p-4 p-0 mt-5 md:mt-0">
              <div className="w-full min-h-[200px] bg-white rounded-lg p-4">
                <h2 className="pb-1 border-b border-b-slate-400/80">
                  From School Park - Afternoon Rides
                </h2>
                <div className="my-4 w-full flex gap-2 flex-wrap">
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    6:55AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    7:35AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    8:15AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    8:55AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    9:35AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    10:15AM
                  </button>
                  <button className="px-3 py-1 bg-blue-300  hover:bg-blue-500 hover:text-white rounded-sm text-[0.85rem] transition-all duration-300">
                    10:55AM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full mt-10">
          <h2 className="text-[1.5rem] font-medium">Active bookings</h2>
          <div className="w-full min-h-[200px] bg-white rounded-lg p-4 mt-3"></div>
        </section>
        <section className="w-full mt-10">
          <h2 className="text-[1.5rem] font-medium">Ride history</h2>
          <div className="w-full min-h-[200px] bg-white rounded-lg p-4 mt-3"></div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BookRides;
