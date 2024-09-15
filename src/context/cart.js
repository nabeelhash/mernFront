import React, { useState, useEffect } from 'react'
import { createContext } from 'react'

export const CartContext = createContext()

export const CartProvider = function ({ children }) {
    const [cart, setCart] = useState([])

    useEffect(function () {
        let checkItems = localStorage.getItem('cart')
        console.log(JSON.parse(checkItems))
        const parsedCart = JSON.parse(checkItems);
        if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
        } else {
            setCart([]);
        }
    }, [])

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}

        </CartContext.Provider>
    )
}


