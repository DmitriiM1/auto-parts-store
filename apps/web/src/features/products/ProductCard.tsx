import type { Product } from './types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useCart } from '../cart/CartContext'

function formatPrice(p: Product) {
  const value = typeof p.price === 'number' ? p.price : p.priceCents / 100
  return `$${value.toFixed(2)}`
}


export default function ProductCard({ product }: { product: Product }) {
  const { isAuthed } = useAuth()
  const { addItem } = useCart()
  const [error, setError] = useState(false)
  const imgSrc = `/images/products/${product.sku}.jpeg`
  const inStock = product.stock > 0
  const navigate = useNavigate()

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
        {!error ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="h-full w-full object-cover"
            onError={() => setError(true)}
          />
        ) : (
          <div className="text-gray-400 text-sm">No image</div>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500">{product.brand}</div>
        <div className="mt-1 font-semibold leading-tight">{product.name}</div>
        <div className="mt-1 text-sm text-gray-600">SKU: {product.sku}</div>

        <div className="mt-3 flex items-center justify-between">
          <div className="font-semibold">{formatPrice(product)}</div>
          <span
            className={`text-xs rounded-full px-2 py-1 ${inStock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
          >
            {inStock ? `In stock: ${product.stock}` : 'Out of stock'}
          </span>
        </div>
        
        <button
          onClick={() => {
            if (!isAuthed) {
              alert('Please sign in to add items to your cart.')
              navigate('/signin')
              return
            }

            addItem({
              productId: product.id,
              name: product.name,
              price: product.price ?? 0,
              imageUrl: product.imageUrl,
            })
          }}
          disabled={!inStock}
          className={`mt-3 rounded-lg px-4 py-2 text-sm text-white hover:opacity-80 ${
            inStock ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Add to cart
        </button>
      </div>
    </div>
  )
}