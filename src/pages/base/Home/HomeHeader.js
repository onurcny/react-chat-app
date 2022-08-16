import { Socket } from 'Connection'
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'

export default function HomeHeader({ user }) {
    
    const logout = () => {
        Socket.emit("logout")
    }

    return (
        <div className='w-full h-20 flex gap-x-0.5'>
            <div className='h-full flex bg-gradient-to-t from-primary to-secondary box-border justify-between items-center'>
                <div className='w-full h-full flex justify-between items-center relative bg-gradient-to-t from-primary to-secondary overflow-hidden'>
                    <div className='w-20 h-full flex justify-center items-center text-white'>
                        {/* <img className='h-16 w-16 rounded-full border-gray-300 border-2 p-0.5' src="https://media-exp1.licdn.com/dms/image/C4E03AQEcGurc54owig/profile-displayphoto-shrink_200_200/0/1556197991582?e=2147483647&v=beta&t=eRFOyDUnUCNLNAoIG2tj-KRKn6MR08A1cw_-pgsKPdQ" /> */}
                        <FaUserCircle size={50} color={"rgba(255, 255, 255, 0.7)"} />
                    </div>
                    <div className='w-52 h-20 left-20 top-0 flex flex-col justify-center items-start'>
                        <span className='text-white text-opacity-75 pl-3'>{user.username}</span>
                    </div>
                </div>
            </div>
            <div className='w-full px-3 h-20 bg-gradient-to-t from-primary to-secondary flex items-center justify-between'>
                <div />
                <div />
                <button onClick={logout} className='bg-red-900 text-white px-2 py-0.5 rounded'>Çıkış Yap</button>
            </div>
        </div>
    )
}
