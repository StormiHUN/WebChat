import { useState,createContext } from "react"
import {onAuthStateChanged} from "firebase/auth"
import { auth } from "../firebase"
import { useContext } from "react"
import { useEffect } from "react"

const authContext = createContext(undefined)  

export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){

    const [user,setUser] = useState(undefined)

    useEffect(() => {
        return onAuthStateChanged(auth,(v) => {
            console.log(v)
            setUser(v)
        })
    },[])

    return (
        <authContext.Provider value={user}>
            {children}
        </authContext.Provider>
    )
}