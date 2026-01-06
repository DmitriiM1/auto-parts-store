import { API_BASE_URL } from '../../lib/api'
import type { ProductsResponse } from './types'

export type ListProductsParams = {
  search?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  pageSize?: number
}

export async function listProducts(params: ListProductsParams): Promise<ProductsResponse> {
  const url = new URL(`${API_BASE_URL}/products`)

  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return
    url.searchParams.set(k, String(v))
  })

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`)

  return res.json()
}