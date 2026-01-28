import { API_BASE_URL, getAdminHeaders } from '../../lib/api'
import type { ProductsResponse, Product } from './types'

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
export type CreateProductPayload = {
  name: string
  brand: string
  sku: string
  price: number
  stock: number
  imageUrl?: string
  categoryId: string
}


export type UpdateProductPayload = Partial<CreateProductPayload>


export async function createProduct(payload: CreateProductPayload): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAdminHeaders(),
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Failed to create product (${res.status})`)
  }

  return res.json()
}

export async function updateProduct(id: string, payload: UpdateProductPayload): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAdminHeaders(),
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error(`Failed to update product (${res.status})`)
  }

  return res.json()
}

export async function deleteProduct(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAdminHeaders(),
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to delete product (${res.status})`)
  }
}