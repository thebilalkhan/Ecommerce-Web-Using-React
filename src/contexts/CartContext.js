import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

let CartContext = createContext();

let CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productCart, setProductCart] = useState(() => {
    const storedCart = localStorage.getItem('cartProduct');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalCartPrice, setTotalCartPrice] = useState(() => {
    // Calculate total price from the items in productCart
    return productCart.reduce((total, item) => total + item.price * item.quantity, 0);
  });

  // Save cart items to local storage whenever productCart changes
  useEffect(() => {
    localStorage.setItem('cartProduct', JSON.stringify(productCart));
  }, [productCart]);

  const updateTotalCartPrice = (priceChange) => {
    setTotalCartPrice((prevTotal) => prevTotal + priceChange);
  };

  const addToCart = (item) => {
    const index = productCart.findIndex((cartItem) => cartItem.id === item.id);
    if (index === -1) {
      setProductCart([...productCart, { ...item, quantity: 1 }]);
      updateTotalCartPrice(item.price);  
    toast.success('Product added to cart', {autoClose : 2000});

    } else {
      const updatedCart = [...productCart];
      updatedCart[index].quantity++;
      setProductCart(updatedCart);
      updateTotalCartPrice(item.price);
      toast.success('Product added to cart');   
    }
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        productCart,
        setProductCart,
        totalCartPrice,
        setTotalCartPrice,
        updateTotalCartPrice,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
