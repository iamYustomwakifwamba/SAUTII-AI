import NavigationBarLayout from "../components/layout/NavBar"
import TrialPromptSectionLayout from "../components/layout/trialPrompt"
import FooterLayout from "../components/layout/Footer"

function TrialGeneratorPage () {
    return (
        <div className="bg-slate-50 min-h-screen">
            <NavigationBarLayout/>
            <TrialPromptSectionLayout/>
            <div className="mt-[3cm] bg-stone-800">
                <FooterLayout/>
            </div>
        </div>
    )
}

export default TrialGeneratorPage