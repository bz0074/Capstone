import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Navbar = () => {
  const { user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container-custom py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopSphere
        </Link>

        <div className="flex flex-wrap items-center gap-4">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/cart" className="hover:text-blue-600">
            Cart ({cartItems.length})
          </NavLink>

          {user && (
            <NavLink to="/orders" className="hover:text-blue-600">
              Orders
            </NavLink>
          )}

          {user?.role === 'admin' && (
            <>
              <NavLink to="/admin" className="hover:text-blue-600">Admin</NavLink>
              <NavLink to="/admin/products" className="hover:text-blue-600">Products</NavLink>
              <NavLink to="/admin/orders" className="hover:text-blue-600">Admin Orders</NavLink>
            </>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className="hover:text-blue-600">Login</NavLink>
              <NavLink to="/signup" className="hover:text-blue-600">Signup</NavLink>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
