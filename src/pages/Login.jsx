import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { useAppContext } from "../contexts/AppContext";
import ScrollToTop from "../ScrollToTop";

const Login = () => {
  const {
    handleLoginChange,
    showPassword,
    login,
    loader,
    togglePassword,
    errorMessage,
    userNotLoggedIn,
    handleResetpswChange,
    // forgotpswSubmit,
  } = useAppContext();

  // const [forgotpsw, setForgotpsw] = useState(false);
  // const handleForgotPsw = () => {
  //   setForgotpsw((prev) => !prev);
  // };

  return (
    <>
      {loader && <Loader />}

      <Header />
      <section
        className={` pt-[100px] sm:py-[200px] w-full min-h-screen bg-blue-50 px-[2%] sm:px-[10.4%] relative flex justify-center items-center`}
      >
        <div className="absolute top-0 md:top-1 left-4 md:left-[10.5%] text-[0.9rem] text-slate-800 flex gap-2 items-center">
          <img
            alt=""
            src="/images/icons8-info-black-64.png"
            className="w-4 h-4"
          />
          <p className="underline">Contact us</p>
        </div>
        <div
          className={`w-[96%] md:w-full mx-auto h-[600px] bg-white md:flex justify-between items-center rounded-lg transition-all duration-300`}
        >
          <div className="w-full px-4 pt-10 md:py-12 md:w-1/2 md:px-[3%] lg:px-[8%]">
            <div className="text-start">
              <h1 className="text-[2rem] lg:text-[3rem] md:text-[1.75rem] font-bold text-black">
                Welcome back
              </h1>
              <p className="text-slate-500 font-light">
                Welcome back! Please enter your details.
              </p>
            </div>
            {/* Login form */}
            <form>
              <div className="font-light space-y-4 mt-6 pt-2 pb-12 w-full rounded-lg sm:mt-4">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    className="login-input"
                    id="email"
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="firstname">Password</label>
                  <div className="w-full relative">
                    <input
                      className="login-input"
                      id="password"
                      onChange={handleLoginChange}
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

                <div className="flex justify-between">
                  <div className="space-x-2">
                    <input id="remember-me" type="checkbox" />
                    <label htmlFor="remember-me">Remember me</label>
                  </div>

                  <a
                    // onClick={handleForgotPsw}
                    className="text-blue-500 font-light cursor-pointer"
                  >
                    Forgot password?
                  </a>
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
                    onClick={login}
                    className="text-white bg-blue-500 login-input mt4 mb-3 border-transparent hover:opacity-80"
                  >
                    Sign in
                  </button>

                  <p>
                    Don't have an account?
                    <Link
                      to="/register"
                      className="text-blue-500 cursor-pointer"
                    >
                      {" "}
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          {/* image half */}
          <div className="w-1/2 h-full bg-reg1 bg-cover bg-no-repeat hidden md:block rounded-r-lg p-5 relative">
            <div className="w-[93%] p-6 rounded-lg bg-white/50 absolute bottom-4 left-[50%] translate-x-[-50%] text-black">
              <p className="text-[1.2rem]">
                "1go ride has been a life saver It reduces the stress of queuing
                for long Its also fast and reliable"
              </p>
              <p className="text-[2rem] font-bold mt-6">Raji Olamide</p>
            </div>
          </div>
        </div>

        {/* {forgotpsw && (
          <div className="w-full px-4 min-h-screen bg-slate-600/90 fixed left-0 top-0 z-[100] flex items-center">
            <div
              onClick={handleForgotPsw}
              className="p-2 rounded-full bg-white mb-8 absolute top-8 right-8 cursor-pointer"
            >
              <img
                alt=""
                src="/images/icons8-close-30.png"
                className="w-6 h-6 "
              />
            </div>
            <form className="w-full md:w-[400px] bg-white p-4 mx-auto rounded-lg">
              <div className="font-light space-y-4 py-12 w-full rounded-lg sm:mt-4 mx-auto">
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    className="login-input"
                    id="email"
                    onChange={handleResetpswChange}
                    placeholder="Enter your email"
                    type="email"
                    required
                  />
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
                    // onClick={forgotpswSubmit}
                    className="text-white bg-blue-500 login-input mt4 mb-3 border-transparent hover:opacity-80"
                  >
                    Send password reset link
                  </button>
                </div>
              </div>
            </form>
          </div>
        )} */}
      </section>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Login;
