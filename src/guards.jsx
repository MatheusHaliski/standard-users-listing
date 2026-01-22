// src/guards.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const Keys = {
    PIN_UNLOCKED: "frandelli_pin_unlocked",
    GOOGLE_AUTH: "frandelli_google_auth",
    DEV_UNLOCKED: "frandelli_dev_unlocked",
};

export function RequirePin({ children }) {
    const location = useLocation();
    const ok = localStorage.getItem(Keys.PIN_UNLOCKED) === "true";
    if (!ok) return <Navigate to="/pin" replace state={{ from: location.pathname }} />;
    return children;
}

export function RequireGoogle({ children }) {
    const location = useLocation();
    const ok = localStorage.getItem(Keys.GOOGLE_AUTH) === "true";
    if (!ok) return <Navigate to="/google" replace state={{ from: location.pathname }} />;
    return children;
}

// opcional: DEV unlock
export function RequireDev({ children }) {
    const ok = localStorage.getItem(Keys.DEV_UNLOCKED) === "true";
    return ok ? children : <Navigate to="/pin" replace />;
}
