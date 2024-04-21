import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home'
import Products from './Pages/ProductPage/ProductPage'
import ProductDetailPage from './Pages/ProductDetailPage';
import ProductCartPage from './Pages/ProductCartPage';



const App = () => {
  return (
    
    <Router>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="products/cart" element={<ProductCartPage />} />
        </Routes>
      </Layout>
    </Router>



  );
};

export default App