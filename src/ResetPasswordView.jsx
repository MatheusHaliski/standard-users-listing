export default function ResetPasswordView({  onClose, onBackToSignIn }) {

    return (
        <section className="auth-card">

        <header className="app-header">
            <div className="platforms-lockup">
                <img className="platforms-logo" src="/fr1-removebg-preview.png" alt="Frandelli Platforms logo" />
                <h2 className="platforms-title">Frandelli Platforms, Inc.</h2>
            </div>

            <div className="social-hero">
                <img className="social-logo" src="/fr1-removebg-preview.png" alt="Frandelli C. Social logo" />
                <p className="social-title">Frandelli C. Social</p>
                <p className="social-subtitle">Password Recovery solutions</p>
            </div>
        </header>
        <div className="modal modal--open" role="dialog" aria-modal="true">
            <div className="modal-card">
                <h3 className="social-title">Reset your password</h3>
                <p className="social-subtitle">
                    We will email a secure reset link to the address on file for your Frandelli C. Social account.
                </p>

                <label>
                    Email
                    <input type="email" placeholder="you@frandelli.social" />
                </label>
                <button className="secondary-btn" type="button" >
                    Send reset email
                </button>

                <div className="modal-actions">

                    {onBackToSignIn && (
                        <button className="link-btn" type="button" onClick={onBackToSignIn}>
                            Back to sign in
                        </button>
                    )}
                </div>
            </div>
        </div>

        </section>
    )
}
