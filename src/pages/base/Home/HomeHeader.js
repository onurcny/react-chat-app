import { Socket } from 'Connection'
import React from 'react'

export default function HomeHeader() {
    
    const logout = () => {
        Socket.disconnect()
        Socket.connect()
    }

    return (
        <div className='w-full h-20 flex gap-x-0.5'>
            <div className='w-full px-3 h-20 bg-gradient-to-t from-primary to-secondary flex items-center justify-between'>
                <div />
                <div />
                <button onClick={logout} className='bg-red-900 text-white px-2 py-0.5 rounded'>Çıkış Yap</button>
            </div>
        </div>
    )
}
