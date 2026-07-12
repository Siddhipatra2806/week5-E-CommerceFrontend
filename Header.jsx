import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchProducts } from '../../services/api';

const Header = () => {
  // Grab cart items to calculate the total number for the badge
  const cartItems = useSelector(state => state.cart.items);
  const compareItems = useSelector(state => state.compare.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  
  // Search state variables
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  // Load all products once so we can search through them quickly
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  // Filter the list live as the user types
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredProducts([]); // Close dropdown if empty
    } else {
      const results = products.filter(product => 
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(results);
    }
  };

  // When a user clicks a search result, go to that page and close the dropdown
  const handleProductClick = (id) => {
    setSearchTerm(''); 
    setFilteredProducts([]); 
    navigate(`/product/${id}`); 
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#242424', color: 'white', borderBottom: '1px solid #444', position: 'relative' }}>
      <h2>My E-Commerce Store</h2>
      
      {/* SEARCH BAR CONTAINER */}
      <div style={{ position: 'relative', width: '300px' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#333', color: 'white' }}
        />
        
        {/* AUTOCOMPLETE DROPDOWN */}
        {filteredProducts.length > 0 && (
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#333', border: '1px solid #555', borderRadius: '0 0 4px 4px', maxHeight: '300px', overflowY: 'auto', zIndex: 1000 }}>
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product.id)}
                style={{ padding: '0.5rem', borderBottom: '1px solid #444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <img src={product.image} alt={product.title} style={{ width: '30px', height: '30px', objectFit: 'contain', backgroundColor: 'white', borderRadius: '2px', padding: '2px' }} />
                <span style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NAVIGATION LINKS */}
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        <Link to="/wishlist" style={{ color: '#ff4a4a', textDecoration: 'none', fontWeight: 'bold' }}>Wishlist</Link>
         <Link to="/compare" style={{ color: '#008CBA', textDecoration: 'none', fontWeight: 'bold' }}>Compare ({compareItems.length})</Link>

        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Cart ({totalItems})</Link>
      </nav>
    </header>
  );
};

export default Header;