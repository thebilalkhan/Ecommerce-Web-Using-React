import { createContext,useState } from "react";

const ProductContext =  createContext();

const ProductProvider = ({children})=> {
   
    const [Products, setProducts] = useState([]);
    
  const [categories, setCategories] = useState([]);

  return (
    <ProductContext.Provider value={{Products,setProducts,categories,setCategories}}>
    
    {children}
        
    </ProductContext.Provider>
  )

}

export {ProductContext, ProductProvider}





