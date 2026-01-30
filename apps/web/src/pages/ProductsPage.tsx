import { useEffect, useMemo, useState } from 'react'
import Container from '../components/Container'
import { listProducts } from '../features/products/api'
import type { Product } from '../features/products/types'
import ProductCard from '../features/products/ProductCard'

export default function ProductsPage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState({
    search: '',
    brand: 'all',
    category: 'all',
    minPrice: '',
    maxPrice: '',
  })

  useEffect(() => {
    setLoading(true)
    setError(null)

    listProducts({ page: 1, pageSize: 12 })
      .then(r => setItems(r.items))
      .catch(e => setError(e.message ?? 'Unknown error'))
      .finally(() => setLoading(false))
  }, [])

  const brands = useMemo(() => {
    const set = new Set<string>()
    for (const p of items) {
      if (p.brand) set.add(p.brand)
    }
    return Array.from(set).sort()
  }, [items])

  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const p of items) {
      const name = (p as any).categoryName ?? 'Other'
      set.add(name)
    }
    return Array.from(set).sort()
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter(p => {
      const text = `${p.name} ${p.brand} ${p.sku}`.toLowerCase()
      if (filters.search && !text.includes(filters.search.toLowerCase())) {
        return false
      }

      if (filters.brand !== 'all' && p.brand !== filters.brand) {
        return false
      }

      const categoryName = (p as any).categoryName ?? 'Other'
      if (filters.category !== 'all' && categoryName !== filters.category) {
        return false
      }

      if (filters.minPrice) {
        const min = Number(filters.minPrice)
        if (!Number.isNaN(min) && p.price < min) return false
      }

      if (filters.maxPrice) {
        const max = Number(filters.maxPrice)
        if (!Number.isNaN(max) && p.price > max) return false
      }

      return true
    })
  }, [items, filters])

  return (
    <Container>
      <div className="py-4 p-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Products</h1>
            <p className="text-gray-600 mt-1">
              Browse parts by brand, category, and price.
            </p>
          </div>

          {!loading && !error && items.length > 0 && (
            <p className="text-sm text-gray-500 mt-2 sm:mt-0">
              Showing <span className="font-medium">{filteredItems.length}</span> of{' '}
              <span className="font-medium">{items.length}</span> products
            </p>
          )}
        </div>

        {/* Filters */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-4 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                Search
              </label>
              <input
                type="text"
                value={filters.search}
                onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Search by name, brand, or SKU"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor='brand' className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                Brand
              </label>
              <select
                id='brand'
                value={filters.brand}
                onChange={e => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                className="mt-1 w-full h-9 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All brands</option>
                {brands.map(b => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor='category' className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                Category
              </label>
              <select
                id='category'
                value={filters.category}
                onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="mt-1 w-full h-9 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-4 md:items-end">
            <div className="flex gap-3 md:col-span-2">
              <div className="flex-1">
                <label htmlFor='minPrice' className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Min price, $
                </label>
                <input
                  id='minPrice'
                  type="number"
                  min={0}
                  value={filters.minPrice}
                  onChange={e => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label htmlFor='maxPrice' className="block text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Max price, $
                </label>
                <input
                  id='maxPrice'
                  type="number"
                  min={0}
                  value={filters.maxPrice}
                  onChange={e => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setFilters({
                  search: '',
                  brand: 'all',
                  category: 'all',
                  minPrice: '',
                  maxPrice: '',
                })
              }
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-gray-50"
            >
              Reset filters
            </button>
          </div>
        </div>

        {loading && <p className="mt-6">Loading…</p>}
        {error && <p className="mt-6 text-red-600">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="mt-6 text-gray-600">No products found.</p>
        )}

        {!loading && !error && items.length > 0 && filteredItems.length === 0 && (
          <p className="mt-6 text-gray-600">
            No products match the selected filters. Try adjusting your search.
          </p>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}