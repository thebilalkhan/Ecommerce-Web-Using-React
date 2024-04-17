// CartContext.js
import React, { createContext, useContext, useState } from 'react';

let CartContext = createContext();

let CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productCart, setProductCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const updateTotalCartPrice = (priceChange) => {
    setTotalCartPrice((prevTotal) => prevTotal + priceChange);
  };

  const addToCart = (item) => {
    const index = productCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      setProductCart([...productCart, { ...item, quantity: 1 }]);
      updateTotalCartPrice(item.price);
    } else {
      const updatedCart = [...productCart];
      updatedCart[index].quantity++;
      setProductCart(updatedCart);
      updateTotalCartPrice(item.price);
    }
  };

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen, productCart, setProductCart, totalCartPrice, setTotalCartPrice, updateTotalCartPrice, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
