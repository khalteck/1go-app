import { useAppContext } from "../contexts/AppContext";

const ClientNoonTimeBtn = ({ item }) => {
  const { user, activeRidesFromDb, navigate } = useAppContext();

  function link() {
    if (user && !activeRidesFromDb?.length > 0) {
      navigate(`/book-ride/summary/${item.id}`);
    } else if (user && activeRidesFromDb?.length > 0) {
      navigate("/book-ride");
    } else {
      navigate("/login");
    }
  }

  return (
    <button
      onClick={link}
      className="px-3 py-1 bg-blue-300 hover:bg-blue-500 border border-slate-500 hover:text-white rounded-md text-[0.8rem] md:text-[0.85rem] transition-all duration-300"
    >
      {item.time}
    </button>
  );
};

export default ClientNoonTimeBtn;
