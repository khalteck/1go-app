import React from "react";
import { useAppContext } from "../contexts/AppContext";
import contact from "/images/matey-man-and-woman-work-in-support-service.png";

function ContactUs() {
  const {
    handleContactUsChange,
    handleSubmitContactUs,
    sendingContact,
    sent,
    errorMessage,
    contactUsData,
    setErrorMessage,
  } = useAppContext();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("data", contactUsData);
    if (
      contactUsData.first_name &&
      contactUsData.last_name &&
      contactUsData.email &&
      contactUsData.phone &&
      contactUsData.message
    ) {
      await handleSubmitContactUs();
    } else {
      setErrorMessage("Please fill all fields!");
    }
  }
  return (
    <div className="overlay bg-[#020d18]/80 h-full w-full block lg:flex items-center justify-between text-[1rem] lg:px-[50px] py-[80px]">
      <div className="w-[90%] mx-auto lg:w-[50%] text-center text-slate-100">
        <h2 className="text-[2.5rem] font-bold">Get in Touch</h2>
        <p className="text-[1.2rem] md:text-[1.4rem]">
          Contact us and we will get back to you soon
        </p>
        <div>
          <img src={contact} alt="" className="w-[80%] mx-auto" />
        </div>
      </div>
      {/* Form */}
      <div className="w-full lg:w-1/2 px-8">
        <form className="space-y-6 font-light">
          <div className="flex space-x-4">
            <input
              id="first_name"
              onChange={handleContactUsChange}
              value={contactUsData.first_name}
              type="text"
              placeholder="First Name"
              className={`${
                errorMessage && !contactUsData.first_name
                  ? "border-red-400 bg-red-400/30"
                  : "border-blue-500"
              } w-full px-4 py-3 bg-transparent text-white border-2 rounded-lg focus:outline-none`}
            />
            <input
              id="last_name"
              onChange={handleContactUsChange}
              value={contactUsData.last_name}
              type="text"
              placeholder="Last Name"
              className={`${
                errorMessage && !contactUsData.last_name
                  ? "border-red-400 bg-red-400/30"
                  : "border-blue-500"
              } w-full px-4 py-3 bg-transparent text-white border-2 rounded-lg focus:outline-none`}
            />
          </div>
          <div className="flex space-x-4">
            <input
              id="email"
              onChange={handleContactUsChange}
              value={contactUsData.email}
              type="email"
              placeholder="Email Address"
              className={`${
                errorMessage && !contactUsData.email
                  ? "border-red-400 bg-red-400/30"
                  : "border-blue-500"
              } w-full px-4 py-3 bg-transparent text-white border-2 rounded-lg focus:outline-none`}
            />
            <input
              id="phone"
              onChange={handleContactUsChange}
              value={contactUsData.phone}
              type="number"
              placeholder="Phone Number"
              className={`${
                errorMessage && !contactUsData.phone
                  ? "border-red-400 bg-red-400/30"
                  : "border-blue-500"
              } w-full px-4 py-3 bg-transparent text-white border-2 rounded-lg focus:outline-none`}
            />
          </div>

          <textarea
            id="message"
            onChange={handleContactUsChange}
            value={contactUsData.message}
            placeholder="Enter your message here..."
            className="h-[150px] px-4 py-3 bg-transparent text-white border-2 border-blue-500 rounded-lg focus:outline-none w-full"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-4 w-full rounded-lg flex justify-center items-center"
          >
            {sendingContact ? (
              <div className="w-[25px] h-[25px] bg-gradient-to-b from-black to-white rounded-full relative rotate">
                {/* <div className="w-1/3 h-full bg-white"></div> */}
                <div className="w-1/2 h-1/2 bg-blue-500 rounded-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
          {sent && (
            <div className="w-full p-3 bg-blue-500/50 border border-blue-500 rounded-lg text-white">
              Message sent successfully
            </div>
          )}
          {errorMessage && (
            <div className="w-full p-3 bg-red-400/50 border border-red-400 rounded-lg text-white">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
