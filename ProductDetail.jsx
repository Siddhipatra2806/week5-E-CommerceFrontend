import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Helper function to turn the rating number into visual stars
  const renderStars = (ratingValue) => {
    const filledStars = Math.round(ratingValue);
    const emptyStars = 5 - filledStars;
    return (
      <span style={{ color: '#FFD700', fontSize: '1.2rem', letterSpacing: '2px' }}>
        {'★'.repeat(filledStars)}{'☆'.repeat(emptyStars)}
      </span>
    );
  };

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Loading product details...</h2>;
  if (!product) return <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Product not found!</h2>;

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', backgroundColor: '#242424', padding: '2rem', borderRadius: '8px' }}>
        
        {/* Left Side: Image */}
        <div style={{ flex: '1 1 300px', backgroundColor: 'white', padding: '2rem', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
        </div>

        {/* Right Side: Product Info */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
          
          <h1 style={{ marginBottom: '0.5rem', lineHeight: '1.3' }}>{product.title}</h1>
          
          {/* Category Tag */}
          <span style={{ display: 'inline-block', backgroundColor: '#646cff', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem', width: 'fit-content', marginBottom: '1rem', textTransform: 'capitalize' }}>
            {product.category}
          </span>

          {/* NEW: REVIEWS AND RATINGS SECTION */}
          {product.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', backgroundColor: '#333', padding: '0.5rem 1rem', borderRadius: '4px', width: 'fit-content' }}>
              {renderStars(product.rating.rate)}
              <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{product.rating.rate}</span>
              <span style={{ color: '#aaa', fontSize: '0.9rem' }}>({product.rating.count} reviews)</span>
            </div>
          )}

          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#ccc', marginBottom: '2rem' }}>
            {product.description}
          </p>
          
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 2rem 0' }}>${product.price}</h2>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            <button 
              onClick={() => dispatch(addToCart(product))}
              style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
            >
              Add to Cart
            </button>
            <Link to="/products" style={{ flex: 1, textDecoration: 'none' }}>
              <button style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: '#555', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                Back to Products
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;