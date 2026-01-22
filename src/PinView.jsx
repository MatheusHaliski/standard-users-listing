// src/PinView.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { Keys } from "./guards.jsx";

const DEFAULT_PIN = "0601";
const DEFAULT_REDIRECT = "/auth";

export default function PinView({ redirectTo = DEFAULT_REDIRECT, disabled = false, inline = false }) {
    const navigate = useNavigate();

    const [pin, setPin] = useState("");
    const [pinHash, setPinHash] = useState(() => localStorage.getItem(Keys.PIN_HASH) || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const pinSeed = useMemo(() => import.meta.env.VITE_PIN_CODE || DEFAULT_PIN, []);

    useEffect(() => {
        const unlocked = localStorage.getItem(Keys.PIN_UNLOCKED) === "true";
        if (unlocked) {
            navigate(redirectTo, { replace: true });
        }
    }, [navigate, redirectTo]);

    useEffect(() => {
        let isMounted = true;

        async function ensureHashedPin() {
            if (pinHash) return;
            setIsLoading(true);
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(pinSeed, salt);
                localStorage.setItem(Keys.PIN_HASH, hash);
                if (isMounted) setPinHash(hash);
            } catch (e) {
                if (isMounted) setError("Unable to initialize the PIN hash.");
            } finally {
                if (isMounted) setIsLoading(false);
            }
        }

        ensureHashedPin();

        return () => {
            isMounted = false;
        };
    }, [pinHash, pinSeed]);

    async function onSubmit(e) {
        e.preventDefault();
        setError("");

        if (disabled) {
            setError("Complete Google Sign-In before unlocking the PIN.");
            return;
        }

        const cleaned = pin.trim();
        if (cleaned.length < 4) {
            setError("PIN deve ter ao menos 4 dígitos.");
            return;
        }

        if (!pinHash) {
            setError("PIN ainda não está pronto. Tente novamente.");
            return;
        }

        const ok = await bcrypt.compare(cleaned, pinHash);
        if (!ok) {
            setError("PIN incorreto.");
            return;
        }

        localStorage.setItem(Keys.PIN_UNLOCKED, "true");
        navigate(redirectTo, { replace: true });
    }

    const content = (
        <>
            <div>
                <h3>Unlock with PIN</h3>
                <p className="card-subtitle">Enter the private access PIN to continue.</p>
            </div>

            <form className="pin-form" onSubmit={onSubmit}>
                <label>
                    PIN
                    <input
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Digite o PIN"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        disabled={disabled}
                    />
                </label>

                {error && <p className="pin-error">{error}</p>}

                <button type="submit" className="primary-btn" disabled={isLoading || disabled}>
                    {isLoading ? "Verifying..." : "Unlock"}
                </button>
            </form>
        </>
    );

    if (inline) {
        return content;
    }

    return (
        <section className="pin-view">
            <div className="pin-card">{content}</div>
        </section>
    );
}
