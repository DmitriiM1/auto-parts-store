import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { useAuth } from '../features/auth/AuthContext'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) return

    signIn(email.trim())

    navigate('/cart')
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6 ml-6">Let's sign in right now</h1>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-m rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-m rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black text-white px-4 py-2 font-semibold hover:opacity-90"
        >
          Sign In
        </button>
      </form>
    </Container>
  )
}
