import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "./FirebaseSDK.jsx"; // ajuste o caminho
import { Keys } from "./guards.jsx";

export default function GoogleGate() {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                console.log("[GoogleGate] checking redirect result...");
                const result = await getRedirectResult(auth);

                console.log("[GoogleGate] redirect result:", result);

                if (result?.user) {
                    localStorage.setItem(Keys.GOOGLE_AUTH, "true");
                    console.log("[GoogleGate] logged in OK, flag saved");

                    navigate("/filters", { replace: true }); // sua rota pós-login
                    return;
                }

                // Se não tem redirect result, pode ser que o user já esteja logado
                if (auth.currentUser) {
                    localStorage.setItem(Keys.GOOGLE_AUTH, "true");
                    console.log("[GoogleGate] currentUser already exists, flag saved");
                    navigate("/filters", { replace: true });
                }
            } catch (e) {
                console.error("[GoogleGate] getRedirectResult error:", e);
                setError(String(e?.message || e));
            }
        })();
    }, [navigate]);

    async function onLogin() {
        setError("");
        try {
            console.log("[GoogleGate] starting redirect...");
            await signInWithRedirect(auth, googleProvider);
        } catch (e) {
            console.error("[GoogleGate] signInWithRedirect error:", e);
            setError(String(e?.message || e));
        }
    }

    return (
        <div style={{ maxWidth: 420, margin: "40px auto" }}>
            <h2>Google Login</h2>

            {error && (
                <div style={{ background: "#fee", border: "1px solid #f99", padding: 10 }}>
                    {error}
                </div>
            )}

            <button onClick={onLogin} style={{ padding: 12, width: "100%", marginTop: 12 }}>
                Entrar com Google
            </button>
        </div>
    );
}
