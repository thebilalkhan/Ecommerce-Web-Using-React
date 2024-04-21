import React, { useContext, useState } from 'react';
import shopingCardImg from './../../assets/shopingCart.png';
import './Header.css';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import CartModel from '../Cart/CartModel';
import { CartContext } from '../../contexts/CartContext';
import useMenuShareState from '../../hooks/menuShareState';
import fetchProducts from '../../api/fetchProducts';

function Header() {
  const { setProducts } = useContext(ProductContext);
  const { isCartOpen, setIsCartOpen, productCart } = useContext(CartContext);
 const {isMenuOpen, setIsMenuOpen} = useMenuShareState();
  const [searchData, setSearchData] = useState();

  //  console.log(productCart);

  const handleSearchData = (event) => {
    setSearchData(event.target.value);
  };

  const productSearchFunction = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${searchData}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsMenuOpen(false);
      productSearchFunction();
    }
  };

 

  return (
    <>
      <div className={isMenuOpen ? 'Dropdown-Header' : 'Header'}>
      <div className='cross' onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? "X" : ""}</div>
        <h1 className='logo'><Link to='/' onClick={()=>setIsMenuOpen(false)}>YouShop</Link></h1>
        <div className={isMenuOpen ? 'Dropdown-search-box' : 'search-box'}>
          <input type="search" placeholder="Search..." onChange={handleSearchData} value={searchData} onKeyDown={handleKeyDown} />
        </div>
        <Link to='/products' style={{ textDecoration: 'none' }}>
          <h2 className={isMenuOpen ? 'Dropdown-products' : 'products' } onClick={()=>{setIsMenuOpen(false) ; fetchProducts();}}>Products</h2>
        </Link>
        <h2 className={isMenuOpen ? 'Dropdown-login' : 'login'}>Login</h2>
        <div className='cart-div' onClick={()=>setIsMenuOpen(false)}> <img className={isMenuOpen ? 'Dropdown-cart' : 'cart'} src={shopingCardImg} alt='shoping cart' onClick={() => setIsCartOpen(true)} />  <span className={isMenuOpen ? 'cartItem' : ''} > {productCart.length} </span> </div>
        {(isCartOpen) && <CartModel />}
        <div className={isMenuOpen ? 'hamburger-hide' : 'hamburger'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className='bar'></div>
          <div className='bar'></div>
          <div className='bar'></div>
        </div>
      </div>
    </>
  );
}

export default Header;
