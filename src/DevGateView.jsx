import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Keys } from "./guards.jsx";

const DEFAULT_DEV_PASSCODE = "dev123";

export default function DevGateView() {
    const navigate = useNavigate();
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");

    function onSubmit(e) {
        e.preventDefault();
        setError("");

        const expected = import.meta.env.VITE_DEV_GATE_PASSCODE || DEFAULT_DEV_PASSCODE;
        if (passcode.trim() === expected) {
            localStorage.setItem(Keys.DEV_UNLOCKED, "true");
            navigate("/welcome", { replace: true });
            return;
        }

        setError("Invalid dev access code.");
    }

    return (
        <section className="pin-view" id="dev-auth">
            <div className="pin-card">
                <div>
                    <h2>Developer Access</h2>
                    <p className="card-subtitle">Enter the temporary dev code to continue.</p>
                </div>

                <form className="pin-form" onSubmit={onSubmit}>
                    <label>
                        Dev code
                        <input
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder="Enter dev code"
                            autoComplete="one-time-code"
                        />
                    </label>

                    {error && <p className="pin-error">{error}</p>}

                    <button type="submit" className="primary-btn">
                        Continue
                    </button>
                </form>
            </div>
        </section>
    );
}
