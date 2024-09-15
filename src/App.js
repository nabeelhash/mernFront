import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminPage from './pages/AdminPage';
import UpdatePassword from './pages/UpdatePassword';
import Cart from './pages/Cart';
import { CartProvider } from './context/cart';
import Home from './pages/Home';
import ForgetPassword from './pages/ForgetPassword';
import Otp from './pages/Otp';
import User from './pages/User';
import Category from './pages/Category';
import AllProducts from './components/Products/AllProducts'
import SingleProduct from './components/Products/SingleProduct'
import UpdateProduct from './components/Products/UpdateProduct'
import CreateProduct from './components/Products/CreateProduct'
import { AuthProvider } from './context/authContext';

const App = () => {


    return (
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <Toaster />
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/admin' element={<AdminPage />}></Route>
                        <Route path='/profile' element={<Profile />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/update-password' element={<UpdatePassword />}></Route>
                        <Route path='/forget-password' element={<ForgetPassword />}></Route>
                        <Route path='/otp' element={<Otp />}></Route>
                        <Route path='/allproducts' element={<AllProducts />}></Route>
                        <Route path='/singleProduct/:id' element={<SingleProduct />}></Route>
                        <Route path='/updateProduct/:id' element={<UpdateProduct />}></Route>
                        <Route path='/cart' element={<Cart />}></Route>

                        <Route path='/user' element={<User />}></Route>
                        <Route path='/createProduct' element={<CreateProduct />}></Route>

                        <Route path='/createCategory' element={<Category />}></Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
};
export default App;