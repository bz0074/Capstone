import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.products)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const categories = useMemo(() => {
    const unique = ['All', ...new Set(products.map((p) => p.category))]
    return unique
  }, [products])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="card mb-6 grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Home
