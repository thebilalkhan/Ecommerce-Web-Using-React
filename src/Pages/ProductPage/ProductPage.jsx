import React, { useContext } from 'react'
import Header from '../../components/Header/Header'
import Catagories from '../../components/Products/Catagories'
import Allproducts from '../../components/Products/Allproducts'
import { useState } from 'react'
import './ProductPage.css'
import { CartContext } from '../../contexts/CartContext'
import useMenuShareState from '../../hooks/menuShareState'

function Products() {

  
  const [ClickOnCat, setClickOnCat] = useState(false);
  const {isCartOpen} = useContext(CartContext);
  const {isMenuOpen} = useMenuShareState();
  
  return (
    <>
    
    
      <div className= {`products-page `}>
        <div className={ isCartOpen || isMenuOpen ? 'transparent-div': "display-off"}></div>

        
          <Catagories 
          
          ClickOnCat = {ClickOnCat}
          setClickOnCat = {setClickOnCat}/> 


          <Allproducts ClickOnCat={ClickOnCat}/>
      
      </div>
    
    </>
  )
}

export default Products

