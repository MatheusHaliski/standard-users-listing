import React, { useEffect, useState } from "react";
import { signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "./FirebaseSDK.jsx";
import { Keys } from "./guards.jsx";
import PinView from "./PinView.jsx";

export default function WelcomeLockedView() {
    const [googleReady, setGoogleReady] = useState(false);
    const [googleError, setGoogleError] = useState("");

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem(Keys.GOOGLE_AUTH, "true");
                setGoogleReady(true);
            } else {
                localStorage.removeItem(Keys.GOOGLE_AUTH);
                setGoogleReady(false);
            }
        });

        return () => unsub();
    }, []);

    async function onLogin() {
        setGoogleError("");
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (e) {
            setGoogleError(String(e?.message || e));
        }
    }

    return (
        <section className="pin-view" id="welcome">
            <header className="app-header">
                <div className="platforms-lockup">
                    <img className="platforms-logo" src="/fr1-removebg-preview.png" alt="Frandelli Platforms logo" />
                    <h2 className="platforms-title">Frandelli Platforms, Inc.</h2>
                </div>

                <div className="social-hero">
                    <img className="social-logo" src="/fr1-removebg-preview.png" alt="Frandelli C. Social logo" />
                    <p className="social-title">Frandelli C. Social</p>
                    <p className="social-subtitle">Secure access to password recovery.</p>
                </div>
            </header>

            <div className="auth-layout">
                <div className="auth-hero">
                    <p className="hero-kicker">Welcome</p>
                    <h1 className="hero-title">Unlock the directory</h1>
                    <p className="hero-description">
                        Sign in with Google and confirm your private PIN before accessing the Frandelli C. Social
                        directory.
                    </p>
                </div>

                <div className="pin-card">
                    <div>
                        <h2>Welcome lock</h2>
                        <p className="card-subtitle">Both Google Sign-In and PIN are required.</p>
                    </div>

                    {googleError && <p className="pin-error">{googleError}</p>}
                    <PinView
                        inline
                        redirectTo="/auth"
                        disabled={!googleReady}
                        sharedSignIn
                        sharedReady={googleReady}
                        onSharedSignIn={onLogin}
                    />
                </div>
            </div>
        </section>
    );
}
