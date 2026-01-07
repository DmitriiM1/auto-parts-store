import type { Product } from './types'

function formatPrice(p: Product) {
  const value = typeof p.price === 'number' ? p.price : p.priceCents / 100
  return `$${value.toFixed(2)}`
}

export default function ProductCard({ product }: { product: Product }) {
  const img = product.imageUrl?.trim()
  const inStock = product.stock > 0

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
        {img ? (
          <img src={img} alt={product.name} className="h-full w-full object-cover" />
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
            className={`text-xs rounded-full px-2 py-1 ${
              inStock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {inStock ? `In stock: ${product.stock}` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  )
}