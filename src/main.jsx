import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

import GoogleGate from "./GoogleGate.jsx"
import PinView from "./PinView.jsx"
import FiltersView from "./FiltersView.jsx"

import { RequireGoogle, RequirePin } from "./guards.jsx"
import AuthView from "./AuthView.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/google" replace />} />

                <Route path="/google" element={<GoogleGate />} />

                <Route
                    path="/pin"
                    element={
                        <RequireGoogle>
                            <PinView />
                        </RequireGoogle>
                    }
                />
                {/* 🔑 AuthView agora é a primeira após PIN */}
                <Route
                    path="/signin"
                    element={
                        <RequireGoogle>
                            <RequirePin>
                                <AuthView />
                            </RequirePin>
                        </RequireGoogle>
                    }
                />
                <Route
                    path="/filters"
                    element={
                        <RequireGoogle>
                            <RequirePin>
                                <FiltersView />
                            </RequirePin>
                        </RequireGoogle>
                    }
                />

                <Route path="*" element={<Navigate to="/google" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
