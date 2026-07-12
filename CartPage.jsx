import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  // Pull the cart items directly from our Redux store
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // CALCULATIONS
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // Calculating an 8% tax
  const finalTotal = subtotal + tax;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Your Shopping Cart</h1>

      {/* If the cart is empty, show a message. Otherwise, list the items. */}
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h3 style={{ color: '#aaa' }}>Your cart is currently empty.</h3>
          <Link to="/products">
            <button style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Start Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #444', padding: '1rem 0' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '60px', height: '60px', objectFit: 'contain', backgroundColor: 'white', padding: '5px', borderRadius: '4px' }} 
                />
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
                  <p style={{ margin: '0 0 0.5rem 0', color: '#aaa' }}>Price: ${item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      style={{ padding: '0.2rem 0.6rem', cursor: 'pointer', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      -
                    </button>
                    
                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                    
                    <button 
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      style={{ padding: '0.2rem 0.6rem', cursor: 'pointer', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Button to remove the item from Redux store */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                style={{ backgroundColor: '#ff4a4a', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}
              >
                Remove
              </button>
              
            </div>
          ))}
          
          {/* TOTALS SECTION */}
          <div style={{ textAlign: 'right', marginTop: '2rem', padding: '1.5rem', backgroundColor: '#242424', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#ccc' }}>Subtotal: ${subtotal.toFixed(2)}</p>
            <p style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#ccc' }}>Estimated Tax (8%): ${tax.toFixed(2)}</p>
            <h2 style={{ margin: '0 0 1.5rem 0', color: 'white', borderTop: '1px solid #444', paddingTop: '1rem' }}>
              Final Total: ${finalTotal.toFixed(2)}
            </h2>
            
            {/* LINK TO CHECKOUT */}
            <Link to="/checkout" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '4px', marginTop: '1rem' }}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;