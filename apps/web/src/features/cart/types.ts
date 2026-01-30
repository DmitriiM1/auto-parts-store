export type CartItem = {
  productId: string
  name: string
  price: number
  imageUrl?: string | null
  qty: number
}

export type CartState = {
  items: CartItem[]
}