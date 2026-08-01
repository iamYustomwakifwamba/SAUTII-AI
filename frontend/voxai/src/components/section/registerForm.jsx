import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Globe, ALargeSmall } from "lucide-react";
import { register } from "../../api/auth";
import Alert from "../UI/Alert";

function SautiiLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="9" fill="#2563EB" />
        <rect x="7" y="14" width="2.6" height="4" rx="1.3" fill="white" opacity="0.55" />
        <rect x="11.5" y="10" width="2.6" height="12" rx="1.3" fill="white" opacity="0.75" />
        <rect x="16" y="7" width="2.6" height="18" rx="1.3" fill="white" />
        <rect x="20.5" y="11" width="2.6" height="10" rx="1.3" fill="white" opacity="0.75" />
        <rect x="25" y="13.5" width="2.6" height="5" rx="1.3" fill="white" opacity="0.55" />
      </svg>
      <span className="text-slate-900 text-xl font-bold tracking-tight">
        sauti<span className="text-blue-600">i</span>
      </span>
    </div>
  );
}

const countries = [
  "Tanzania",
  "Kenya",
  "Uganda",
  "Rwanda",
  "Burundi",
  "Other",
];

function RegisterFormSection() {
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
        setLoading(true)
        setError("")
        setSuccess("")
        const data = await register(firstName, lastName, phoneNumber, country, email, password)

        console.log(data)
        setSuccess(data.message)
    }catch(error){
        console.log(error.response.data)

        error.response ? setError(error.response.data) : setError("Something went Wrong")
    }finally {
        setLoading(false)
    }
    
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden">

      {/* LEFT SIDE - BRAND + ANIMATED TEXT */}
      <div className="w-1/2 hidden md:flex flex-col justify-center px-16 relative">

        <div className="absolute top-16 left-16 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-24 left-32 w-56 h-56 bg-blue-200 rounded-full blur-3xl opacity-40" />

        <div className="relative">
          <div className="mb-8">
            <SautiiLogo />
          </div>

          <TypeAnimation
            sequence={[
              "Create powerful AI jingles in seconds",
              2000,
              "",
              500,
              "Turn text into professional audio ads",
              2000,
              "",
              500,
              "Grow your brand with sautii",
              2000,
              "",
              500,
              "Your best voice actor AI",
              2000,
            ]}
            speed={50}
            repeat={Infinity}
            className="text-slate-900 text-5xl font-black leading-tight"
          />

          <p className="text-slate-500 mt-6 text-lg max-w-md">
            sautii helps businesses generate studio-quality jingles instantly using AI.
          </p>

          <div className="flex items-center gap-6 mt-10 text-sm text-slate-400">
            <span>10,000+ jingles created</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Trusted by 500+ brands</span>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE - REGISTER FORM */}
      <div className="w-full md:w-1/2 h-screen bg-white flex items-center justify-center px-6 sm:px-10 md:px-16 overflow-y-auto py-10">

        <div className="w-full max-w-sm">

          {/* mobile-only logo */}
          <div className="flex md:hidden mb-8">
            <SautiiLogo />
          </div>

          <h1 className="text-slate-900 text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-slate-500 mt-1.5 text-sm">
            Join sautii and start creating AI jingles
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleRegister}>

            {/* FIRST + LAST NAME */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 text-xs font-medium">First name</label>
                <div className="relative mt-1.5">
                  <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Yusto"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 text-xs font-medium">Last name</label>
                <div className="relative mt-1.5">
                  <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Mwakifwamba"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-slate-700 text-xs font-medium">Email</label>
              <div className="relative mt-1.5">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            {/* PHONE + COUNTRY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 text-xs font-medium">Phone number</label>
                <div className="relative mt-1.5">
                  <Phone size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="0712 345 678"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 text-xs font-medium">Country</label>
                <div className="relative mt-1.5">
                  <Globe size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-slate-700 text-xs font-medium">Password</label>
              <div className="relative mt-1.5">
                <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-11 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
                <Alert type="error" message={error}/>
            )}

            {success && (
                <Alert type="success" message={success}/>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-600/25"
            >
              {loading ? (
                <>
                 <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 Creating....
                </>
              ):(
                <>
                 Create account
                 <ArrowRight size={16} />
                </>
              )}
            </button>

          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* SOCIAL LOGIN */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-slate-200 rounded-xl py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-slate-500 text-sm text-center mt-7">
            Already have an account?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Login
            </span>
          </p>

        </div>

      </div>
    </div>
  );
}

export default RegisterFormSection;