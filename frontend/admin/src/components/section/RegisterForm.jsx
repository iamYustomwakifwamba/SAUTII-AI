import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Phone, User, ShieldCheck } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import { adminRegister } from "../../api/auth";
import AlertBox from "../UI/AlertBox";

function SautiiLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="9" fill="#2563EB" />
        <rect x="7" y="14" width="2.6" height="4" rx="1.3" fill="white" opacity="0.55" />
        <rect x="11.5" y="10" width="2.6" height="12" rx="1.3" fill="white" opacity="0.75" />
        <rect x="16" y="7" width="2.6" height="18" rx="1.3" fill="white" />
        <rect x="20.5" y="11" width="2.6" height="10" rx="1.3" fill="white" opacity="0.75" />
        <rect x="25" y="13.5" width="2.6" height="5" rx="1.3" fill="white" opacity="0.55" />
      </svg>
      <span className="text-slate-900 text-lg font-bold tracking-tight">
        sauti<span className="text-blue-600">i</span>
      </span>
    </div>
  );
}

function RegisterFormSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({type: "", message: ""})

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setAlert({
      type: "",
      message: ""
    });

    if (
        !firstname.trim() || !lastname.trim() || !email.trim() || 
        !phoneNumber.trim() || !password.trim() || !confirmPassword.trim()
      ){
        setAlert({
          type: "error",
          message: "Please fill in all required fields"
        });
        return
      }

    if (password !== confirmPassword){
      setAlert({
        type: "error",
        message: "Password do not match."
      });
      return
    }

    try {
      setLoading(true)

      const data = await adminRegister(
        firstname, lastname, email, phoneNumber, password
      );

      console.log("REGISTER RESPONSE:", data);

      setAlert({
        type: "success",
        message: "Admin account created successfully. Redirecting to login...."
      });

      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (error) {
      console.error(
        "REGISTER ERROR",
        error.response?.data || error.message
      );

      setAlert({
        type: "error",
        message: error.response?.data.message || "Unable to create admin account. Please try again."
      })
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col">

      {/* TOP NAVBAR */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5">
        <SautiiLogo />
        <span className="text-slate-500 text-sm">
          Already an admin?{" "}
          <span className="text-blue-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </span>
      </div>

      {/* CENTERED CARD */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-6 pb-16 pt-6 sm:pt-0">
        <div className="w-full max-w-sm">

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center mb-3">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <p className="text-slate-500 text-sm">
              Continue to <span className="text-slate-900 font-semibold">sautii Admin</span>
            </p>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-slate-900 text-2xl font-bold">
              Create admin account
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm">
              Fill in your details to get access to the dashboard
            </p>
          </div>

          {alert.message && (
            <div className="mb-5">
              <AlertBox
               type={alert.type}
               message={alert.message}
              />
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>

            {/* FIRSTNAME + LASTNAME */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 text-xs font-medium">First name</label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Yusto"
                  className="w-full mt-1.5 bg-white border border-slate-200 rounded-none px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-slate-700 text-xs font-medium">Last name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Mwakifwamba"
                  className="w-full mt-1.5 bg-white border border-slate-200 rounded-none px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-slate-700 text-xs font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sautii.com"
                className="w-full mt-1.5 bg-white border border-slate-200 rounded-none px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
              />
            </div>

            {/* PHONE NUMBER */}
            <div>
              <label className="text-slate-700 text-xs font-medium">Phone number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+255 712 345 678"
                className="w-full mt-1.5 bg-white border border-slate-200 rounded-none px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-slate-700 text-xs font-medium">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-none px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-slate-700 text-xs font-medium">Confirm password</label>
              <div className="relative mt-1.5">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-none px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-none transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">Or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* SOCIAL LOGIN */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-none py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-slate-400 text-xs text-center mt-8">
            Restricted access — authorized personnel only
          </p>

        </div>
      </div>

    </div>
  );
}

export default RegisterFormSection;