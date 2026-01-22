import { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Keys } from "./guards.jsx";

export default function GoogleGate() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.user) {
                    localStorage.setItem(Keys.GOOGLE_AUTH, "true");
                    navigate("/filters", { replace: true });
                }
            } catch (e) {
                setError(String(e?.message || e));
            }
        })();
    }, [navigate]);

    async function onClick() {
        setError("");
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (e) {
            setError(String(e?.message || e));
        }
    }

    return (
        <div>
            <button onClick={onClick}>Entrar com Google</button>
            {error && <pre>{error}</pre>}
        </div>
    );
}
