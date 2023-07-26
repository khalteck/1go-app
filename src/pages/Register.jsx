import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const Register = () => {
  const {
    handleRegChange,
    loader,
    register,
    showPassword,
    togglePassword,
    errorMessage,
  } = useAppContext();

  return (
    <>
      {loader && <Loader />}
      <Header />
      <section className="w-full min-h-screen bg-blue-50 px-[2%] pt-[100px] sm:py-[170px] sm:px-[10.4%] relative flex justify-center items-center">
        <div className="absolute top-0 md:top-1 left-4 md:left-[10.5%] text-[0.9rem] text-slate-800 flex gap-2 items-center">
          <img
            alt=""
            src="/images/icons8-info-black-64.png"
            className="w-4 h-4"
          />
          <p className="underline">Contact us</p>
        </div>
        <div
          className={`  w-[96%] md:w-full mx-auto h-[800px] bg-white md:flex justify-between items-center rounded-lg transition-all duration-300`}
        >
          {/* texts */}
          <div className="w-full px-4 py-10 md:py-12 md:w-1/2 md:px-[3%] lg:px-[8%]">
            <div className="text-start">
              <h1 className="text-[2rem] lg:text-[3rem] md:text-[1.75rem] font-bold text-black">
                Register
              </h1>
              <p className="font-light">
                Have an Account already?
                <Link to="/login" className="text-blue-500 cursor-pointer">
                  {" "}
                  Log in
                </Link>
              </p>
            </div>
            {/* register form */}
            <form>
              <div className="font-light space-y-4 mt-6 pb-6 w-full h-full rounded-lg sm:mt-4">
                {/* first name */}
                <div>
                  <label htmlFor="first_name">First name</label>
                  <input
                    className="reg-input"
                    id="first_name"
                    onChange={handleRegChange}
                    placeholder="Enter your first name"
                    type="text"
                    required
                  />
                </div>
                {/* last name */}
                <div>
                  <label htmlFor="last_name">Last name</label>
                  <input
                    className="reg-input"
                    id="last_name"
                    onChange={handleRegChange}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                {/* email address */}
                <div>
                  <label htmlFor="email">Email address</label>
                  <input
                    className="reg-input"
                    id="email"
                    onChange={handleRegChange}
                    placeholder="Enter your email adress"
                    type="email"
                    required
                  />
                </div>
                {/* phone number */}
                <div>
                  <label htmlFor="firstname">Phone number</label>
                  <input
                    className="reg-input"
                    id="phone"
                    onChange={handleRegChange}
                    placeholder="Enter your phone Number"
                    type="number"
                    required
                  />
                </div>
                {/* password */}
                <div>
                  <label htmlFor="firstname">Password</label>
                  <div className="w-full relative">
                    <input
                      className="reg-input"
                      id="password"
                      onChange={handleRegChange}
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <img
                      alt="reveal"
                      src="/images/icons8-eye-30.png"
                      className="w-5 h-5 absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer"
                      onClick={togglePassword}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="w-full flex gap-4 items-center py-3 px-10 my-2 bg-red-400/20 text-[0.85rem] rounded-lg border border-red-400">
                    <img
                      alt=""
                      src="/images/icons8-medium-risk-50.png"
                      className="w-6 h-6 mr-1"
                    />
                    <p>{errorMessage}</p>
                  </div>
                )}

                <div>
                  <button
                    onClick={register}
                    className="text-white bg-blue-500 reg-input border-transparent mt-8 hover:opacity-80"
                  >
                    Submit
                  </button>
                  <p className="text-sm pt-3">
                    By clicking submit, you agree to our
                    <a className="text-blue-500 cursor-pointer font-semibold">
                      {" "}
                      Terms & conditions
                    </a>{" "}
                    and
                    <a className="text-blue-500 cursor-pointer font-semibold">
                      {" "}
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </form>
          </div>
          {/* image */}
          <div className="w-1/2 h-full bg-reg2 bg-cover bg-no-repeat hidden md:block rounded-r-lg p-5 relative">
            <div className="w-[93%] p-6 rounded-lg bg-white/70 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-black">
              <p className="text-[1.2rem]">
                "My name is salaam olanrewaju.. Thank you so much 1go.. You have
                made my going to school stress free.. I can't imagine having to
                queue or go through stress for bus, thank you very much"
              </p>
              <p className="text-[2rem] font-bold mt-6">salaam olanrewaju</p>
            </div>
          </div>
          {/* <div className="h-full rounded-r-xl hidden lg:block">
            <img
              src="/images/registerbg.jpg"
              className="h-full opacity-70 rounded-r-xl object-fit"
            />
          </div> */}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
};
export default Register;
