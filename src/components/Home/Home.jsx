import React from 'react'
import { Link } from 'react-router-dom'
import homeImg from './../../assets/homeImg.jpg'
import './Home.css'
import Header from './../Header/Header'
import { ProductProvider } from '../../contexts/ProductContext'


function Home() {
  return (
    <>

      


      <div className="image-container">
        <div className='home-text'>

          <div class="price">Starting At <span style={{ color: '#e39160' }}>$999</span> </div>
          <div class="collection">The best deals of 2024 is waiting</div>
          <div class="offer">Exclusive offer -10% off this week</div>
          <Link to= '/products'><button class="shop-button">Shop Now</button></Link>

        </div>
        <img className="home-img" src={homeImg} alt="Home" />
        <div className="overlay"></div>
      </div>

     
    </>
  )
}

export default Home