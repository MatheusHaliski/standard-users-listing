import './App.css'

const users = [
  {
    id: 1,
    name: 'Sofia Martins',
    birthdate: '1994-03-12',
    country: 'Brazil',
    state: 'São Paulo',
    city: 'Campinas',
    photo:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%23ff7a59"/><stop offset="1" stop-color="%239b5cff"/></linearGradient></defs><rect width="400" height="260" fill="url(%23g)"/><text x="50%" y="55%" font-size="44" fill="white" font-family="Arial" text-anchor="middle">SM</text></svg>',
    password: '********',
    email: 'sofia@frandelli.social',
    civilStatus: 'Single',
    accountType: 'criador',
  },
  {
    id: 2,
    name: 'Lucas Ortega',
    birthdate: '1988-11-05',
    country: 'Portugal',
    state: 'Lisbon',
    city: 'Lisboa',
    photo:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><defs><linearGradient id="g" x1="1" x2="0" y1="0" y2="1"><stop stop-color="%2303c988"/><stop offset="1" stop-color="%230042ff"/></linearGradient></defs><rect width="400" height="260" fill="url(%23g)"/><text x="50%" y="55%" font-size="44" fill="white" font-family="Arial" text-anchor="middle">LO</text></svg>',
    password: '********',
    email: 'lucas@frandelli.social',
    civilStatus: 'Married',
    accountType: 'marca',
  },
  {
    id: 3,
    name: 'Maya Kim',
    birthdate: '1999-07-21',
    country: 'USA',
    state: 'California',
    city: 'San Diego',
    photo:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><defs><linearGradient id="g" x1="0" x2="1" y1="1" y2="0"><stop stop-color="%23ffd166"/><stop offset="1" stop-color="%23ff006e"/></linearGradient></defs><rect width="400" height="260" fill="url(%23g)"/><text x="50%" y="55%" font-size="44" fill="white" font-family="Arial" text-anchor="middle">MK</text></svg>',
    password: '********',
    email: 'maya@frandelli.social',
    civilStatus: 'Single',
    accountType: 'pessoa',
  },
  {
    id: 4,
    name: 'Frandelli Platforms',
    birthdate: '2012-09-01',
    country: 'Brazil',
    state: 'Rio de Janeiro',
    city: 'Rio de Janeiro',
    photo:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%2348cae4"/><stop offset="1" stop-color="%230077b6"/></linearGradient></defs><rect width="400" height="260" fill="url(%23g)"/><text x="50%" y="55%" font-size="38" fill="white" font-family="Arial" text-anchor="middle">FP</text></svg>',
    password: '********',
    email: 'hello@frandelli.social',
    civilStatus: 'Empresa',
    accountType: 'empresa',
  },
]

function App() {
  return (
    <div className="app">
      <section className="auth-view" id="signin">
        <header className="app-header">
          <div className="logo-mark">FC</div>
          <div>
            <p className="brand-title">Frandelli C. Social</p>
            <p className="brand-subtitle">by Frandelli Platforms</p>
          </div>
        </header>
        <div className="auth-layout">
          <div className="auth-hero">
            <p className="hero-kicker">Welcome to Frandelli C. Social</p>
            <h1 className="hero-title">
              Build curated communities with the signature Frandelli social experience.
            </h1>
            <p className="hero-description">
              Bring together creators, people, brands, and companies with trusted account controls
              and the clean, modern visibility your teams need.
            </p>
          </div>
          <div className="auth-card">
            <h2>Sign In</h2>
            <p className="card-subtitle">Access your Frandelli C. Social control room.</p>
            <form className="auth-form">
              <label>
                Email
                <input type="email" placeholder="you@frandelli.social" />
              </label>
              <label>
                Password
                <input type="password" placeholder="••••••••" />
              </label>
              <button type="submit" className="primary-btn">
                Sign In
              </button>
              <a className="secondary-btn" href="#signup">
                Create new account
              </a>
              <a className="link" href="#reset-modal">
                Forgot my password
              </a>
            </form>
          </div>
        </div>
      </section>

      <section className="signup-view" id="signup">
        <header className="app-header">
          <div className="logo-mark">FC</div>
          <div>
            <p className="brand-title">Frandelli C. Social</p>
            <p className="brand-subtitle">New account setup</p>
          </div>
        </header>
        <div className="signup-card">
          <div>
            <h2>Sign Up</h2>
            <p className="card-subtitle">Join the Frandelli Platforms social directory.</p>
          </div>
          <form className="signup-form">
            <label>
              Full name
              <input type="text" placeholder="Type your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="name@frandelli.social" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Create a secure password" />
            </label>
            <label>
              Birthdate
              <input type="date" />
            </label>
            <label>
              Country
              <input type="text" placeholder="Country" />
            </label>
            <label>
              State
              <input type="text" placeholder="State" />
            </label>
            <label>
              City
              <input type="text" placeholder="City" />
            </label>
            <label>
              Civil status
              <select>
                <option>Single</option>
                <option>Married</option>
                <option>Empresa</option>
              </select>
            </label>
            <label>
              Tipo de conta
              <select>
                <option>criador</option>
                <option>pessoa</option>
                <option>marca</option>
                <option>empresa</option>
              </select>
            </label>
            <label>
              Photo URL
              <input type="text" placeholder="https://" />
            </label>
            <button type="submit" className="primary-btn">
              Create account
            </button>
            <a className="secondary-btn" href="#signin">
              Back to sign in
            </a>
          </form>
        </div>
      </section>

      <section className="listing-view">
        <header className="listing-header">
          <div className="listing-brand">
            <div className="logo-mark">FC</div>
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
            <button className="tiny-btn" type="button">
              Sign Out
            </button>
          </div>
        </header>

        <div className="filter-bar">
          <input type="text" placeholder="Filter by name" />
          <input type="text" placeholder="Filter by email" />
          <select>
            <option>Birthdate</option>
            <option>Before 1990</option>
            <option>1990 - 2000</option>
            <option>After 2000</option>
          </select>
          <select>
            <option>Country</option>
            <option>Brazil</option>
            <option>Portugal</option>
            <option>USA</option>
          </select>
          <select>
            <option>State</option>
            <option>São Paulo</option>
            <option>Lisbon</option>
            <option>California</option>
          </select>
          <select>
            <option>City</option>
            <option>Campinas</option>
            <option>Lisboa</option>
            <option>San Diego</option>
          </select>
          <select>
            <option>Photo</option>
            <option>Has photo</option>
            <option>No photo</option>
          </select>
          <select>
            <option>Password</option>
            <option>Set</option>
            <option>Needs reset</option>
          </select>
          <select>
            <option>Civil status</option>
            <option>Single</option>
            <option>Married</option>
            <option>Empresa</option>
          </select>
          <select>
            <option>Tipo de conta</option>
            <option>criador</option>
            <option>pessoa</option>
            <option>marca</option>
            <option>empresa</option>
          </select>
        </div>

        <div className="card-grid">
          {users.map((user) => (
            <article className="listing-card" key={user.id}>
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${user.photo})`,
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
                  <p>
                    <strong>Password:</strong> {user.password}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="modal" id="reset-modal" role="dialog" aria-modal="true">
        <div className="modal-card">
          <h3>Reset your password</h3>
          <p>
            We will email a secure reset link to the address on file for your Frandelli C. Social
            account.
          </p>
          <label>
            Email
            <input type="email" placeholder="you@frandelli.social" />
          </label>
          <button className="primary-btn" type="button">
            Send reset email
          </button>
          <a className="modal-close" href="#signin">
            Close
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
