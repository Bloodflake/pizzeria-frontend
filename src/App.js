import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Admin from "./pages/Admin"
import {CartContext} from "./pages/CartContext";
import {useState, useEffect} from "react";
import MyOrders from "./pages/MyOrders";
import SingleOrder from "./pages/SingleOrder";
import GuardedRoute from "./components/GuardedRoute";
import Spinner from "./components/Spinner";
import GuardedAdminRoute from "./components/GuardedAdminRoute";
import PageNotFound from "./pages/PageNotFound"

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
    //console.log("obtaining token from local storage", authToken);
    window.localStorage.setItem("authToken", JSON.stringify(authToken));
  }, [authToken]);

  return (
    <div>
      <BrowserRouter>
        <CartContext.Provider value={{cart, setCart, authToken, setAuthToken}}>
          <Navbar/>
          <Routes>
            <Route path ="/"  exact element={<Home/>}></Route>
            <Route path ="/cart"  exact element={<Cart/>}></Route>
            <Route path="/login"  exact element={<GuardedRoute component={Login} auth={false}/>}></Route>
            <Route path="/register"  exact element={<GuardedRoute component={Register} auth={false}/>}></Route>
            <Route path="/logout" exact  element={<GuardedRoute component={Logout} auth={true}/>}></Route>
            <Route path="/myOrders" exact  element={<GuardedRoute component={MyOrders} auth={true}/>}></Route>
            <Route path="/myOrders/:id" exact element={<GuardedRoute component={SingleOrder} auth={true}/>}></Route>
            {/* <Route path="/admin" element={<Admin/>}></Route> */}
            <Route path="/admin" exact  element={<GuardedAdminRoute/>}></Route>
            <Route path="/products" exact  element={<Products/>}></Route>
            <Route path="/products/:id" exact element={<SingleProduct/>}></Route>
            <Route path="*" element={<PageNotFound/>}></Route>
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
