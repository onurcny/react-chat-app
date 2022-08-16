import React, { useState, useEffect } from 'react'
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io"
import { BsPeople } from "react-icons/bs"
import { Socket } from 'Connection'
import { FaUserCircle } from 'react-icons/fa'

export default function ChatList({
    onSelect = () => null,
    user = {
        username: null,
        id: null
    }
}) {
    const [users, setUsers] = useState([])
    const [isOpen, setIsOpen] = useState(true)
    const [index, setIndex] = useState(null)

    useEffect(() => {
        onSelect(users[index])
    }, [index])

    useEffect(() => {
        Socket.emit("onlines")
        Socket.on("onlines", data => {
            setUsers(Array.from(data).filter(x => x.id !== user.id))
        })
        return () => {
            Socket.off("onlines")
        }
    }, [])

    return (
        <div className={(isOpen ? "w-72" : "w-[90px]") + ' h-full flex flex-col transition-all'}>
            <button onClick={() => setIsOpen(prev => !prev)} className='w-full h-[40px] flex justify-between items-center relative bg-gradient-to-t from-primary to-secondary overflow-hidden'>
                <div className='w-16 h-full flex justify-center items-center text-white'>
                    <BsPeople size={20} />
                </div>
                <div className='absolute w-52 h-full left-20 top-0 flex flex-col justify-center items-start ml-3'>
                    <span className='text-white text-opacity-75'>Çevrimiçi</span>
                </div>
                <div className='w-[20px] h-full bg-primary text-white flex items-center justify-center'>
                    {isOpen ?
                        <IoMdArrowDropleft size={20} /> :
                        <IoMdArrowDropright size={20} />
                    }
                </div>
            </button>
            <div id='customScrollBar' className='flex-1 gap-y-[1px] overflow-y-scroll bg-gradient-to-r from-primary to-secondary overflow-x-hidden'>
                {users.map((u, i) => (
                    <ListItem key={"chatlistitem" + i} user={u} selected={index == i} onSelect={() => setIndex(i)} />
                ))}
            </div>
        </div>
    )
}

const ListItem = ({
    user,
    onSelect,
    selected
}) => {
    return (
        <button onClick={onSelect} className={
            'w-full h-20 flex justify-between items-center my-[1px] relative ' +
            (selected ? "bg-secondary" : "bg-gradient-to-r from-primary to-primary hover:to-secondary")
        }>
            {selected && <div className='absolute top-0 left-0 w-1 h-full bg-white bg-opacity-50' />}
            <div className='w-20 h-20 flex justify-center items-center'>
                {/* <img className='h-16 rounded-full border-gray-300 border-2 p-0.5' src="https://media-exp1.licdn.com/dms/image/C4E03AQEcGurc54owig/profile-displayphoto-shrink_200_200/0/1556197991582?e=2147483647&v=beta&t=eRFOyDUnUCNLNAoIG2tj-KRKn6MR08A1cw_-pgsKPdQ" /> */}
                <FaUserCircle size={50} color={"rgba(255, 255, 255, 0.7)"} />
            </div>
            <div className='absolute w-52 h-20 left-20 top-0 flex flex-col justify-center items-start ml-3'>
                <span className='text-white text-opacity-75'>{user.username}</span>
                <span className='text-white text-opacity-25'>Hiç mesaj yok.</span>
            </div>
        </button>
    )
}
