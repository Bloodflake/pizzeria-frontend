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

  useEffect(()=>{
    const cart = window.localStorage.getItem('cart');
    setCart(JSON.parse(cart));
  }, []);

  useEffect(()=>{
    window.localStorage.setItem("cart", JSON.stringify(cart));
    // console.log("cart updated", cart);
  }, [cart]);

  return (
    <div>
      <BrowserRouter>
        <CartContext.Provider value={{cart, setCart}}>
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
