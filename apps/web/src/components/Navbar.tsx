import { Link, NavLink } from 'react-router-dom'
import Container from './Container'
import { useCart } from '../features/cart/CartContext';
import '../index.css'

const adminToken = import.meta.env.VITE_ADMIN_TOKEN;

export default function Navbar() {
    const { count } = useCart()
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

                    <Link
                        to="/signin"
                        className="rounded-xl bg-black px-5 py-2 text-sm font-semibold text-white hover:opacity-60"
                    >
                        Sign In
                    </Link>

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


                    {adminToken && (
                        <NavLink
                            to="/admin/products"
                            className={({ isActive }) =>
                                `text-sm px-3 py-2 rounded-md transition-colors ${isActive
                                    ? 'font-semibold text-black bg-blue-400'
                                    : 'text-gray-600 hover:text-black hover:bg-blue-400'
                                }`
                            }
                        >
                            Admin Products
                        </NavLink>
                    )}

                    <NavLink to="/cart" className={({ isActive }) =>
                        `text-sm px-3 py-2 rounded-md transition-colors ${isActive
                            ? 'font-semibold text-black bg-blue-400'
                            : 'text-gray-600 hover:text-black hover:bg-blue-400'
                        }`
                    }>
                        Cart {count > 0 && <span className="ml-2 rounded-full bg-black text-white px-2 py-0.5 text-xs">{count}</span>}
                    </NavLink>

                </nav>
            </Container>
        </header>
    )
}