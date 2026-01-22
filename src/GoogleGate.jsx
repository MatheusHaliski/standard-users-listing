import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "./FirebaseSDK.jsx";
import { Keys } from "./guards.jsx";

export default function GoogleGate() {
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) return;

            // marca auth ok
            localStorage.setItem(Keys.GOOGLE_AUTH, "true");

            // ✅ só redireciona automaticamente se você está no gate (/google)
            // ou se veio de uma rota protegida
            const from = location.state?.from;
            if (location.pathname === "/google") {
                navigate(from || "/filters", { replace: true });
            }
        });

        return () => unsub();
    }, [navigate, location.pathname, location.state]);

    async function onLogin() {
        setError("");
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (e) {
            setError(String(e?.message || e));
        }
    }

    return (
        <div>
            <button onClick={onLogin}>Entrar com Google</button>
            {error && <pre>{error}</pre>}
        </div>
    );
}
