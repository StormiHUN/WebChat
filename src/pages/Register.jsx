import { createUserWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import { auth } from "../firebase"

export default function Register(){

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [psw, setPsw] = useState("")
    const [psw2, setPsw2] = useState("")
    const [error, setError] = useState(null)

    function handleRegister(){
        if(email == "" || psw == "" || psw2 == "") return
        if(psw != psw2) {
            setError("Passwords must match!")
            return
        }
        createUserWithEmailAndPassword(auth,email,psw)
        .then(() => {
            navigate("/")
        }).catch((e) => {
            console.log(JSON.stringify(e))
            switch (e.code) {
                case "auth/invalid-email":
                    setError("Invalid email!")
                    break;
                case "auth/weak-password":
                    setError("Password is weak!")
                    break;
                case "auth/email-already-in-use":
                    setError("Email already in use!")
                    break;
                default:
                    setError("An unkown error has occured!")
                    break;
            }
        })
    }

    return (
        <div className="w-fit m-auto border-2 border-blue-500 rounded p-4 mt-6 flex flex-col">
            <h1 className="m-auto text-3xl text-zinc-600 mb-6">WebChat</h1>
            <hr /><input className="m-auto border rounded mt-2 w-72 p-2 border-zinc-300 hover:border-blue-500  transition" type="text" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className="border rounded w-72 p-2 border-zinc-300 mt-2 hover:border-blue-500  transition" placeholder="Password *" type="text" value={psw} onChange={(e) => setPsw(e.target.value)} />
            <input className="border rounded w-72 p-2 border-zinc-300 mt-2 hover:border-blue-500  transition" placeholder="Confirm Password *" type="text" value={psw2} onChange={(e) => setPsw2(e.target.value)} />
            {error && <p className="m-auto text-sm text-red-500">{error}</p>}
            <button className="mt-24 border border-zinc-300 rounded p-2 text-lg hover:border-blue-500 hover:bg-blue-50 transition" onClick={handleRegister}>Register</button>
            <p className="m-auto text-sm mt-1">Already have an account? Login <Link to="/login" className="underline hover:text-blue-500 transition">here</Link>!</p>
        </div>
    )
}