import FeaturesLayout from "../components/layout/FeaturesLayout"
import NavigationBarLayout from "../components/layout/NavBar"
import FooterLayout from "../components/layout/Footer"
export default function FeaturesPage () {
    return(
        <div>
            <NavigationBarLayout/>
            <FeaturesLayout/>
            <FooterLayout/>
        </div>
    )
}