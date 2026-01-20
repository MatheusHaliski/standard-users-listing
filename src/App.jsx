import './App.css'

const listings = [
  {
    id: 1,
    title: 'PulseCity Community Board',
    summary: 'Live neighborhood updates, local meetups, and verified posts from city leaders.',
    tag: 'Local',
  },
  {
    id: 2,
    title: 'Creator Spotlight Hub',
    summary: 'A space for rising creators to share reels, tips, and brand collaborations.',
    tag: 'Creators',
  },
  {
    id: 3,
    title: 'Wellness Circles',
    summary: 'Mindful routines, journaling prompts, and daily encouragement from peers.',
    tag: 'Wellness',
  },
  {
    id: 4,
    title: 'Startup Signal Rooms',
    summary: 'Pitch decks, investor AMA sessions, and cofounder matchmaking sessions.',
    tag: 'Business',
  },
  {
    id: 5,
    title: 'WorldLens Newsfeed',
    summary: 'Curated headlines with a focus on fact checks and diverse perspectives.',
    tag: 'News',
  },
  {
    id: 6,
    title: 'Studio Streams',
    summary: 'Live rooms for creators to host sessions, workshops, and community talks.',
    tag: 'Live',
  },
]

function App() {
  return (
    <div className="app">
      <section className="auth-view">
        <header className="app-header">
          <div className="logo-mark">SP</div>
          <div>
            <p className="brand-title">SignalPulse</p>
            <p className="brand-subtitle">Connect every voice. Share every moment.</p>
          </div>
        </header>
        <div className="auth-layout">
          <div className="auth-hero">
            <p className="hero-kicker">Welcome back</p>
            <h1 className="hero-title">
              SignalPulse is the social media platform where communities become conversations.
            </h1>
            <p className="hero-description">
              Manage your network, spark meaningful discussions, and keep every circle informed with
              a clean, professional feed.
            </p>
          </div>
          <div className="auth-card">
            <h2>Sign In</h2>
            <p className="card-subtitle">Access your verified company account.</p>
            <form className="auth-form">
              <label>
                Work email
                <input type="email" placeholder="name@signalpulse.com" />
              </label>
              <label>
                Password
                <input type="password" placeholder="••••••••" />
              </label>
              <button type="submit" className="primary-btn">
                Sign In
              </button>
              <button type="button" className="secondary-btn">
                Go to Sign Up
              </button>
              <a className="link" href="#forgot">
                Forgot my password
              </a>
            </form>
          </div>
        </div>
      </section>

      <section className="listing-view">
        <header className="listing-header">
          <div className="listing-brand">
            <div className="logo-mark">SP</div>
            <div>
              <p className="brand-title">SignalPulse</p>
              <p className="brand-subtitle">Company Social Console</p>
            </div>
          </div>
          <div className="user-meta">
            <div>
              <p className="user-name">Ariana Patel</p>
              <p className="user-role">Community Operations</p>
            </div>
            <button className="tiny-btn" type="button">
              Sign Out
            </button>
          </div>
        </header>

        <div className="filter-bar">
          <input type="text" placeholder="Search community listings" />
          <select>
            <option>Status: All</option>
            <option>Active</option>
            <option>Paused</option>
          </select>
          <select>
            <option>Audience: Global</option>
            <option>Local</option>
            <option>Regional</option>
          </select>
          <select>
            <option>Category: Any</option>
            <option>Creators</option>
            <option>Business</option>
            <option>Wellness</option>
          </select>
          <select>
            <option>Engagement: High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select>
            <option>Sort: Newest</option>
            <option>Oldest</option>
            <option>Trending</option>
          </select>
        </div>

        <div className="card-grid">
          {listings.map((listing) => (
            <article className="listing-card" key={listing.id}>
              <div className="card-image">
                <span>{listing.tag}</span>
              </div>
              <div className="card-body">
                <h3>{listing.title}</h3>
                <p>{listing.summary}</p>
                <button className="ghost-btn" type="button">
                  View analytics
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
