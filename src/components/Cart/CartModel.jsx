// CartModel.js
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';
import './CartModel.css';
import deletePng from './../../assets/delete.png'
import emptyCart from './../../assets/empty-cart.png'
import { toast } from 'react-toastify';

function CartModel() {
  const { isCartOpen, setIsCartOpen, productCart, setProductCart, totalCartPrice, setTotalCartPrice } = useContext(CartContext);
 


  const addedItems = () => {
    return productCart.map((item) => (
      <ProductToAdd key={item.id} item={item} /> 
    ));
  };

  return (
    <div className={`cart-model ${isCartOpen ? '' : 'hide-cart-model'}`}>
      <div className='close-cart' onClick={() => setIsCartOpen(false)}>X</div>
      <div className='product-container'>
        {addedItems()}
      </div>
      { (productCart.length > 0) ?
        (<div className='totalProductsPrice'><h2>Total</h2><h2>${totalCartPrice}</h2></div> )
        : <div className='empty-cart-container'> <div><img src={emptyCart} alt="" /></div><h3>Cart is Empty</h3></div>
      }
    </div>
  );
}

const ProductToAdd = ({ item }) => {
  const { productCart, setProductCart, totalCartPrice, setTotalCartPrice } = useContext(CartContext);

  const increaseQuantity = () => {
    const updatedCart = [...productCart];
    const index = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
    updatedCart[index].quantity++;
    setProductCart(updatedCart);
    setTotalCartPrice(totalCartPrice + item.price);
    toast.success('Item Quantity Increased Successfully');

  };

  const decreaseQuantity = () => {
    const updatedCart = [...productCart];
    const index = updatedCart.findIndex((cartItem) => cartItem.id === item.id);
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setProductCart(updatedCart);
      setTotalCartPrice(totalCartPrice - item.price);
      
    }
  };

  const deleteProduct = (item) => {
    setProductCart(productCart.filter((cartItem) => cartItem.id !== item.id));
    setTotalCartPrice(totalCartPrice - (item.price * item.quantity)); 
    toast.success('Item Deleted Successfully');
  };

  return (
    <div className='added-product'>
      <div className='added-image-div'><img src={item.thumbnail} alt="" /></div>
      <div className='product-info'>
        <div className="title">{item.title}</div>
        <div className="added-product-price">${item.price}<span> &nbsp; -{item.discountPercentage}%</span></div>
        <div>
          <div className='decrease-quantity' onClick={decreaseQuantity}>-</div>
          <span className='quantity'>{item.quantity}</span>
          <div className='increase-quantity' onClick={increaseQuantity}> + </div>
        </div>
      </div>
      <div className="total-price">
        <div style={{ fontWeight: '500', fontSize: '18px' }}>${item.price * item.quantity}</div>
        <div className='deleteProduct'><img onClick={ ()=> deleteProduct(item)  } src={deletePng} alt="" /></div>
      </div>
    </div>
  );
};

export default CartModel;
