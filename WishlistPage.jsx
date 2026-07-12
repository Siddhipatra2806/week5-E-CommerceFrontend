import { useSelector, useDispatch } from 'react-redux';
import { toggleWishlist } from '../store/wishlistSlice';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
  // Pull the wishlist items from our Redux store
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
          <h3>You haven't saved any items yet!</h3>
          <Link to="/products">
            <button style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {wishlistItems.map((product) => (
            <div 
              key={product.id} 
              style={{ width: '250px', border: '1px solid #444', borderRadius: '8px', padding: '1rem', display: 'flex', flexDirection: 'column', backgroundColor: '#242424' }}
            >
              <div style={{ height: '200px', backgroundColor: 'white', marginBottom: '1rem', borderRadius: '4px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img 
                  src={product.image} 
                  alt={product.title} 
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                />
              </div>
              
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.title}
              </h3>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#646cff', margin: '0 0 1rem 0' }}>
                ${product.price}
              </p>
              
              {/* Add to Cart Button */}
              <button 
                onClick={() => dispatch(addToCart(product))}
                style={{ width: '100%', marginBottom: '0.5rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px' }}
              >
                Add to Cart
              </button>

              {/* Remove from Wishlist Button */}
              <button 
                onClick={() => dispatch(toggleWishlist(product))}
                style={{ marginTop: 'auto', width: '100%', cursor: 'pointer', backgroundColor: '#ff4a4a', color: 'white', border: 'none', padding: '0.6rem', borderRadius: '4px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;