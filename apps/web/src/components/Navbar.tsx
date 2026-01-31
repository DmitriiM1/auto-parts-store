import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import Container from './Container'
import { useCart } from '../features/cart/CartContext'
import { useAuth } from '../features/auth/AuthContext'

const adminToken = import.meta.env.VITE_ADMIN_TOKEN

export default function Navbar() {
  const { count } = useCart()
  const { isAuthed, signOut, email } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-blue-400/90 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-9 items-center rounded-xl bg-black px-3 text-white">
              Dmitrii&apos;s shop
            </span>
            <span className="hidden sm:inline">Auto Parts Store</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Desktop auth controls */}
            <div className="hidden sm:flex items-center gap-3">
              {!isAuthed ? (
                <Link
                  to="/signin"
                  className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-80"
                >
                  Sign In
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  {email ? <span className="text-sm text-black/80">{email}</span> : null}
                  <button
                    type="button"
                    onClick={() => {
                      signOut()
                      setMenuOpen(false)
                    }}
                    className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-80"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center rounded-lg bg-black/90 px-3 py-2 text-white hover:opacity-80"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span className="text-sm font-semibold">Menu</span>
            </button>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center justify-center gap-10 pb-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'font-semibold text-black bg-white/70'
                  : 'text-black/80 hover:text-black hover:bg-white/60'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'font-semibold text-black bg-white/70'
                  : 'text-black/80 hover:text-black hover:bg-white/60'
              }`
            }
          >
            Products
          </NavLink>

          {adminToken && (
            <NavLink
              to="/admin/products"
              className={({ isActive }) =>
                `text-sm px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'font-semibold text-black bg-white/70'
                    : 'text-black/80 hover:text-black hover:bg-white/60'
                }`
              }
            >
              Admin Products
            </NavLink>
          )}

          {isAuthed && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-sm px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'font-semibold text-black bg-white/70'
                    : 'text-black/80 hover:text-black hover:bg-white/60'
                }`
              }
            >
              Cart{' '}
              {count > 0 && (
                <span className="ml-2 rounded-full bg-black text-white px-2 py-0.5 text-xs">
                  {count}
                </span>
              )}
            </NavLink>
          )}
        </nav>

        {/* Mobile nav panel */}
        {menuOpen && (
          <div className="sm:hidden border-t border-black/10 pb-4">
            <div className="px-4 pt-3 flex flex-col gap-2">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'font-semibold text-black bg-white/70'
                      : 'text-black/80 hover:text-black hover:bg-white/60'
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'font-semibold text-black bg-white/70'
                      : 'text-black/80 hover:text-black hover:bg-white/60'
                  }`
                }
              >
                Products
              </NavLink>

              {adminToken && (
                <NavLink
                  to="/admin/products"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'font-semibold text-black bg-white/70'
                        : 'text-black/80 hover:text-black hover:bg-white/60'
                    }`
                  }
                >
                  Admin Products
                </NavLink>
              )}

              {isAuthed && (
                <NavLink
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'font-semibold text-black bg-white/70'
                        : 'text-black/80 hover:text-black hover:bg-white/60'
                    }`
                  }
                >
                  Cart{' '}
                  {count > 0 && (
                    <span className="ml-2 rounded-full bg-black text-white px-2 py-0.5 text-xs">
                      {count}
                    </span>
                  )}
                </NavLink>
              )}

              {/* Mobile auth controls */}
              <div className="pt-2">
                {!isAuthed ? (
                  <Link
                    to="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-80"
                  >
                    Sign In
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    {email ? <div className="text-xs text-black/70">Signed in as {email}</div> : null}
                    <button
                      type="button"
                      onClick={() => {
                        signOut()
                        setMenuOpen(false)
                      }}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-80"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}