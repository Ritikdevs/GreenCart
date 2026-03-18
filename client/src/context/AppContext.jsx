import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();//context obj create krne ke liye //useContext hook context ka data acces krne ke liye

export const AppContextProvider=({children})=>{

    const currency= import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user,setUser]= useState(false);
    const [isSeller,setIsSeller]= useState(false);
    const [showUserLogin,setShowUserLogin]= useState(false);
    const[products,setProducts]=useState([]);
    const [cartItems,setCartItems]=useState({});
    const[searchQuery,setSearchQuery]= useState({})
    


    //Fetch all Products
    const fetchProducts= async ()=>{
        setProducts(dummyProducts)
    }

 //Add product to cart

 const addToCart=(itemId)=>{
    let cartData=structuredClone(cartItems);

    if(cartData[itemId]){
        cartData[itemId]+=1;
    }else{
        cartData[itemId]=1;
    }

    setCartItems(cartData);
    toast.success("Added to Cart")
 }


 //update cart item quantity

 const updateCartItem=(itemId,quantity)=>{
   let cartData=structuredClone(cartItems);
   cartData[itemId]=quantity;
   setCartItems(cartData);
   toast.success("Cart Updated")
 }

 //Remove product from cart

 const removeFromCart=(itemId)=>{
  let cartData=structuredClone(cartItems);
  if(cartData[itemId]){
    cartData[itemId]-=1;
    if(cartData[itemId]===0){
        delete cartData[itemId];
    }
  }
   toast.success("Message Remove from cart");
   setCartItems(cartData)
 }

    useEffect(()=>{
    fetchProducts()
    },[])


    const value = {
       navigate,
       user,setUser,setIsSeller,isSeller,showUserLogin,setShowUserLogin,products,currency,
       addToCart,updateCartItem,removeFromCart,cartItems,currency,searchQuery,setSearchQuery
    }
   return <AppContext.Provider value={value}>
    {children}
   </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}