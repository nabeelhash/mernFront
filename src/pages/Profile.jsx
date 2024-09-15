import React from 'react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { useContext } from 'react';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [img, setImg] = useState('')
    const [posts,setPosts] = useState([])
    const {auth,setAuth} = useContext(AuthContext)

    console.log(auth)
    const navigate = useNavigate()
    useEffect(function () {
        const checkLogin = localStorage.getItem('auth')
        if (!checkLogin) {
            navigate('/login')
        }
    })


    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('click')
                let response = await fetch('https://mern-back-nu.vercel.app/current', {
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
                setName(result.name);
                setEmail(result.email)
                setImg(result.avatar)
            }
            catch (error) {
                return console.log(error)
            }
        }
        fetchData()
    }, [])

    
    const handleUpload = async function (e) {
        const file = e.target.files[0]
        try {
            const formData = new FormData();
            formData.append('pic', file)
            // Upload the image to the server
            let response = await fetch('https://mern-back-nu.vercel.app/updateAvatar', {
                method: 'PATCH',
                body: formData,
                credentials: 'include',
            });
            if (!response.ok) {
                return toast.error('Image upload failed');
            }
            const result = await response.json()
            setImg(result.avatar)
            console.log(result.avatar)
            toast.success('Image uploaded successfully');
        }
        catch (error) {
            console.log(error);
            toast.error('An error occurred');
        }
    }

    const imgUrl = `http://localhost:4000/${img}`
    return (
        <div className='bg-gray-300 h-full'>
            <Navbar />
            <div className='flex h-[90%]'>
               <Sidebar/>
                               
                    <div className='w-[80%] flex flex-col justify-start items-start m-auto my-3 py-10'>
                    <h1 className='mb-20 text-[52px] font-bold text-center w-full bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text'>User Profile Info</h1>
                    <div className='flex justify-around w-full border-red-400'>
                        <div className='flex flex-col'>
                            <div className='flex flex-col gap-2 my-2'>
                                <p className='text-4xl font-semibold'>Username</p>
                                <h1 className='text-xl bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text'>{name}</h1>
                            </div>
                            <div className='flex flex-col gap-2 my-2'>
                                <p className='text-4xl font-semibold'>Email</p>
                                <h1 className='text-xl bg-gradient-to-r from-purple-700 to-blue-600 text-transparent bg-clip-text'>{email}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 my-2'>
                            <p className='text-4xl font-semibold'>Profile Image</p>
                            <input type='file' accept='image/' onChange={handleUpload}></input>
                            {imgUrl}
                            <img src={imgUrl} style={{ width: '200px' }}></img>
                        </div>
                    </div>
                    <div>
                        {posts.map(post=>(
                            <div>
                                <h1 className='text-2xl font-semibold'>{post.title}</h1>
                                {post.description}
                                <img className='w-[20%]' src={`http://localhost:4000/${post.postImage}`}></img>
                            </div>
                        ))}
                    </div>
                </div>

            </div>


        </div>
    )
}

export default Profile
