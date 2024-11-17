import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const CartContext = createContext();
export default function CartContextProvider({ children }) {

  const [allProducts, setAllProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [CartId, setCartId] = useState(null)

  console.log('allProducts', allProducts);
  
   async function addToCart(productId) {
        return axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { "productId": productId },
        { headers: { token: localStorage.getItem("tkn"),}, } 
      )
      .then((resp)=>{
        // setNumOfCartItems(resp.data.numOfCartItems);
        // setAllProducts(resp.data.data.products);
        // setTotalCartPrice(resp.data.data.totalCartPrice);
        getUserCart()
        return true;
       })

     .catch ((erro) =>  {
      console.error("error");
      return false;
    })
  }

  function getUserCart() {
    axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers: { token: localStorage.getItem("tkn"), },
    }).then((res)=>{
      setNumOfCartItems(res.data.numOfCartItems);
      setAllProducts(res.data.data.products);
      setTotalCartPrice(res.data.data.totalCartPrice)
      setCartId(res.data.data._id)
    })
    .catch((error)=>{
      console.log('error ' ,error);
      
    })
  }
  useEffect(() => {
    getUserCart();
  }, [])


  function updateUserCart( productId , newCount ) {
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {"count": newCount},
    { headers: { token: localStorage.getItem("tkn"), }, })
    .then((res)=>{
      setNumOfCartItems(res.data.numOfCartItems);
      setAllProducts(res.data.data.products);
      setTotalCartPrice(res.data.data.totalCartPrice)
    })
    .catch((error)=>{
      console.log('error ' ,error);
    })
  }

  async function removeFromCart(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    { headers: { token: localStorage.getItem("tkn"), }, }
  ).then((res)=>{
    setNumOfCartItems(res.data.numOfCartItems);
    setAllProducts(res.data.data.products);
    setTotalCartPrice(res.data.data.totalCartPrice)
    getUserCart()
    return true;
  })
   .catch(()=>{
    console.error("error");
    return false;
   })
   
  }

  function clearUI() {
    setAllProducts(null);
    setTotalCartPrice(0);
    setNumOfCartItems(0);
    setCartId(null)

  }
  

  return (<CartContext.Provider
      value={{
        addToCart,
        allProducts,
        totalCartPrice,
        numOfCartItems,
        CartId,
        getUserCart,
        updateUserCart,
        removeFromCart,
        clearUI,
      }}
    >
      {children}
    </CartContext.Provider>
    )
}
  
