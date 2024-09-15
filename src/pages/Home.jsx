import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { React, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'


const Home = () => {
    const [category, setCategory] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('')
    const [filtered, setFiltered] = useState([])
    const [products, setProducts] = useState([]);
    const [name,setName] = useState('')


    useEffect(function () {
        const fetchData = async function () {
            try {
                const response = await fetch('http://localhost:4000/allProducts', {
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



    // const {auth,setAuth} = useContext(AuthContext)
    // console.log(JSON.stringify(auth))
    useEffect(function () {
        const fetchData = async function () {
            try {
                console.log('click')
                let response = await fetch('http://localhost:4000/categoryAll', {
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


    useEffect(function(){
        setFiltered(products)
        let filteredProduct = products
        if(selectedCategory){
            filteredProduct = filteredProduct.filter(product=>product.category === selectedCategory)
        }
        if(name){
            filteredProduct = filteredProduct.filter(product=>product.name.toLowerCase().includes(name.toLowerCase()))
        }
        
        setFiltered(filteredProduct)

    },[products,selectedCategory,name])
console.log(name)


    return (
        <div>
            <Navbar />
            <div className='flex'>
                {/* <div className='p-4'>
                    <p className='text-2xl font-semibold'>Categories</p>
                    {category.map(cat => (
                        <div>
                            <input type="checkbox" id={cat.id} name={cat.name} onChange={(e)=>handleCheck(e,cat.name)} className="form-check-input" />
                            <label htmlFor="cat">{cat.name}</label>
                        </div>

                    ))}
                </div> */}
                <div className='p-4'>
                    <select id="" value={selectedCategory} onChange={function(e){setSelectedCategory(e.target.value)}}>
                        {category.map(c => (
                            <option value={c.name}>{c.name}</option>
                        ))}
                    </select>
                    <input type="text" className='border-2' value={name} onChange={function(e){setName(e.target.value)}}/>
                </div>

                <Sidebar />
                <div class="card w-[80%] flex flex-row flex-wrap justify-around items-center py-20" >
                    {filtered.map(product => (
                        <div key={product._id} className='w-[40%] md:w-[28%] mb-5 border-4 border-gray-200'>
                            <img className='w-[100%]' src={`http://localhost:4000/${product.image}`} />
                            <div class="card-body">
                                <h5 class="text-2xl font-bold ">{product.name}</h5>
                                <p class="text-lg font-medium ">{product.des}</p>
                                <p class="text-lg font-semibold ">${product.price}.00</p>
                                <p class="text-lg font-medium">Category: {product.category}</p>
                                <p class="text-lg font-medium">{product.stock}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Home
