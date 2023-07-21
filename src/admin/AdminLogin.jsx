import Sidebar from "./Sidebar";
import ScrollToTop from "../ScrollToTop";
import { useAppContext } from "../contexts/AppContext";
import Loader from "../components/Loader";

const AdminLogin = () => {
  const {
    togglePassword,
    showPassword,
    errorMessage,
    loginAdmin,
    loader,
    handleAdminChange,
    adminLoginData,
    setErrorMessage,
  } = useAppContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (adminLoginData?.email && adminLoginData?.password) {
      await loginAdmin();
    } else {
      setErrorMessage("Email & password required!");
    }
  };
  return (
    <div className="w-full">
      {loader && <Loader />}
      <div
        className={`w-full min-h-screen bg-sky-50 pt-[120px] md:pt-[150px] px-3 md:px-12 transition-all duration-500 text-slate-700`}
      >
        <form className="w-full md:w-[550px] mx-auto rounded-md">
          <h1 className="text-[2rem] md:text-[3rem] font-bold text-black text-center">
            Welcome Admin
          </h1>
          <div className="font-light space-y-4 py-12 w-full rounded-lg sm:mt-4 mx-auto">
            <div>
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <input
                className={`login-input ${
                  errorMessage && "border border-red-400"
                }`}
                id="email"
                onChange={handleAdminChange}
                placeholder="Enter your email"
                type="email"
              />
            </div>

            <div>
              <label htmlFor="firstname" className="font-medium">
                Password
              </label>
              <div className="w-full relative">
                <input
                  className={`login-input ${
                    errorMessage && "border border-red-400"
                  }`}
                  id="password"
                  onChange={handleAdminChange}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
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
              <div className="w-full flex gap-4 items-center py-3 px-10 mt-6 bg-red-400/20 text-[0.85rem] rounded-lg border border-red-400">
                <img
                  alt=""
                  src="/images/icons8-medium-risk-50.png"
                  className="w-6 h-6 mr-1"
                />
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={handleLogin}
              className="text-white bg-blue-500 login-input mb-3 border-transparent hover:opacity-80"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default AdminLogin;
