import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import "./App.css"

import FiltersView from "./FiltersView.jsx"
import AuthView from "./AuthView.jsx"
import ResetPasswordView from "./ResetPasswordView.jsx"
import SignUpView from "./SignUpView.jsx"
import WelcomeLockedView from "./WelcomeLockedView.jsx"
import DevGateView from "./DevGateView.jsx"

import { RequireGoogle, RequirePin, RequireDev, Keys } from "./guards.jsx"

function RootReset() {
    React.useEffect(() => {
        localStorage.removeItem(Keys.AUTH_KEY)
        localStorage.removeItem(Keys.PIN_UNLOCKED)
        localStorage.removeItem(Keys.GOOGLE_AUTH)
        localStorage.removeItem(Keys.DEV_UNLOCKED)
    }, [])

    return <Navigate to="/dev-auth" replace />
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RootReset />} />

                <Route path="/dev-auth" element={<DevGateView />} />

                <Route
                    path="/welcome"
                    element={
                        <RequireDev>
                            <WelcomeLockedView />
                        </RequireDev>
                    }
                />

                <Route
                    path="/auth"
                    element={
                        <RequireDev>
                            <RequireGoogle>
                                <RequirePin>
                                    <AuthView />
                                </RequirePin>
                            </RequireGoogle>
                        </RequireDev>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <RequireDev>
                            <RequireGoogle>
                                <RequirePin>
                                    <SignUpView />
                                </RequirePin>
                            </RequireGoogle>
                        </RequireDev>
                    }
                />

                <Route
                    path="/reset"
                    element={
                        <RequireDev>
                            <RequireGoogle>
                                <RequirePin>
                                    <ResetPasswordView />
                                </RequirePin>
                            </RequireGoogle>
                        </RequireDev>
                    }
                />

                <Route
                    path="/filters"
                    element={
                        <RequireDev>
                            <RequireGoogle>
                                <RequirePin>
                                    <FiltersView />
                                </RequirePin>
                            </RequireGoogle>
                        </RequireDev>
                    }
                />

                <Route path="/signin" element={<Navigate to="/auth" replace />} />
                <Route path="/google" element={<Navigate to="/welcome" replace />} />
                <Route path="/pin" element={<Navigate to="/welcome" replace />} />

                <Route path="*" element={<Navigate to="/dev-auth" replace />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
