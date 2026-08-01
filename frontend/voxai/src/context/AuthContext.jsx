import { createContext, useContext, useState, useEffect} from "react";
import { getProfile } from "../api/auth";


const AuthContext = createContext();

export function AuthProvider ({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const loadUser = async () => {
        const token = localStorage.getItem("access")

        if (!token){
            setLoading(false)
            return
        }

        try{
            const profile = await getProfile()
            setUser(profile)
        }catch (error){
            console.error(error)

            localStorage.removeItem("access")
            localStorage.removeItem("refresh")

            setUser(null)
        }finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        loadUser();
    },[]);

    const logout = () => {
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user, setUser, loading, logout, isAuthenticated: !!user}}>
            {children}
        </AuthContext.Provider>
    )
};

export function useAuth(){
    return useContext(AuthContext);
}
