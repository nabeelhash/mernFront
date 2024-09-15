import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../Navbar'
import { useContext } from 'react'
import { CartContext } from '../../context/cart'

const AllBlogs = () => {
    const [products, setProducts] = useState([]);
    const { cart, setCart } = useContext(CartContext)

    console.log(cart)

    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch('https://mern-back-three.vercel.app/allProducts', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }

                })
                if (!response.ok) {
                    console.log('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                toast.success('All Blogs Here')
                setProducts(result)

            }
            catch (error) {
                toast.error(`Login failed ${error.message}`)
                console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleDelete = async function (id) {
        const check = window.prompt('Are you sure?')
        if (!check) {
            return
        }
        console.log(id)
        try {
            const response = await fetch(`https://mern-back-three.vercel.app/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            })
            if (!response.ok) {
                console.log('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            const filter = products.filter(product => product._id !== id)
            setProducts(filter)
            toast.success('Product Deleted')

        }
        catch (error) {
            toast.error(`Failed ${error.message}`)
            console.log(error)
        }
    }
    

    const handleCart = function (p) {
        const check = cart.find(cart => cart._id === p._id)
        if (check) {
            return
        }
        const updateCart = [...cart,p]
        setCart(updateCart)
        localStorage.setItem('cart', JSON.stringify(updateCart))
    }

    return (
        <div className='bg-gray-300 h-full'>
            <Navbar />
            <div className='flex'>
                <Sidebar className='hidden md:block' />
                <div class="card w-[80%] flex flex-row flex-wrap justify-around items-center py-20" >
                    {products.map(product => (
                        <div key={product._id} className='w-[40%] md:w-[28%] mb-5 border-4 border-gray-200'>
                            <img className='w-[100%]' src={`https://mern-back-three.vercel.app/${product.image}`} />
                            <div class="card-body">
                                <h5 class="text-2xl font-bold ">{product.name}</h5>
                                <p class="text-lg font-medium ">{product.des}</p>
                                <p class="text-lg font-semibold ">${product.price}.00</p>
                                <p class="text-lg font-medium">Category: {product.category}</p>
                                <p class="text-lg font-medium">{product.stock}</p>
                                <div className='flex items-center justify-center gap-2'>
                                    <Link to={`/singleProduct/${product._id}`}><button className='btn btn-primary text-white transform transition-transform duration-200 hover:scale-105'>View Product</button></Link>
                                    <i onClick={() => handleDelete(product._id)} class="fa-solid fa-trash btn btn-primary text-white p-2"></i>
                                    <Link to={`/updateProduct/${product._id}`}><i class="fa-regular fa-pen-to-square btn btn-primary text-white p-2"></i></Link>
                                </div>
                                <Link><button onClick={() => handleCart(product)} className='btn btn-primary text-white transform transition-transform duration-200 hover:scale-105'>Add to cart</button></Link>


                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default AllBlogs
