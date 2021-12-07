import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import {CartContext} from "./pages/CartContext";
import {useState, useEffect} from "react";

function App() {
  const [cart, setCart] = useState({});
  const [authToken, setAuthToken] = useState({
    auth: "",
    refresh: ""
  })

  useEffect(()=>{
    let cart = window.localStorage.getItem('cart');
    let authToken = window.localStorage.getItem("authToken");

    if(authToken === null){
      authToken = {
        auth: "",
        refresh: ""
      }

      setAuthToken(authToken);
    }else{
      setAuthToken(JSON.parse(authToken));
    }

    if(cart === null){
      cart = {}
      setCart(cart);
    }else{
      setCart(JSON.parse(cart));
    }

    
    
  }, []);

  useEffect(()=>{
    window.localStorage.setItem("cart", JSON.stringify(cart));
    // console.log("cart updated", cart);
  }, [cart]);


  useEffect(()=>{
    console.log("obtaining token from local storage", authToken);
    window.localStorage.setItem("authToken", JSON.stringify(authToken));
  }, [authToken]);

  return (
    <div>
      <BrowserRouter>
        <CartContext.Provider value={{cart, setCart, authToken, setAuthToken}}>
          <Navbar/>
          <Routes>
            <Route path ="/" element={<Home/>}></Route>
            <Route path ="/cart" element={<Cart/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/products" element={<Products/>}></Route>
            <Route path="/products/:id" exact element={<SingleProduct/>}></Route>
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
