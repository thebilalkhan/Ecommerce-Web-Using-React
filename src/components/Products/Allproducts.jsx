import React, { useEffect, useContext, useState } from 'react';
import './Allproducts.css';
import fetchProducts from '../../api/fetchProducts';
import { ProductContext } from '../../contexts/ProductContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import Footers from '../Footer/Footers';

function Allproducts({ ClickOnCat }) {
    const { Products, setProducts, categories } = useContext(ProductContext);
    const { addToCart } = useContext(CartContext);
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data.products);
                console.log(Products);
                localStorage.setItem('products', JSON.stringify(data.products));
            } catch (error) {
                console.error('Error Fetching Products:', error);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        if (e.target.value === 'lowToHigh') {
            lowToHigh();
        } else if (e.target.value === 'highToLow') {
            highToLow();
        }
    };

    const lowToHigh = () => {
        const sortedProduct = [...Products].sort((a, b) => a.price - b.price);
        setProducts(sortedProduct);
    };

    const highToLow = () => {
        const sortedProduct = [...Products].sort((a, b) => b.price - a.price);
        setProducts(sortedProduct);
    };

    return (
        <>
            <div className="productContainer">
                <div className='cat-sortContainer'>
                    <div><h3>Products {categories[ClickOnCat]}</h3></div>
                    <select id="sort" onChange={handleSortChange} value={sortBy}>
                        <option value="default">Default</option>
                        <option value="highToLow">Price (High to Low)</option>
                        <option value="lowToHigh">Price (Low to High)</option>
                    </select>
                </div>

                <div className='Allproducts'>
                    {Products.map((item, index) => (
                        <div className='productItem' key={index} >
                            <div className='img-container'><Link to={`/products/${Products[index].id}`}><img src={item.thumbnail} alt="" /></Link></div>
                            <div className='catagory'>{item.category}</div>
                            <div className='name'>{item.brand}</div>
                            <div className='product-price'>${item.price}</div>
                            <div className='discount'><s>${item.price + 50}</s> <span>{Math.round(item.discountPercentage)}%</span></div>
                            <button className='cartBtn' onClick={() => {
                                let productWithIndex = item;
                                
                                addToCart(productWithIndex);
                                // console.log(index)
                            }}> ADD TO CARD</button>
                        </div>
                    ))}
                </div>
            
            </div>
        
        </>
    )
}

export default Allproducts;
