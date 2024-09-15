import React from 'react'
import CreateCategory from '../components/CreateCategory'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Category = () => {
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <Sidebar />
                <CreateCategory />
            </div>

        </div>
    )
}

export default Category
