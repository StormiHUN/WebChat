import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login(){

    const [email, setEmail] = useState("")
    const [psw, setPsw] = useState("")

    return (
        <div className="w-fit m-auto border-2 border-blue-500 rounded p-4 mt-6 flex flex-col">
            <h1 className="m-auto text-3xl text-zinc-600 mb-6">WebChat</h1>
            <hr />
            <input className="m-auto border rounded mt-12 w-72 p-2 border-zinc-300 hover:border-blue-500  transition" type="text" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input className="border rounded w-72 p-2 border-zinc-300 mt-2 hover:border-blue-500  transition" placeholder="Password *" type="text" value={psw} onChange={(e) => setPsw(e.target.value)} />
            <button className="mt-24 border border-zinc-300 rounded p-2 text-lg hover:border-blue-500 hover:bg-blue-50 transition">Login</button>
            <p className="m-auto text-sm mt-1">No account? Register <Link to="/register" className="underline hover:text-blue-500 transition">here</Link>!</p>
        </div>
    )
}