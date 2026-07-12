import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { toggleCompare } from '../store/compareSlice'; // Import compare action

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.items);
  const compareItems = useSelector(state => state.compare.items); // Get compare items

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading products...</h2>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Products</h1>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ width: '250px', border: '1px solid #444', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', backgroundColor: '#242424' }}>
            
            <div style={{ height: '200px', backgroundColor: 'white', marginBottom: '1rem', borderRadius: '4px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            
            <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.title}
            </h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#646cff', margin: '0 0 1rem 0' }}>
              ${product.price}
            </p>
            
            {/* Action Buttons Container */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '0.5rem' }}>
              {/* Wishlist Button */}
              <button 
                onClick={() => dispatch(toggleWishlist(product))}
                style={{ flex: 1, cursor: 'pointer', backgroundColor: wishlistItems.some(item => item.id === product.id) ? '#ff4a4a' : 'transparent', color: wishlistItems.some(item => item.id === product.id) ? 'white' : '#ff4a4a', border: '1px solid #ff4a4a', padding: '0.6rem', borderRadius: '4px', fontWeight: 'bold' }}
              >
                {wishlistItems.some(item => item.id === product.id) ? '♥️' : '♡'}
              </button>

              {/* Compare Button */}
              <button 
                onClick={() => dispatch(toggleCompare(product))}
                style={{ flex: 4, cursor: 'pointer', backgroundColor: compareItems.some(item => item.id === product.id) ? '#008CBA' : 'transparent', color: compareItems.some(item => item.id === product.id) ? 'white' : '#008CBA', border: '1px solid #008CBA', padding: '0.6rem', borderRadius: '4px', fontWeight: 'bold' }}
              >
                {compareItems.some(item => item.id === product.id) ? '⇄ Added' : '⇄ Compare'}
              </button>
            </div>

            <Link to={`/product/${product.id}`} style={{ width: '100%', marginBottom: '0.5rem', textDecoration: 'none' }}>
              <button style={{ width: '100%', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px' }}>
                View Details
              </button>
            </Link>

            <button 
              onClick={() => dispatch(addToCart(product))}
              style={{ marginTop: 'auto', width: '100%', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;