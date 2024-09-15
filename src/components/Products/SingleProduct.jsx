import { React, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleBlog = () => {
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const [img,setImg] = useState('')
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState([])
    const [stock, setStock] = useState()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch(`https://mern-back-nu.vercel.app/single/${id}`, {
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



    return (
        <div className='flex flex-col items-center justify-center bg-gray-300'>
            <Navbar/>
            <div className='flex flex-col items-center py-10 px-20'>
                <p className='text-4xl text-center font-bold mb-5'>{name}</p>
                <p className='text-xl text-left font-medium mb-3'>{des}</p>
                <p className='text-xl text-left font-medium mb-3'>{price}</p>
                <p className='text-xl text-left font-medium mb-3'>{stock}</p>
                <img className='mb-3 w-[50%]' src={`http://localhost:4000/${img}`}></img>
            </div>

        </div>
    )
}

export default SingleBlog
