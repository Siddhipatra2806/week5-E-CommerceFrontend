import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '6rem 2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
        Welcome to Your <br/> <span style={{ color: '#646cff' }}>Premium Tech & Apparel</span> Store
      </h1>
      
      <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '3rem', lineHeight: '1.6', maxWidth: '600px' }}>
        Discover the best products at unbeatable prices. From trendy clothing to premium electronics, we have everything you need built right into one lightning-fast platform.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/products" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', transition: 'background-color 0.2s' }}>
            Shop Now
          </button>
        </Link>
        <Link to="/compare" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', backgroundColor: 'transparent', color: '#008CBA', border: '2px solid #008CBA', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Compare Features
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;