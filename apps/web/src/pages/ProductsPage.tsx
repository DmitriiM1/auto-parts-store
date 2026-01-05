import Container from '../components/Container'

export default function ProductsPage() {
  return (
    <main className="py-10">
      <Container>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="mt-2 text-gray-600">
          Next step: fetch products from API and add filters.
        </p>
      </Container>
    </main>
  )
}