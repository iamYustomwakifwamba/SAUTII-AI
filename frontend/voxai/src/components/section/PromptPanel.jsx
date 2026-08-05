import { useState, useEffect, useRef } from "react"
import { Zap, Sparkles, UserRound } from "lucide-react"
import { createJingle, sendMessage } from "../../api/studio"
import { useStudio } from "../../context/StudioContext"
import { useNavigate, useParams } from "react-router-dom"

const tags = ["Saloon", "Hotel", "Logistic"]

function StudioPromptPanel() {

  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { messages, setMessages, currentJingle, setCurrentJingle } = useStudio()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages])

  const handleGenerate = async () => {

    if (!prompt.trim()) return


    try {

      setLoading(true)

      if(id){
        const data = await sendMessage(id, prompt)
        setMessages(data.messages)
        console.log(data)
      }else{

        const data = await createJingle(prompt)
        
        setCurrentJingle(data.data)
        navigate(`/studio/${data.data.id}`)
      }

      setPrompt("")

    } catch(error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }


  return (
    <div className="bg-slate-50 flex flex-col min-h-[50vh] lg:h-full">


      <div className="flex-1 flex flex-col items-center justify-start gap-2 text-slate-400 py-6 px-4 text-center overflow-y-auto">

        {messages.length > 0 ? (
           <div className="w-full max-w-xl flex flex-col gap-4 px-2 sm:px-4 ">

            {messages.map((message) => {
              const isUser = message.role === "user"

              return (
                <div
                  key={message.id}
                  className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* AVATAR */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isUser ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isUser ? <UserRound size={13} /> : <Sparkles size={13} />}
                  </div>

                  {/* BUBBLE */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm text-left leading-relaxed ${
                      isUser
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-white border border-slate-200 text-slate-700 rounded-bl-md shadow-sm"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                </div>
              )
            })}

            <div ref={messagesEndRef}/>

            {/* ASSISTANT PLACEHOLDER RESPONSE */}
            <div className="flex items-end gap-2 flex-row">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-200 text-slate-500">
                <Sparkles size={13} />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-left leading-relaxed bg-white border border-slate-200 text-slate-700 shadow-sm">
                <p>Unable to answer now</p>
              </div>
            </div>

          </div>
        ):(

          <>
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-lg">
               ♪
            </div>
            <p className="text-xs">
              Your jingle will appear here
            </p>
          </>
        )}

      </div>


      <div className="sticky bottom-0 lg:static p-4 border-t border-slate-200 bg-slate-50">

        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-lg lg:shadow-none">


          <textarea
            value={prompt}
            onChange={(e)=>setPrompt(e.target.value)}
            placeholder="Tell Voxa what you want to create..."
            className="w-full resize-none bg-transparent px-4 pt-4 pb-2 text-slate-900 placeholder:text-slate-400 outline-none text-sm leading-relaxed"
            rows={3}
          />


          <div className="border-t border-slate-200 px-3 py-2.5 flex items-center justify-between gap-3 flex-wrap">


            <div className="flex gap-2 flex-wrap">

              {tags.map((tag)=>(
                <button
                  key={tag}
                  className="border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-500 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}

            </div>


            <button
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-5 py-2 text-sm transition-colors cursor-pointer w-full sm:w-auto justify-center disabled:opacity-50"
            >


              {loading ? (
                <>
                 <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 Generating...
                </>
              ):(
                <>
                <Zap size={15}/>
                Generate
                </>
              )}

            </button>


          </div>

        </div>

      </div>


    </div>
  )
}

export default StudioPromptPanel