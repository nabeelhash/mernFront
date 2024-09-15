import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'


const CreateCategory = () => {
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [updateName, setUpdateName] = useState('')
    const [updateId,setUpdateId] = useState('')

    console.log(updateName)
    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('click')
                let response = await fetch('https://mern-back-nu.vercel.app/categoryAll', {
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

    const newCategory = async function (e) {
        e.preventDefault()
        try {
            console.log('click')
            let response = await fetch('https://mern-back-nu.vercel.app/category', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ name })
            })
            if (!response.ok) {
                return toast.error('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            setCategory(category => [...category, result])
            toast.success(`New Category '${result.name}' is added`)
        }
        catch (error) {
            return console.log(error)
        }
    }

    const updateCategory = async function () {
        try {
            console.log(updateId)
            let response = await fetch(`https://mern-back-nu.vercel.app/updateCategory/${updateId}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({ name: updateName })
            })
            if (!response.ok) {
                return toast.error('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            setCategory(prevCategories =>
                prevCategories.map(cat =>
                    cat._id === result._id ? result : cat
                )
            );            
            setUpdateName('')
            toast.success(`New Category '${result.name}' is added`)
        }
        catch (error) {
            return console.log(error)
        }
    }

    const handleDelete =async function(id){
        try {
            console.log(updateId)
            let response = await fetch(`https://mern-back-nu.vercel.app/deleteCategory/${id}`, {
                method: 'delete',
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            })
            if (!response.ok) {
                return toast.error('Something went wrong')
            }
            const result = await response.json();
            console.log(result)
            let filter = category.filter(cat=>cat._id !== id)
            setCategory(filter);            
            
            toast.success(`New Category '${result.name}' is added`)
        }
        catch (error) {
            return console.log(error)
        }
    }

    return (
        <div className='w-[80%] flex flex-col  justify-center items-center'>
            <div className='w-[70%] m-auto '>
                <div class="flex gap-1 items-center justify-center mb-4 mt-10">
                    <input type="text" value={name} onChange={function (e) { setName(e.target.value) }} className='border-2 border-gray-150 w-[50%] m-2 px-4 py-2 rounded' placeholder="Category" />
                    <button type="submit" onClick={newCategory} class=" btn bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-transform duration-200 hover:scale-105 py-2 m-2">Type Category</button>
                </div>
                <table class="table ">
                    <thead>
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map(category => (
                            <tr key={category._id}>
                                <td>{category.name}</td>
                                <td>
                                    <button onClick={()=>{
                                            setUpdateId(category._id);
                                            setUpdateName(category.name)}} data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-transform duration-200 hover:scale-105 mr-2'>Edit</button>
                                    <button onClick={()=>handleDelete(category._id)} className='btn btn bg-gradient-to-r from-orange-500 to-red-600 text-white transform transition-transform duration-200 hover:scale-105'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body flex">
                            <input type="text" value={updateName} onChange={function (e) { setUpdateName(e.target.value) }} className='border-2 border-gray-150 w-[70%] m-2 px-4 py-2 rounded' placeholder="Update Category" />
                            <button type="submit" onClick={updateCategory} class=" btn bg-gradient-to-r from-blue-500 to-purple-500 text-white transform transition-transform duration-200 hover:scale-105 py-2 m-2">Update</button>

                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}



export default CreateCategory
