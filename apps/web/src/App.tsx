import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import SignInPage from './pages/SignInPage'
import { AdminProductsPage } from './pages/AdminProductsPage'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
      </Routes>
    </div>
  )
}