export type Category = {
  id: string
  name: string
}

export type Product = {
  id: string
  name: string
  brand: string
  sku: string
  stock: number
  imageUrl?: string | null
  categoryId: string
  category?: Category
  createdAt: string
  updatedAt: string
  price?: number
  priceCents: number
}

export type ProductsResponse = {
  page: number
  pageSize: number
  total: number
  items: Product[]
}