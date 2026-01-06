import { useEffect, useState } from 'react'
import Container from '../components/Container'
import { listProducts } from '../features/products/api'
import type { Product } from '../features/products/types'

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    listProducts({ page: 1, pageSize: 12 })
      .then(r => setItems(r.items))
      .catch(e => setError(e.message ?? 'Unknown error'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-gray-600 mt-1">Browse parts by brand and category.</p>

        {loading && <p className="mt-6">Loading…</p>}
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="mt-6 text-gray-600">No products found.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(p => (
              <div key={p.id} className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="text-sm text-gray-500">{p.brand}</div>
                <div className="mt-1 font-semibold">{p.name}</div>
                <div className="mt-1 text-sm text-gray-600">SKU: {p.sku}</div>
                <div className="mt-3 font-semibold">
                  ${typeof p.price === 'number' ? p.price.toFixed(2) : (p.priceCents / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}