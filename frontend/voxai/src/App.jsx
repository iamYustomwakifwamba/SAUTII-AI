import HomePageView from "./pages/Home"
import TrialGeneratorPage from "./pages/TrialPage"
import LoginPage from "./pages/Login"
import StudioPage from "./pages/StudioPage"
import FeaturesPage from "./pages/features"
import RegisterPage from "./pages/Register"
import { Routes, Route } from "react-router-dom"

function App () {
  return (
    <Routes>
      <Route path="/" element={<HomePageView/>}/>
      <Route path="/trial" element={<TrialGeneratorPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/studio" element={<StudioPage/>}/>
      <Route path="/features" element={<FeaturesPage/>}/>
    </Routes>
  )
}

export default App