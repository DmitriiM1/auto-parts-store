import { useEffect, useState } from 'react'
import Container from '../components/Container'
import { listProducts } from '../features/products/api'
import type { Product } from '../features/products/types'
import ProductCard from '../features/products/ProductCard'

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
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}