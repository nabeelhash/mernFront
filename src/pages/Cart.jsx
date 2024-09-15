import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { CartContext } from '../context/cart'

const Cart = () => {
    const { cart, setCart } = useContext(CartContext)
    const { auth, setAuth } = useContext(AuthContext)
    const [totalPrice, setTotalPrice] = useState(0)

    const remove = function (id) {
        const filter = cart.filter(cart => cart._id !== id)
        setCart(filter)
        localStorage.setItem('cart', JSON.stringify(filter))

    }

    useEffect(function () {
        let amount = 0
        const price = cart.map(cart => {
            amount += cart.price
        });
        setTotalPrice(amount)
    }, [cart])

    return (
        <div className='py-20 w-[80%] m-auto flex'>
            {cart.length > 0 ?
                <table class="table w-[70%]">
                    <thead>
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(cart => (
                            <tr key={cart._id}>
                                <td className='w-[50%] border-4'><img className='w-[50%]' src={`http://localhost:4000/${cart.image}`}></img></td>
                                <div className='w-[50%]'>
                                    <h1 className='text-2xl font-semibold'><td>{cart.name}</td></h1>
                                    <h1 className='text-lg'><td>{cart.des}</td></h1>
                                    <h1 className='text-xl font-semibold'><td>${cart.price}.00</td></h1>
                                    <button className="btn btn-danger" onClick={() => remove(cart._id)}>Remove</button>
                                </div>

                            </tr>
                        ))}
                    </tbody>
                </table>
                : ('No products found')}
            <div className='w-[30%] border-2 flex flex-col'>
            {totalPrice}

            {auth && auth.user ? (auth.user) :
                <Link to='/login'><button class='btn btn-dark'>Login before Checkout</button></Link>
            }
            </div>
        </div>
    )
}

export default Cart
