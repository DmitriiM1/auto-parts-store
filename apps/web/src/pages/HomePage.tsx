import { Link } from 'react-router-dom'
import Container from '../components/Container'
import PartsShowcase from '../components/home/PartsShowcase'

export default function HomePage() {
  return (
    <main>
      <section className="bg-gradient-to-b from-gray-50 to-white py-14">
        <Container>
          <div className="grid p-3 gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="inline-flex rounded-full border bg-white px-3 text-2xl text-gray-600">
                Fast search • Clean UI • Real backend
              </p>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-black md:text-5xl">
                Find the right auto parts. Faster.
              </h1>

              <p className="mt-4 text-gray-600">
                Search products by brand, category, and price. Powered by a NestJS + Prisma backend.
              </p>

              <div className="mt-6 flex flex-wrap gap-6 items-center justify-center">
                <Link
                  to="/products"
                  className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Browse products
                </Link>

                <a
                  href="https://auto-parts-store-fa9b.onrender.com/docs"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border px-5 py-3 text-sm font-semibold text-black hover:bg-gray-50"
                >
                  View API docs
                </a>
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold">What we are offering:</h2>
              <ul className="mt-4 space-y-3 text-lg text-gray-900">
                <li className="flex gap-2"><span className="text-black">•</span> Genuine and high-quality aftermarket parts</li>
                <li className="flex gap-2"><span className="text-black">•</span> Competitive pricing</li>
                <li className="flex gap-2"><span className="text-black">•</span> Fast delivery across Toronto & GTA</li>
                <li className="flex gap-2"><span className="text-black">•</span> Parts sourcing for all makes and models</li>
                <li className="flex gap-2"><span className="text-black">•</span> OEM / aftermarket options</li>
                <li className="flex gap-2"><span className="text-black">•</span> Helpful support with part selection</li>
              </ul>
            </div>
          </div>
        </Container>
        <PartsShowcase />
      </section>
    </main>
  )
}