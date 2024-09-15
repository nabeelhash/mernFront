import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[20%] hidden md:block h-[100%] bg-gray-800 px-4 py-3 text-white'>
            <h1 className='text-2xl font-bold text-center'>Admin Panel</h1>
            <div className='my-4'>
                <Link to='/user'><p className='bg-gradient-to-r from-blue-600 to-purple-700 transform transition-transform duration-200 hover:scale-105 text-center p-2 rounded cursor-pointer text-xl'>User Info</p></Link>
            </div>
            <div className='my-4'>
                <Link to={'/createCategory'}><p className='bg-gradient-to-r from-blue-600 to-purple-700 transform transition-transform duration-200 hover:scale-105 text-center p-2 rounded cursor-pointer text-xl'>Create Category</p></Link>
            </div>
            <div className='my-4'>
                <Link to={'/createProduct'}><p className='bg-gradient-to-r from-blue-600 to-purple-700 transform transition-transform duration-200 hover:scale-105 text-center p-2 rounded cursor-pointer text-xl'>Create Product</p></Link>
            </div>
            <div className='my-4'>
                <Link to={'/allProducts'}><p className='bg-gradient-to-r from-blue-600 to-purple-700 transform transition-transform duration-200 hover:scale-105 text-center p-2 rounded cursor-pointer text-xl'>All Products</p></Link>
            </div>
        </div>
    )
}

export default Sidebar
