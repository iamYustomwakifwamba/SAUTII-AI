// StudioLayout.jsx
import LeftStudioPanel from "../section/LeftPanel"
import StudioPromptPanel from "../section/PromptPanel"
import StudioOutputPanel from "../section/OutputPanel"

function StudioLayout() {
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-12 h-screen overflow-y-auto lg:overflow-hidden">
            <div className="lg:col-span-2 lg:h-full">
                <LeftStudioPanel />
            </div>
            <div className="flex-1 lg:col-span-7 lg:h-full min-h-0">
                <StudioPromptPanel />
            </div>
            <div className="lg:col-span-3 lg:h-full">
                <StudioOutputPanel />
            </div>
        </div>
    )
}

export default StudioLayout