import { Link, NavLink } from 'react-router-dom'
import Container from './Container'
import '../index.css'

export default function Navbar() {
    return (
        <header className="">
            <Container>
                <div className="flex h-16 bg-blue-400 backdrop-blur items-center p-10 justify-between">
                    <Link to="/" className="flex items-center gap-7 font-semibold">
                        <span className="flex h-9 items-center p-4 rounded-xl bg-black text-white">
                            Dmitrii's shop
                        </span>
                        <span>Auto Parts Store</span>
                    </Link>

                    <button className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                        Sign in
                    </button>

                </div>

                <nav className="flex h-22 items-center justify-center gap-20">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `text-sm px-3 py-2 rounded-md transition-colors ${isActive
                                ? 'font-semibold text-black bg-blue-400'
                                : 'text-gray-600 hover:text-black hover:bg-blue-400'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            `text-sm px-3 py-2 rounded-md transition-colors ${isActive
                                ? 'font-semibold text-black bg-blue-400'
                                : 'text-gray-600 hover:text-black hover:bg-blue-400'
                            }`
                        }
                    >
                        Products
                    </NavLink>

                </nav>
            </Container>
        </header>
    )
}