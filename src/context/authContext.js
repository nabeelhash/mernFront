import React, { useState, useEffect } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = function ({ children }) {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })
    useEffect(function () {
        const getAuth = localStorage.getItem('auth')
        if (getAuth) {
            const parseAuth = JSON.parse(getAuth)
            setAuth(parseAuth)
        }
    },[])


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

