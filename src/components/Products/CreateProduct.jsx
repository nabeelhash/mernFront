import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../Sidebar'

import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '../Navbar'

const CreateProduct = () => {
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')

    const [stock, setStock] = useState()
    const [file, setFile] = useState(null)
    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('click')
                let response = await fetch('https://mern-back-three.vercel.app/categoryALl', {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                })
                if (!response.ok) {
                    return toast.error('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                toast.success('User Info')
                setCategory(result)
            }
            catch (error) {
                return console.log(error)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async function (e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('pic', file)
        formData.append('name', name)
        formData.append('des', des)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('category', selectedCategory)

        try {
            console.log('click')
            let response = await fetch('https://mern-back-three.vercel.app/createProduct', {
                method: 'POST',
                credentials: 'include',
                body: formData
            })
            if (!response.ok) {
                return toast.error('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            toast.success('User Info')
            setName('')
            setDes('')
            setPrice('')
            setStock('')
            setFile(null)
        }
        catch (error) {
            return console.log(error)
        }
    }

    console.log(selectedCategory)
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <Sidebar />

                <div className='flex flex-col items-center py-10 px-20 w-[80%]'>
                    <div className='flex gap-3 items-center justify-center'>
                        <h1 className='text-lg font-semibold'>Select Category</h1>
                        <select value={selectedCategory} onChange={function (e) { setSelectedCategory(e.target.value) }} className='px-4 py-2'>
                            {category.map(category => (
                                <option value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
            
                    <div class="flex flex-col w-full">
                        <label for="exampleInputEmail1" class="form-label">Product Name</label>
                        <input type="email" className='h-[50px] rounded w-full px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={name}
                            onChange={function (e) { setName(e.target.value) }} aria-describedby="emailHelp" />
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="exampleInputEmail1" class="form-label">Description</label>
                        <textarea type="email" className='bg-gray-200 h-[300px] rounded w-full px-3 py-2 border-gray-500 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={des}
                            onChange={function (e) { setDes(e.target.value) }} aria-describedby="emailHelp" />
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="exampleInputEmail1" class="form-label">Price</label>
                        <input type="Number" className=' h-[50px] rounded w-full px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={price}
                            onChange={function (e) { setPrice(e.target.value) }} aria-describedby="emailHelp" />
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="exampleInputEmail1" class="form-label">Stock</label>
                        <input type="Number" className=' h-[50px] rounded w-full px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={stock}
                            onChange={function (e) { setStock(e.target.value) }} aria-describedby="emailHelp" />
                    </div>
                    <div class='flex flex-row gap-2'>
                        <label htmlFor="Image">Image</label>
                        <input type='file' accept='image/*' onChange={function (e) { setFile(e.target.files[0]) }}></input>

                    </div>

                    <button className='text-white bg-black rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700' onClick={handleSubmit}>Create Product</button>


                    {/* <img className='mb-3 w-[50%]' src={`http://localhost:4000/${img}`}></img> */}
                </div>
            </div>
        </div>
    )
}

export default CreateProduct
