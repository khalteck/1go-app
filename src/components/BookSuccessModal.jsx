import moment from "moment";
import { useAppContext } from "../contexts/AppContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const BookSuccessModal = ({ currentTime, detailsForm }) => {
  const { cloaseSuccessModal } = useAppContext();

  console.log("detailsForm", detailsForm);

  //to get today's date
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    // The date format will be: "YYYY-MM-DD"
    const todayDate = `${year}-${month}-${day}`;
    return todayDate;
  };

  //to dynamically build terminal departure times
  const departureTime =
    detailsForm?.terminal === "Terminus"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(2, "minutes")
          .format("h:mm A")
      : detailsForm?.terminal === "Mark"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(4, "minutes")
          .format("h:mm A")
      : detailsForm?.terminal === "Ilesanmi"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(6, "minutes")
          .format("h:mm A")
      : detailsForm?.terminal === "Sanrab"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(8, "minutes")
          .format("h:mm A")
      : detailsForm?.terminal === "Chapel"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(11, "minutes")
          .format("h:mm A")
      : detailsForm?.terminal === "Okeodo"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(14, "minutes")
          .format("h:mm A")
      : detailsForm?.terminal === "Stella maris"
      ? moment(`${currentTime?.time}`, "h:mm A")
          .add(16, "minutes")
          .format("h:mm A")
      : currentTime?.time;

  //to dynamically render terminal description
  const terminalDescription =
    detailsForm?.terminal === "Terminus"
      ? "In front of the Triple Tmall just beside the univerity terminus"
      : detailsForm?.terminal === "Mark"
      ? "Just before mark junction in front of the Al Ummah mosque and directly opposite Bravo fuel station"
      : detailsForm?.terminal === "Ilesanmi"
      ? "In front of Anchor Kiddies Palace just before the Tanke Iledu community junction while coming from Tipper garage"
      : detailsForm?.terminal === "Sanrab"
      ? "Before the Sanrab/Tanke Bubu junction directly opposite Monique unisex hair Palace"
      : detailsForm?.terminal === "Chapel"
      ? "Opposite Made Art Concept, Chapel junction"
      : detailsForm?.terminal === "Okeodo"
      ? "Beside Puff Puff Town, opposite Item 7"
      : detailsForm?.terminal === "Stella maris"
      ? "Stella Maris junction, Stella maris"
      : "At the entrance of the School park, just beside the Eatrite restaurant signboard, directly opposite Unilorin central mosque";

  //to handle download receipt
  const handleDownload = () => {
    const receiptElement = document.getElementById("receipt");

    // Use html2canvas to convert the "receipt" element to an image
    html2canvas(receiptElement).then((canvas) => {
      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Calculate the width and height of the PDF
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      // Add the canvas image as a new page in the PDF
      pdf.addImage(canvas, "PNG", 0, 0, width, height);

      // Download the PDF file
      pdf.save("receipt.pdf");
    });
  };

  return (
    <div className="w-full h-[100vh] py-16 px-4 md:px-8 fixed top-0 left-0 bg-blue-50 flex justify-center z-[100] overflow-auto">
      <div
        id="receipt"
        className="w-full text-[.9rem] text-slate-600 md:text-[1.2rem] rounded-2xl flex justify-center"
      >
        <div className="w-full sm:max-w-[550px] sm:h-fit scale flex flex-col gap-2 items-center bg-blue-50 sm:p-8 sm:shadow-md rounded-lg relative">
          <div className="px-3 pb-3 pt-12 rounded-md bg-blue-300/10 border border-black/10 text-[.85rem]">
            <div className="w-fit h-fit rounded-full bg-white mx-auto absolute top-[-30px] md:top-[-15px] left-[50%] translate-x-[-50%]">
              <img
                alt=""
                src="/images/icons8-checkmark-64.png"
                className="w-16 sm:w-20 h-16 sm:h-20"
              />
            </div>
            {detailsForm?.terminal === "School park" && (
              <p className="text-center">
                Successful booking!
                <br /> Please proceed promptly to the{" "}
                <span className="font-bold">{detailsForm?.terminal}</span> , as
                your bus will depart school park at{" "}
                <span className="font-bold">{departureTime}</span>
              </p>
            )}

            {detailsForm?.terminal !== "School park" && (
              <p className="text-center">
                <span className="text-[1.2rem] font-bold">
                  Successful booking!
                </span>
                <br /> Please proceed promptly to your pickup terminal -{" "}
                <span className="font-bold">{detailsForm?.terminal}</span> , as
                your bus will depart your terminal at exactly{" "}
                <span className="font-bold">{departureTime}</span>
              </p>
            )}
          </div>

          <div className="w-full p-3 rounded-md bg-blue-300/10 mt-3 text-[.8rem] border border-black/10">
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Date:</p>
              <p className="font-medium">{getTodayDate()}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Departure time:</p>
              <p className="font-medium">{departureTime}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Seats:</p>
              <p className="font-medium">{detailsForm?.seats}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Pickup terminal:</p>
              <p className="font-medium">{detailsForm?.terminal}</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Booking code:</p>
              <p className="font-medium">Random</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Price:</p>
              <p className="font-medium">
                {detailsForm?.seats
                  ? currentTime?.price * detailsForm?.seats
                  : currentTime?.price}
              </p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center">
              <p>Ride coordinator contact:</p>
              <p className="font-medium">08166864740</p>
            </div>
            <div className="w-full p-2 border-b border-slate-400/30 flex justify-between items-center flex-wrap">
              <p className="whitespace-nowrap">Vehicle description::</p>
              <p className="font-medium ml-auto">
                White Toyota Hiace (Hummer Bus)
              </p>
            </div>
            <div className="w-full p-2 flex justify-between items-start flex-wrap">
              <p className="whitespace-nowrap">Terminal description::</p>
              <p className="font-medium ml-auto">{terminalDescription}</p>
            </div>
          </div>

          <div className="w-full flex gap-2">
            <button
              onClick={handleDownload}
              className="w-1/2 md:w-[fit-content] px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3"
            >
              Download
            </button>
            <button
              type="submit"
              className="w-1/2 md:w-[fit-content] px-10 py-2 bg-blue-400 hover:bg-blue-400/70 border border-blue-400 text-white rounded-md my-3"
              onClick={cloaseSuccessModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSuccessModal;
