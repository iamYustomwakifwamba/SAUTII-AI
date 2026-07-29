import NavigationBarLayout from "../components/layout/NavBar"
import HomeLandingLayout from "../components/layout/HomeLanding"
import FooterLayout from "../components/layout/Footer"

function HomePageView () {
    return (
        <div className="bg-stone-800 min-h-screen">
            <NavigationBarLayout/>
            <HomeLandingLayout/>
            <FooterLayout/>
        </div>
    )
}

export default HomePageView