import {Keys} from "./guards.jsx";
import React from "react";
import { useNavigate } from "react-router-dom"
export default function SignUpView() {
    const navigate = useNavigate()

    return (
        <section className="signup-view" id="signup">
            <header className="app-header">
                <div className="platforms-lockup">
                    <img className="platforms-logo" src="/fr1-removebg-preview.png" alt="Frandelli Platforms logo" />
                    <h2 className="platforms-title">Frandelli Platforms, Inc.</h2>
                </div>

                <div className="social-hero">
                    <img className="social-logo" src="/fr1-removebg-preview.png" alt="Frandelli C. Social logo" />
                    <p className="social-title">Frandelli C. Social</p>
                    <p className="social-subtitle">New account setup</p>
                </div>
            </header>

            <div className="signup-card">
                <div>
                    <h2>Sign Up</h2>
                    <p className="card-subtitle">Join the Frandelli Platforms social directory.</p>
                </div>
                <form className="signup-form">
                    <label>
                        Full name
                        <input type="text" placeholder="Type your name" />
                    </label>
                    <label>
                        Email
                        <input type="email" placeholder="name@frandelli.social" />
                    </label>
                    <label>
                        Password
                        <input type="password" placeholder="Create a secure password" />
                    </label>
                    <label>
                        Birthdate
                        <input type="date" />
                    </label>
                    <label>
                        Country
                        <input type="text" placeholder="Country" />
                    </label>
                    <label>
                        State
                        <input type="text" placeholder="State" />
                    </label>
                    <label>
                        City
                        <input type="text" placeholder="City" />
                    </label>
                    <label>
                        Civil status
                        <select>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Empresa</option>
                        </select>
                    </label>
                    <label>
                        Tipo de conta
                        <select>
                            <option>criador</option>
                            <option>pessoa</option>
                            <option>marca</option>
                            <option>empresa</option>
                        </select>
                    </label>
                    <label>
                        Photo URL
                        <input type="text" placeholder="https://" />
                    </label>
                    <button type="submit" className="primary-btn">
                        Create account
                        </button>
                        <button
                            className="tiny-btn"
                            type="button"
                            onClick={() => {
                                localStorage.removeItem(Keys.AUTH_KEY) // logout
                                navigate("/signin", { replace: true })
                            }}
                        >
                            Back
                        </button>
                </form>
            </div>
        </section>

    )
}
