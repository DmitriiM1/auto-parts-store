import Container from '../components/Container'
import { useCart } from '../features/cart/CartContext'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const { items, total, setQty, removeItem, clear } = useCart()

  return (
    <Container>
      <div className="py-8">
        <h1 className="text-2xl font-semibold mb-6">Cart</h1>

        {items.length === 0 ? (
          <div className="text-gray-600">
            Cart is empty. <Link className="underline" to="/products">Go to products</Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
            <div className="space-y-3">
              {items.map(i => (
                <div key={i.productId} className="rounded-xl border p-4 flex items-center gap-4">
                  {i.imageUrl ? (
                    <img src={i.imageUrl} alt={i.name} className="h-16 w-16 object-cover rounded-lg" />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-gray-200" />
                  )}

                  <div className="flex-1">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm text-gray-600">${i.price.toFixed(2)}</div>
                  </div>

                  <input
                    aria-label="Quantity"
                    type="number"
                    min={1}
                    value={i.qty}
                    onChange={(e) => setQty(i.productId, Number(e.target.value))}
                    className="w-20 rounded-lg border px-2 py-1"
                  />

                  <button
                    onClick={() => removeItem(i.productId)}
                    className="rounded-lg bg-black text-white px-3 py-2 text-sm hover:opacity-80"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-4 h-fit">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>

              <button
                className="w-full rounded-lg bg-blue-500 text-white px-4 py-2 font-semibold hover:opacity-90"
                onClick={() => alert('Next step: checkout + orders')}
              >
                Place order
              </button>

              <button
                className="w-full mt-3 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
                onClick={clear}
              >
                Clear cart
              </button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}