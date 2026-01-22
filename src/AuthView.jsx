import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Keys } from "./guards.jsx"

export default function AuthView() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    return (
        <section className="auth-view" id="signin">
            <header className="app-header">
                <div className="platforms-lockup">
                    <img className="platforms-logo" src="/fr1-removebg-preview.png" alt="Frandelli Platforms logo" />
                    <h2 className="platforms-title">Frandelli Platforms, Inc.</h2>
                </div>

                <div className="social-hero">
                    <img className="social-logo" src="/fr1-removebg-preview.png" alt="Frandelli C. Social logo" />
                    <p className="social-title">Frandelli C. Social</p>
                    <p className="social-subtitle">Password Recovery solutions</p>
                </div>
            </header>

            <form
                className="auth-form"
                onSubmit={async (e) => {
                    e.preventDefault()
                    setError("")

                    // TODO: aqui entra sua autenticação real (Firebase etc.)
                    // DEMO: se senha for mat123, autentica
                    if (password === "mat123") {
                        localStorage.setItem(Keys.AUTH_KEY, "true")
                        navigate("/filters")
                        return
                    }

                    setError("Sign in failed")
                }}
            >
                <label>
                    Email
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                </label>

                <label>
                    Password
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                </label>

                {error && <p className="pin-error">{error}</p>}

                <button type="submit" className="primary-btn">
                    Sign In
                </button>

                {/* ✅ navega por rota */}
                <button type="button" className="secondary-btn" onClick={() => navigate("/signup")}>
                    Create new account
                </button>

                <button type="button" className="secondary-btn" onClick={() => navigate("/reset")}>
                    Forgot my password
                </button>
            </form>
        </section>
    )
}
