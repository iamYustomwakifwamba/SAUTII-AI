import { createContext, useContext, useState } from "react"

const StudioContext = createContext()

export function StudioProvider({ children }) {

    const [currentJingle, setCurrentJingle] = useState(null)
    const [messages, setMessages] = useState([])
    const [audios, setAudios] = useState([])
    const [loading, setLoading] = useState(false)

    return (
        <StudioContext.Provider
            value={{
                currentJingle,
                setCurrentJingle,

                messages,
                setMessages,

                audios,
                setAudios,

                loading,
                setLoading
            }}
        >
            {children}
        </StudioContext.Provider>
    )
}

export function useStudio() {
    return useContext(StudioContext)
}