import { useEffect, useState } from "react"
import App from "./App.jsx"
import {fetchUsersFS} from "./FirebaseSDK.jsx";

export default function AppWrapper() {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState("loading")

    useEffect(() => {
        if (import.meta.env.DEV) {
            localStorage.setItem("frandelli_pin_unlocked", "false")
        }
        const fetchUsers = async () => {
            try {
                setStatus("loading")

                const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
                const apiKey = import.meta.env.VITE_FIREBASE_API_KEY

                const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/FSusercontrol?key=${apiKey}`
                const res = await fetch(url)
                const data = await res.json()

                const records = (data.documents || []).map((doc) => ({
                    id: doc.name.split("/").pop(),
                    name: doc.fields?.name?.stringValue ?? "—",
                    email: doc.fields?.email?.stringValue ?? "—",
                    country: doc.fields?.country?.stringValue ?? "—",
                    state: doc.fields?.state?.stringValue ?? "—",
                    city: doc.fields?.city?.stringValue ?? "—",
                    birthdate: doc.fields?.birthdate?.stringValue ?? "—",
                    civilStatus: doc.fields?.["civil status"]?.stringValue ?? "—",
                    accountType: doc.fields?.["tipo de conta"]?.stringValue ?? "—",
                    photo: doc.fields?.photo?.stringValue ?? "—",
                }))

                setUsers(records)
                setStatus("ready")
            } catch {
                setStatus("error")
            }
        }
        console.log("PROJECT:", import.meta.env.VITE_FIREBASE_PROJECT_ID)
        console.log("KEY:", import.meta.env.VITE_FIREBASE_API_KEY)

        fetchUsersFS()
    }, [])

    return <App users={users} status={status} />
}
