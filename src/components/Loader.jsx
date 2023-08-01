import { useAppContext } from "../contexts/AppContext";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  const { takingLong } = useAppContext();
  return (
    <div className="w-full h-[100vh] fixed top-0 left-0 bg-white flex justify-center items-center z-[100]">
      <div className="md:w-1/3 w-[80%] text-[1.2rem] md:text-[2rem] font-bold p-[25px] md:py-[20px] rounded-2xl flex flex-col gap-4 justify-center items-center">
        <PulseLoader color="#3b82f6" size={20} />
        <h1 className="text-black/70 text-[1rem] font-normal">Loading...</h1>

        {takingLong && (
          <p className="text-[0.95rem] text-red-300">
            Poor network connection..
          </p>
        )}
      </div>
    </div>
  );
};

export default Loader;
