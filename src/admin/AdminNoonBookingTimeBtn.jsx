const AdminNoonBookingTimeBtn = ({
  item,
  handleDeleteNoonTime,
  getFormattedDate,
  deleteBookingTime,
}) => {
  return (
    <div className="px-3 py-1 bg-blue-300 rounded-md relative flex items-center mb-5">
      <div
        onClick={() =>
          deleteBookingTime({
            track_date: getFormattedDate(),
            time: item?.time,
            collection_type: "off_campus",
          })
        }
        className="absolute top-[-10px] right-[-10px] w-6 h-6 rounded-full flex items-center justify-center bg-white border hover:border-blue-600 border-blue-400 hover:bg-blue-300 cursor-pointer"
      >
        <img alt="" src="/images/icons8-remove-32.png" className="w-3 h-3" />
      </div>
      <div className="text-[0.85rem] transition-all duration-300">
        {item?.time}
      </div>
      <div className="text-[0.75rem] border border-blue-400 rounded-md px-3 absolute bottom-[-23px] left-[50%] translate-x-[-50%] font-medium flex gap-1">
        <p>{item.slot}</p>
        <p className="text-blue-400 border-l border-blue-400 pl-1">
          #{item.price}
        </p>
      </div>
    </div>
  );
};

export default AdminNoonBookingTimeBtn;
