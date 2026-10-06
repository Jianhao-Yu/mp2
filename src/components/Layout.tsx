import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="nav-wrap">
          <Link className="brand" to="/" aria-label="Taste of China home">
            <span className="brand-mark">TC</span>
            <span>
              <strong>Taste of China</strong>
              <small>CHINESE FOOD GUIDE</small>
            </span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Meal List
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Gallery
            </NavLink>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div>
          <span className="footer-seal">TC</span>
          <div>
            <strong>Taste of China</strong>
            <p>Explore Chinese meals and recipes.</p>
          </div>
        </div>
        <p>
          Recipe data from{' '}
          <a href="https://www.themealdb.com/" target="_blank" rel="noreferrer">
            TheMealDB
          </a>
        </p>
      </footer>
    </div>
  )
}

export default Layout
