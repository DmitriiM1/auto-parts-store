import { Link, NavLink } from 'react-router-dom'
import Container from './Container'

export default function Navbar() {
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              AP
            </span>
            <span>Auto Parts Store</span>
          </Link>

          <nav className="flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm ${isActive ? 'font-semibold text-black' : 'text-gray-600 hover:text-black'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-sm ${isActive ? 'font-semibold text-black' : 'text-gray-600 hover:text-black'}`
              }
            >
              Products
            </NavLink>

            <button className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Sign in
            </button>
          </nav>
        </div>
      </Container>
    </header>
  )
}