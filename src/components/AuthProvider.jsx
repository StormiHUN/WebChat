import { useState,createContext } from "react"
import {onAuthStateChanged} from "firebase/auth"
import { auth, db } from "../firebase"
import { useContext } from "react"
import { useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"

const authContext = createContext({user:undefined,auth:undefined})  

export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){

    const [user, setUser] = useState(undefined)
    const [auth_, setAuth] = useState(undefined)
    
    useEffect(() => {
        return onAuthStateChanged(auth,(v) => {
            console.log(v)
            setAuth(v)
        })
    },[])

    useEffect(() => {
        if(!auth_) return
        const userDoc = doc(db,"Users",auth_.uid)
        return onSnapshot(userDoc, (v) => {
            console.log(v.data())
            setUser(v.data())
        })
    },[auth_])

    return (
        <authContext.Provider value={{user,auth:auth_}}>
            {children}
        </authContext.Provider>
    )
}