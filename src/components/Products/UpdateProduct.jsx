import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UpdateBlog = () => {
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [img, setImg] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')

    const [category, setCategory] = useState([])
    const [stock, setStock] = useState()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch(`http://localhost:4000/single/${id}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!response.ok) {
                    console.log('Something went wrong')
                }
                const result = await response.json();
                console.log(result)
                toast.success('Successful')
                setName(result.name)
                setDes(result.des)
                setImg(result.image)
                setPrice(result.price)
                setStock(result.stock)

            }
            catch (error) {
                toast.error(`Failed ${error.message}`)
                console.log(error)
            }
        }
        fetchData()
    }, [])

    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('click')
                let response = await fetch('http://localhost:4000/categoryALl', {
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
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('pic', file); // Append file to FormData
            formData.append('title', title);
            formData.append('description', description);
            const response = await fetch(`http://localhost:4000/updatePost/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                body: formData
            })
            if (!response.ok) {
                toast.error('error')
                return console.log('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            toast.success('Post Updated Successfully')
            navigate('/allposts')
        }
        catch (error) {
            console.log(error.message)
        }
    }




    return (
        <div className='flex flex-col items-center justify-center bg-gray-300'>
            <Navbar />
            <div className='flex flex-col items-center py-10 px-20'>
                <div className='flex gap-3 items-center justify-center'>
                    <h1 className='text-lg font-semibold'>Select Category</h1>
                    <select value={selectedCategory} onChange={function (e) { setSelectedCategory(e.target.value) }} className='px-4 py-2'>
                        {category.map(category => (
                            <option value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div class="flex flex-col w-full">
                    <label for="exampleInputEmail1" class="form-label">Title</label>
                    <input type="email" className='bg-pink-300 h-[50px] rounded w-full px-3 py-2 border-gray-200 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={name}
                        onChange={function (e) { setName(e.target.value) }} aria-describedby="emailHelp" />
                </div>
                <div class="flex flex-col w-full">
                    <label for="exampleInputEmail1" class="form-label">Description</label>
                    <textarea type="email" className='bg-gray-200 h-[300px] rounded w-full px-3 py-2 border-gray-500 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={des}
                        onChange={function (e) { setDes(e.target.value) }} aria-describedby="emailHelp" />
                </div>
                <div class="flex flex-col w-full">
                    <label for="exampleInputEmail1" class="form-label">Price</label>
                    <textarea type="email" className='bg-gray-200 h-[300px] rounded w-full px-3 py-2 border-gray-500 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={price}
                        onChange={function (e) { setPrice(e.target.value) }} aria-describedby="emailHelp" />
                </div>
                <div class="flex flex-col w-full">
                    <label for="exampleInputEmail1" class="form-label">Description</label>
                    <input type="email" className='bg-gray-200 h-[300px] rounded w-full px-3 py-2 border-gray-500 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={stock}
                        onChange={function (e) { setStock(e.target.value) }} aria-describedby="emailHelp" />
                </div>
                <div class="flex flex-col w-full">
                    <label for="exampleInputEmail1" class="form-label">Description</label>
                    <input type="email" className='bg-gray-200 h-[300px] rounded w-full px-3 py-2 border-gray-500 border-[2px] mt-1 mb-2' placeholder='Type Your Blog Title' id="exampleInputEmail1" value={des}
                        onChange={function (e) { setDes(e.target.value) }} aria-describedby="emailHelp" />
                </div>
                <input type='file' accept='image/*' onChange={function (e) { setFile(e.target.files[0]) }}></input>

                <button className='text-white bg-black rounded px-4 py-2 transform transition-transform duration-200 hover:scale-110 hover:bg-blue-700' onClick={handleSubmit}>Update Blog</button>


                <img className='mb-3 w-[50%]' src={`http://localhost:4000/${img}`}></img>
            </div>
        </div>
    )
}
export default UpdateBlog
