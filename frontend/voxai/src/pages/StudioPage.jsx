import { useEffect } from "react"
import { useParams } from "react-router-dom"

import StudioLayout from "../components/layout/StudioLayout"
import { StudioProvider, useStudio } from "../context/StudioContext"

import { getJingle } from "../api/studio"


function StudioContent() {

    const { id } = useParams()

    const {
        setCurrentJingle,
        setMessages,
        setAudios
    } = useStudio()


    useEffect(() => {

        const loadJingle = async () => {

            if (!id) return

            try {

                const data = await getJingle(id)

                setCurrentJingle(data)

                console.log(data)

                setMessages(data.messages)

                setAudios(data.audio)

            } catch (error) {

                console.log(error)

            }

        }

        loadJingle()

    }, [id])


    return <StudioLayout />

}


function StudioPage() {

    return (

        <StudioProvider>

            <StudioContent />

        </StudioProvider>

    )

}


export default StudioPage