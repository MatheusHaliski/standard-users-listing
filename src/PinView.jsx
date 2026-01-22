// src/PinView.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import {Keys} from "./guards.jsx";

const DEFAULT_DEV_PIN = "0601"; // só usado no fallback DEV (opcional)

export default function PinView() {
    const navigate = useNavigate();

    const [pin, setPin] = useState("");
    const [serverHash, setServerHash] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const backendUrl = useMemo(() => {
        const raw = import.meta.env.VITE_PIN_BACKEND_URL || "http://localhost:5174";
        // remove trailing slash
        return raw.replace(/\/+$/, "");
    }, []);

    const isDev = import.meta.env.DEV;

    useEffect(() => {
        // Se já está desbloqueado, não fica preso aqui.
        const unlocked = localStorage.getItem(Keys.PIN_UNLOCKED) === "true";
        if (unlocked) navigate("/google", { replace: true });
    }, [navigate]);

    async function fetchPinHash() {
        setError("");
        setIsLoading(true);

        try {
            const url = `${backendUrl}/pin-hash`;
            console.log("[PIN] Fetching:", url);

            const res = await fetch(url, {
                method: "GET",
                headers: { Accept: "application/json" },
            });

            const contentType = res.headers.get("content-type") || "";
            const text = await res.text();

            if (!res.ok) {
                // tenta mostrar resposta do servidor
                throw new Error(
                    `PIN backend respondeu ${res.status} ${res.statusText}. Body: ${text.slice(0, 300)}`
                );
            }

            if (!contentType.includes("application/json")) {
                throw new Error(
                    `PIN backend não retornou JSON (content-type=${contentType}). Body: ${text.slice(0, 300)}`
                );
            }

            const data = JSON.parse(text);
            if (!data?.hash || typeof data.hash !== "string") {
                throw new Error(`Resposta inválida do /pin-hash: ${text.slice(0, 300)}`);
            }

            setServerHash(data.hash);
            console.log("[PIN] Hash loaded OK");
        } catch (e) {
            console.error("[PIN] fetchPinHash error:", e);
            setServerHash(null);
            setError(String(e?.message || e));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        (function () {
            const original = localStorage.setItem.bind(localStorage);
            localStorage.setItem = function (k, v) {
                if (k === "frandelli_pin_unlocked") {
                    console.log("[DEBUG setItem frandelli_pin_unlocked]", v);
                    console.trace();
                }
                return original(k, v);
            };
            console.log("DEBUG localStorage.setItem hook instalado");
        })();

        fetchPinHash();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backendUrl]);

    async function onSubmit(e) {
        e.preventDefault();
        setError("");

        const cleaned = pin.trim();
        if (cleaned.length < 4) {
            setError("PIN deve ter ao menos 4 dígitos.");
            return;
        }

        // Caso 1: hash veio do servidor, valida com bcrypt
        if (serverHash) {
            const ok = await bcrypt.compare(cleaned, serverHash);
            if (!ok) {
                setError("PIN incorreto.");
                return;
            }

            localStorage.setItem(Keys.PIN_UNLOCKED, "true");
            console.log("[PIN] Unlocked OK (serverHash)");
            navigate("/google", { replace: true });
            return;
        }

        // Caso 2 (OPCIONAL): fallback DEV — útil quando backend não está rodando
        // Se você NÃO quiser isso, apague este bloco.
        if (isDev) {
            if (cleaned === DEFAULT_DEV_PIN) {
                localStorage.setItem(Keys.PIN_UNLOCKED, "true");
                console.log("[PIN] Unlocked OK (DEV fallback)");
                navigate("/google", { replace: true });
                return;
            }
            setError("PIN incorreto (DEV fallback).");
            return;
        }

        // Caso 3: produção sem hash => não libera
        setError(
            "Não foi possível validar o PIN porque o backend do PIN não respondeu. Verifique VITE_PIN_BACKEND_URL e o endpoint /pin-hash."
        );
    }

    return (
        <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
            <h2>PIN</h2>

            <p style={{ fontSize: 13, opacity: 0.8 }}>
                Backend: <code>{backendUrl}</code>
                <br />
                Hash:{" "}
                {serverHash ? (
                    <span>carregado ✅</span>
                ) : isLoading ? (
                    <span>carregando…</span>
                ) : (
                    <span>não carregado ❌</span>
                )}
            </p>

            {!!error && (
                <div style={{ background: "#fee", border: "1px solid #f99", padding: 10, marginBottom: 12 }}>
                    <b>Erro:</b>
                    <div style={{ whiteSpace: "pre-wrap" }}>{error}</div>
                    {!serverHash && (
                        <button type="button" onClick={fetchPinHash} style={{ marginTop: 8 }}>
                            Tentar novamente
                        </button>
                    )}
                </div>
            )}

            <form onSubmit={onSubmit}>
                <input
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Digite o PIN"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    style={{ width: "100%", padding: 12, fontSize: 16 }}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    style={{ width: "100%", padding: 12, marginTop: 12 }}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
