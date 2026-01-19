import {useState} from 'react';
import Container from '../components/Container';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here
    console.log('Signing in with', { email, password });
  };

  return (
    <Container>
      <div className="py-8 max-w-md mx-auto"></div>
        <h1 className="text-2xl font-semibold mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <button
                type="submit"
                className="w-full rounded-lg bg-black text-white px-4 py-2 font-semibold hover:opacity-90"
            >
                Sign In
            </button>
        </form>
    </Container>
  );
}
