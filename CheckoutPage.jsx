import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();
  
  // Calculate final totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const finalTotal = subtotal + tax;

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    alert("🎉 Order placed successfully! Thank you for shopping with us.");
    // In a real app, we would clear the cart and send data to a backend here!
    navigate('/'); 
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Your cart is empty!</h2>
        <button onClick={() => navigate('/products')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Secure Checkout</h1>

      {/* Responsive Container: flexWrap allows stacking on smaller screens */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        
        {/* Left Side: Checkout Form */}
        <div style={{ flex: '1 1 500px', backgroundColor: '#242424', padding: '2rem', borderRadius: '8px' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>Shipping & Payment</h2>
          
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
              <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }} />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>Shipping Address</label>
              <input type="text" required placeholder="123 Main St" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>City</label>
                <input type="text" required placeholder="New York" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Zip Code</label>
                <input type="text" required placeholder="10001" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', marginTop: '1rem' }}>Credit Card Number</label>
              <input type="text" required placeholder="XXXX XXXX XXXX XXXX" maxLength="16" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" style={{ marginTop: '1.5rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '1rem', fontSize: '1.1rem', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' }}>
              Place Order (${finalTotal.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div style={{ flex: '1 1 300px', backgroundColor: '#242424', padding: '2rem', borderRadius: '8px', height: 'fit-content' }}>
          <h2 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>Order Summary</h2>
          
          <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
                <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '1rem' }}>
                  {item.quantity}x {item.title}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #444', paddingTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#ccc' }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#ccc' }}>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;