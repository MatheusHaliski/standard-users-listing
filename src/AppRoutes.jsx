import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { PinProtected, AuthProtected } from "./guards.jsx"

import PinView from "./PinView.jsx"
import AuthView from "./AuthView.jsx"
import SignUpView from "./SignUpView.jsx"
import ResetPasswordView from "./ResetPasswordView.jsx"
import FiltersView from "./FiltersView.jsx"

export default function App() {
    return (
        <Routes>
            {/* PIN sempre acessível */}
            <Route path="/pin" element={<PinView />} />

            {/* Tudo abaixo exige PIN */}
            <Route
                path="/signin"
                element={
                    <PinProtected>
                        <AuthView />
                    </PinProtected>
                }
            />

            <Route
                path="/signup"
                element={
                    <PinProtected>
                        <SignUpView />
                    </PinProtected>
                }
            />

            <Route
                path="/reset"
                element={
                    <PinProtected>
                        <ResetPasswordView />
                    </PinProtected>
                }
            />

            {/* Filters exige PIN + autenticação */}
            <Route
                path="/filters"
                element={
                    <PinProtected>
                        <AuthProtected>
                            <FiltersView status={status} users={users} />
                        </AuthProtected>
                    </PinProtected>
                }
            />

            {/* Default */}
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
    )
}
