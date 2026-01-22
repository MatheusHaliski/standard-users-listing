import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

import FiltersView from "./FiltersView.jsx"
import AuthView from "./AuthView.jsx"
import ResetPasswordView from "./ResetPasswordView.jsx"
import SignUpView from "./SignUpView.jsx"
import WelcomeLockedView from "./WelcomeLockedView.jsx"

import { RequireGoogle, RequirePin } from "./guards.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />

                <Route path="/welcome" element={<WelcomeLockedView />} />

                <Route
                    path="/auth"
                    element={
                        <RequireGoogle>
                            <RequirePin>
                                <AuthView />
                            </RequirePin>
                        </RequireGoogle>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <RequireGoogle>
                            <RequirePin>
                                <SignUpView />
                            </RequirePin>
                        </RequireGoogle>
                    }
                />

                <Route
                    path="/reset"
                    element={
                        <RequireGoogle>
                            <RequirePin>
                                <ResetPasswordView />
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

                <Route path="/signin" element={<Navigate to="/auth" replace />} />
                <Route path="/google" element={<Navigate to="/welcome" replace />} />
                <Route path="/pin" element={<Navigate to="/welcome" replace />} />

                <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
