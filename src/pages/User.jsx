import React from 'react'
import UserInfo from '../components/UserInfo'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
const User = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex'>
        <Sidebar/>
        <UserInfo/>
      </div>
    </div>
  )
}

export default User
