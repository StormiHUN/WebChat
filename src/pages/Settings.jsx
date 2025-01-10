import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from "firebase/auth"
import { auth, db } from "../firebase"
import { doc, setDoc, updateDoc } from "firebase/firestore"
import { useAuth } from "../components/AuthProvider"

export default function Settings() {

    const navigate = useNavigate()
    const user = useAuth()
    const [imgUrl, setImgUrl] = useState(user.user.ProfilePic)
    const [editUrl, setEditUrl] = useState("")
    const [name, setName] = useState(user.user.DisplayName)
    const [editName, setEditName] = useState("")
    const [email, setEmail] = useState(user.auth.email)
    const [editEmail, setEditEmail] = useState("")
    const [psw, setPsw] = useState("")
    const [newPsw, setNewPsw] = useState("")
    const [newPsw2, setNewPsw2] = useState("")
    console.log(user)
    const userDoc = doc(db,"Users",user.auth.uid)

    function handleImageUpload() {
        setImgUrl(editUrl)
        updateDoc(userDoc,{ProfilePic:editUrl})
        setEditUrl("")
    }

    function handleNameChange() {
        setName(editName)
        updateDoc(userDoc,{DisplayName:editName})
        setEditName("")

    }

    function handleEmailChange() {
        alert("Nem lehet nem megerositett emaillal!")
        return
        setEmail(editEmail)
        updateEmail(user.auth,editEmail)
        setEditEmail("")
    }

    function handlePasswordChange() {
        alert("Nem lehet nem megerositett emaillal!")
        return
        if(newPsw != newPsw2) return
        updatePassword(user.auth,newPsw)
        setNewPsw("")
        setNewPsw2("")
        setPsw("")

    }

    function logout(){
        signOut(auth)
        navigate("/login")
    }

    return (    
        <div className="flex flex-col p-4 gap-4 mx-auto max-w-screen-xl">
            <div className="flex justify-between">
                <Link to="/">
                    <button className="flex gap-2 p-2 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 hover:border-blue-500 transition-all"><img src="back.svg" />Return</button>
                </Link>
                <button onClick={logout} className="flex gap-2 p-2 bg-blue-100 border border-blue-300 rounded-md hover:bg-blue-200 hover:border-blue-500 transition-all">Logout<img src="logout.svg" /></button>
            </div>
            <div className="flex gap-4">
                <img className="w-24 h-24 rounded-full border border-blue-500 mr-32" src={imgUrl} />
                <div className="flex items-center gap-4 w-full">
                    <input placeholder="Image url" className="border border-blue-300 rounded-full bg-gray-50 p-3 hover:border-blue-500 transition-all w-1/3" type="text" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                    <button onClick={handleImageUpload} className="border border-blue-300 bg-blue-100 hover:border-blue-500 hover:bg-blue-200 transition-all rounded-full p-3">Upload</button>
                </div>
            </div>
            <hr className="border border-blue-300" />
            <div className="flex gap-4 items-center">
                <p className="text-3xl w-56">{name}</p>
                <input placeholder="Display name" className="border border-blue-300 rounded-full bg-gray-50 p-3 hover:border-blue-500 transition-all w-1/3" type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                <button onClick={handleNameChange} className="border border-blue-300 bg-blue-100 hover:border-blue-500 hover:bg-blue-200 transition-all rounded-full p-3">Change name</button>
            </div>
            <div className="flex gap-4 items-center">
                <p className="text-3xl w-56">{email}</p>
                <input placeholder="Email" className="border border-blue-300 rounded-full bg-gray-50 p-3 hover:border-blue-500 transition-all w-1/3" type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
                <button onClick={handleEmailChange} className="border border-blue-300 bg-blue-100 hover:border-blue-500 hover:bg-blue-200 transition-all rounded-full p-3">Change email</button>
            </div>
            <div className="flex gap-4 items-center">
                <input value={newPsw} onChange={(e) => setNewPsw(e.target.value)} className="border border-blue-300 rounded-full bg-gray-50 p-3 hover:border-blue-500 transition-all w-1/3" type="password" placeholder="New password" />
                <input value={newPsw2} onChange={(e) => setNewPsw2(e.target.value)} className="border border-blue-300 rounded-full bg-gray-50 p-3 hover:border-blue-500 transition-all w-1/3" type="password" placeholder="Confirm new password" />
                <input placeholder="Current password" className="border border-blue-300 rounded-full bg-gray-50 p-3 hover:border-blue-500 transition-all w-1/3" type="password" value={psw} onChange={(e) => setPsw(e.target.value)} />
                <button onClick={handlePasswordChange} className="border border-blue-300 bg-blue-100 hover:border-blue-500 hover:bg-blue-200 transition-all rounded-full p-3">New password</button>
            </div>
        </div>
    )
}