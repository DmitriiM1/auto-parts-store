import type { CartState } from './types'

const KEY = 'cart:v1'

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { items: [] }
    return JSON.parse(raw) as CartState
  } catch {
    return { items: [] }
  }
}

export function saveCart(cart: CartState) {
  localStorage.setItem(KEY, JSON.stringify(cart))
}

export function clearCart() {
  localStorage.removeItem(KEY)
}