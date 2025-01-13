import { Link } from "react-router-dom"
import { useAuth } from "../components/AuthProvider"
import { db } from "../firebase"
import { collection, getDocs, doc, setDoc, addDoc, onSnapshot, orderBy, Timestamp, query, where } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"

export default function Home() {

    const auth = useAuth()
    const [users, setUsers] = useState([])
    const [msgs, setMsgs] = useState([])
    const [curConv, setCurConv] = useState("")
    const [msg, setMsg] = useState("")
    const [partner, setPartner] = useState({})
    const [partnerId, setPartnerId] = useState("")

    async function getUsers() {
        const tempArray = []
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach((doc) => {
            const temp = {
                id: doc.id,
                DisplayName: doc.data().DisplayName,
                ProfilePic: doc.data().ProfilePic
            }
            if (temp.id != auth.auth.uid) tempArray.push(temp)
        });
        setUsers(tempArray)
    }

    async function getConversation(partnerId) {
        let conversationId = null
        const querySnapshot = await getDocs(collection(db, "Conversations"));
        querySnapshot.forEach((doc) => {
            if (doc.data().userOne == auth.auth.uid && doc.data().userTwo == partnerId){
                conversationId = doc.id
                
            } 
            else if (doc.data().userOne == partnerId && doc.data().userTwo == auth.auth.uid){
                conversationId = doc.id

            } 
        })
        if (conversationId == null) {
            const newConv = await addDoc(collection(db, "Conversations"), { userOne: auth.auth.uid, userTwo: partnerId })
            setCurConv(newConv.id)
        }
        if (!(conversationId == null)) {
            setCurConv(conversationId)
            getMessages(conversationId)
        }
    }

    async function getMessages(conversationId) {
        let tempArray = []
        const querySnapshot = await getDocs(collection(db, "Messages"));
        querySnapshot.forEach((doc) => {
            console.log(doc.data().conversationId == conversationId)
            if (doc.data().conversationId == conversationId) tempArray.push(doc.data())
        })
        setMsgs(tempArray)
        console.log(msgs)
    }

    async function sendMessage() {
        await addDoc(collection(db, "Messages"), { conversationId: curConv, message: msg, senderId: auth.auth.uid, time: new Date().getHours() + ":" + new Date().getMinutes() });
    }

    function sortStuff(snap){
        let tempArray = snap.docs.map(doc => doc.data())
        console.log(tempArray[0].time.split(":")[0]*60 + tempArray[0].time.split(":")[1]*1)
        return tempArray.sort((a, b) => (a.time.split(":")[0]*60 + a.time.split(":")[1]*1) - (b.time.split(":")[0]*60 + b.time.split(":")[1]*1))
    }

    async function getSingleUserData(userId) {
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach(user => {
            if(user.id == userId){
                setPartner({ProfilePic : user.data().ProfilePic, DisplayName : user.data().DisplayName})
            } 
        })
    }

    getUsers()

    useEffect(() => {
        const unsub = onSnapshot(query (collection(db, 'Messages'), where("conversationId", "==", curConv)), (snap) => {
            setMsgs(sortStuff(snap));
          });
          return unsub;
    }, [])

    return (
        <div className="flex min-h-screen">
            <nav className="w-96 border-r-2 border-blue-500 h-screen flex flex-col justify-between sticky top-0">
                <div className="p-2">
                    {
                        users.map(user =>
                            <Link onClick={() => getConversation(user.id)} key={user.id} className="flex p-2 gap-2 items-center rounded border border-transparent hover:bg-blue-50 hover:border-blue-500 transition-all">
                                <img className="w-16 h-16 rounded-full border p-1 border-blue-500" src={user.ProfilePic} />
                                <p className="text-xl">{user.DisplayName}</p>
                            </Link>
                        )
                    }
                </div>
                <Link className="sticky bottom-0 flex items-center p-4 gap-2 border-t-2 border-blue-500 hover:bg-blue-50 transition-all" to="/settings">
                    <img className="w-12 h-12 rounded-full border p-1 border-blue-500" src={auth.user.ProfilePic} />
                    <p className="text-xl">{auth.user.DisplayName}</p>
                    <img className="ml-auto" src="/settings.svg" />
                </Link>
            </nav>
            <div className="flex flex-col flex-1">
                <div className="p-4">
                    <div className="max-h-[836px] overflow-scroll overflow-x-hidden">
                    {msgs.length < 1 ? <div className="text-xl p-1 mx-auto border-b-2 border-blue-500">Select a conversation to start chatting!</div> : msgs.map(m => (m.senderId == auth.auth.uid ?
                        <div className="flex p-2 gap-2 ml-auto w-2/3">
                            <div className="flex flex-col ml-auto">
                                <p className="text-sm font-bold ml-auto">{auth.user.DisplayName}</p>
                                <p className="bg-blue-200 p-2 rounded-lg mt-1">{m.message}</p>
                                <p className="text-sm ml-auto">{m.time}</p>
                            </div>
                            <img className="w-12 h-12 rounded-full border border-blue-500" src={auth.user.ProfilePic} />
                        </div>
                        :
                        <div className="flex p-2 gap-2 w-2/3">
                            <img className="w-12 h-12 rounded-full border border-blue-500" src={partner.ProfilePic} />
                            <div className="flex flex-col">
                                <p className="text-sm font-bold">{partner.DisplayName}</p>
                                <p className="bg-blue-200 p-2 rounded-lg mt-1">{m.message}</p>
                                <p className="text-sm">{m.time}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="mt-auto w-full p-4 flex gap-2">
                    <input className="bg-gray-50 border border-blue-300 rounded-full p-2 w-full hover:border-blue-500 transition-all" placeholder="Message" type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
                    <button className="bg-blue-300 hover:bg-blue-500 rounded-full transition-all p-4" onClick={() => sendMessage()}><img src="send.svg" /></button>
                </div>
            </div>
        </div>
    )
}