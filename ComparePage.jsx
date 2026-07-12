import { useSelector, useDispatch } from 'react-redux';
import { toggleCompare } from '../store/compareSlice';
import { addToCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const ComparePage = () => {
  const compareItems = useSelector(state => state.compare.items);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Compare Products</h1>

      {compareItems.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#aaa', marginTop: '3rem' }}>
          <h3>You haven't selected any items to compare yet!</h3>
          <Link to="/products">
            <button style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {compareItems.map((product) => (
            <div key={product.id} style={{ flex: '1', minWidth: '250px', border: '1px solid #444', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#242424', display: 'flex', flexDirection: 'column' }}>
              
              {/* Remove from Compare Button */}
              <button 
                onClick={() => dispatch(toggleCompare(product))}
                style={{ alignSelf: 'flex-end', background: 'transparent', color: '#ff4a4a', border: 'none', cursor: 'pointer', fontSize: '1.2rem', marginBottom: '1rem' }}
                title="Remove from compare"
              >
                ✖️
              </button>

              {/* Image */}
              <div style={{ height: '200px', backgroundColor: 'white', marginBottom: '1rem', borderRadius: '4px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              
              {/* Basic Info */}
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem 0', height: '3rem', overflow: 'hidden' }}>{product.title}</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#646cff', margin: '0 0 1rem 0' }}>${product.price}</p>
              
              {/* Detailed Specs for Comparison */}
              <div style={{ borderTop: '1px solid #444', paddingTop: '1rem', marginBottom: '1rem', flexGrow: 1 }}>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Category:</strong> <span style={{ textTransform: 'capitalize' }}>{product.category}</span></p>
                <p style={{ margin: '0 0 0.5rem 0' }}><strong>Rating:</strong> {product.rating?.rate} ⭐ ({product.rating?.count} reviews)</p>
                <p style={{ fontSize: '0.9rem', color: '#aaa', height: '100px', overflowY: 'auto', margin: '1rem 0' }}>{product.description}</p>
              </div>
              
              <button 
                onClick={() => dispatch(addToCart(product))}
                style={{ width: '100%', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComparePage;