import React from "react"
import { useNavigate } from "react-router-dom"
import { Keys } from "./guards.jsx"

const fallbackPhoto =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%23ff7a59"/><stop offset="1" stop-color="%239b5cff"/></linearGradient></defs><rect width="400" height="260" fill="url(%23g)"/><text x="50%" y="55%" font-size="40" fill="white" font-family="Arial" text-anchor="middle">FC</text></svg>'

export default function FiltersView({ status = "loading", users = [] }) {
    const navigate = useNavigate()

    return (
        <section className="listing-view">
            <header className="listing-header">
                <div className="listing-brand">
                    <div className="logo-mark">
                        <img className="logo-image" src="/fr1-removebg-preview.png" alt="Frandelli logo" />
                    </div>
                    <div>
                        <p className="brand-title">Frandelli C. Social</p>
                        <p className="brand-subtitle">FSusercontrol directory</p>
                    </div>
                </div>

                <div className="user-meta">
                    <div>
                        <p className="user-name">Giulia Frandelli</p>
                        <p className="user-role">Platform Admin</p>
                    </div>

                    <button
                        className="tiny-btn"
                        type="button"
                        onClick={() => {
                            localStorage.removeItem(Keys.AUTH_KEY)
                            localStorage.removeItem(Keys.PIN_UNLOCKED)
                            localStorage.removeItem(Keys.GOOGLE_AUTH)
                            navigate("/auth", { replace: true })
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="filter-bar">
                <input type="text" placeholder="Filter by name" />
                <input type="text" placeholder="Filter by email" />

                <select defaultValue="Birthdate">
                    <option value="Birthdate" disabled>
                        Birthdate
                    </option>
                    <option>Before 1990</option>
                    <option>1990 - 2000</option>
                    <option>After 2000</option>
                </select>

                <select defaultValue="Country">
                    <option value="Country" disabled>
                        Country
                    </option>
                    <option>Brazil</option>
                    <option>Portugal</option>
                    <option>USA</option>
                </select>

                <select defaultValue="State">
                    <option value="State" disabled>
                        State
                    </option>
                    <option>São Paulo</option>
                    <option>Lisbon</option>
                    <option>California</option>
                </select>

                <select defaultValue="City">
                    <option value="City" disabled>
                        City
                    </option>
                    <option>Campinas</option>
                    <option>Lisboa</option>
                    <option>San Diego</option>
                </select>

                <select defaultValue="Photo">
                    <option value="Photo" disabled>
                        Photo
                    </option>
                    <option>Has photo</option>
                    <option>No photo</option>
                </select>

                <select defaultValue="Password">
                    <option value="Password" disabled>
                        Password
                    </option>
                    <option>Set</option>
                    <option>Needs reset</option>
                </select>

                <select defaultValue="Civil status">
                    <option value="Civil status" disabled>
                        Civil status
                    </option>
                    <option>Single</option>
                    <option>Married</option>
                    <option>Empresa</option>
                </select>

                <select defaultValue="Tipo de conta">
                    <option value="Tipo de conta" disabled>
                        Tipo de conta
                    </option>
                    <option>criador</option>
                    <option>pessoa</option>
                    <option>marca</option>
                    <option>empresa</option>
                </select>
            </div>

            {status === "loading" && (
                <div className="status-message">
                    <h3>Loading FSusercontrol records</h3>
                    <p>Connecting to your Firebase database and syncing users.</p>
                </div>
            )}

            {status === "error" && (
                <div className="status-message status-error">
                    <h3>Unable to load users</h3>
                    <p>Add your Firebase project ID and API key to view FSusercontrol data.</p>
                </div>
            )}

            {status === "ready" && users.length === 0 && (
                <div className="status-message">
                    <h3>No users found</h3>
                    <p>FSusercontrol is currently empty. Add users to see them here.</p>
                </div>
            )}

            {status === "ready" && users.length > 0 && (
                <div className="card-grid">
                    {users.map((user) => (
                        <article className="listing-card" key={user.id}>
                            <div
                                className="card-image"
                                style={{
                                    backgroundImage: `url(${user.photo !== "—" ? user.photo : fallbackPhoto})`,
                                }}
                            >
                                <span>{user.accountType}</span>
                            </div>

                            <div className="card-body">
                                <div className="card-header">
                                    <h3>{user.name}</h3>
                                    <p>{user.email}</p>
                                </div>

                                <div className="card-details">
                                    <p>
                                        <strong>Birthdate:</strong> {user.birthdate}
                                    </p>
                                    <p>
                                        <strong>Country:</strong> {user.country}
                                    </p>
                                    <p>
                                        <strong>State:</strong> {user.state}
                                    </p>
                                    <p>
                                        <strong>City:</strong> {user.city}
                                    </p>
                                    <p>
                                        <strong>Civil status:</strong> {user.civilStatus}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}
