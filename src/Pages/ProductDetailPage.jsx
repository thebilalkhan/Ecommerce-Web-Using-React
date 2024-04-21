import React, { useContext, useState } from 'react'
import Header from '../components/Header/Header'
import './ProductDetailPage.css'

import { useLocation } from 'react-router-dom'
import { ProductContext } from '../contexts/ProductContext'
import { useEffect } from 'react'
import Products from './ProductPage/ProductPage'
import { CartContext } from '../contexts/CartContext'

function ProductDetailPage() {

  const { Products, setProducts } = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);
  const [productData, setProductData] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);




  const location = useLocation();
  const pathname = location.pathname;
  const productId = pathname.split('/')[2];
  console.log(productId);
  // console.log(Products)

  const data = async () => {
    let product = await Products.find((product) => product.id === Number(productId));
    if (await product) {
      setSelectedImage(product.thumbnail);
    }
    setProductData(product);
  }


  useEffect(() => {

    data();
  }, [productData, productId]);



  if (!productData) {

    return <div>Loading...</div>;
  }



  return (

    <>


      {(productData) && (
        <div className='product-detail-parent'>
          <div className='product-img-container'>
            <div className="product-img-div"><img src={selectedImage} alt="" /></div>
            <div className='products-related-img-div'>
              <div className="images" id="img1"><img src={productData.images[0]} onClick={() => setSelectedImage(productData.images[0])} alt="img1" /></div>
              <div className="images" id="img2"><img src={productData.images[1]} onClick={() => setSelectedImage(productData.images[1])} alt="img2" /></div>
              <div className="images" id="img3"><img src={productData.images[2]} onClick={() => setSelectedImage(productData.images[2])} alt="img3" /></div>
              <div className="images" id="img4"><img src={productData.images[3]} onClick={() => setSelectedImage(productData.images[3])} alt="img4" /></div>
            </div>
          </div>


          <div className="product-detail-container">

            <>
              <div className="product-info">
                <h2>{productData.title}</h2>
                <p className="price">${productData.price}</p>
                <p className="discounted-price"> <s><strong>${Math.round(productData.price / (1 - (productData.discountPercentage / 100)))}</strong> </s> &nbsp; &nbsp; {Math.round(productData.discountPercentage)}%</p>
                <p className="brand"><strong>Brand</strong> &nbsp;&nbsp;: &nbsp;&nbsp; {productData.brand}</p>
                <p className="category"><strong>Category</strong> &nbsp;&nbsp;: &nbsp;&nbsp;{productData.category}</p>
                <p className="stock"><strong>Stock </strong> &nbsp;&nbsp;: &nbsp;&nbsp;{productData.stock}</p>
              </div>
              <div className="product-description">
                <h3>About the product</h3>
                <p> {productData.description}An apple mobile which is nothing like apple It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come forth; they are in fault who abandon their duties and soften their hearts, that is, their labors.</p>
              </div>
              <button className='addToCart' onClick={()=> addToCart(productData) } >Add To Cart</button>
            </>

          </div>
        </div>)
      }
    </>
  )
}

export default ProductDetailPage;
