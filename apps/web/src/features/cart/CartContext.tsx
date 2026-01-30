import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, CartState } from './types'
import { loadCart, saveCart } from './storage'

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>, qty?: number) => void
  removeItem: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  clear: () => void
  total: number
  count: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>(() => loadCart())

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const value = useMemo<CartContextValue>(() => {
    const items = cart.items
    const total = items.reduce((s, i) => s + i.price * i.qty, 0)
    const count = items.reduce((s, i) => s + i.qty, 0)

    return {
      items,
      addItem: (item, qty = 1) => {
        setCart(prev => {
          const existing = prev.items.find(x => x.productId === item.productId)
          if (existing) {
            return {
              items: prev.items.map(x =>
                x.productId === item.productId ? { ...x, qty: x.qty + qty } : x,
              ),
            }
          }
          return { items: [...prev.items, { ...item, qty }] }
        })
      },
      removeItem: (productId) => {
        setCart(prev => ({ items: prev.items.filter(x => x.productId !== productId) }))
      },
      setQty: (productId, qty) => {
        setCart(prev => ({
          items: prev.items
            .map(x => (x.productId === productId ? { ...x, qty } : x))
            .filter(x => x.qty > 0),
        }))
      },
      clear: () => setCart({ items: [] }),
      total,
      count,
    }
  }, [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}