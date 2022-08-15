import React, { useState, useEffect } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { BsPeople } from "react-icons/bs"

export default function ChatList({
    onIndexChange = () => null,
    user = {
        username: "default"
    }
}) {
    const [isOpen, setIsOpen] = useState(true)
    const [index, setIndex] = useState(null)

    useEffect(() => {
        onIndexChange(index)
    }, [index])

    return (
        <div className={(isOpen ? "w-72" : "w-20") + ' h-full gap-y-[0.1rem] flex flex-col transition-all'}>
            <div className='relative w-full h-20 flex bg-gradient-to-t from-primary to-secondary box-border justify-between items-center'>
                <div className='w-20 h-20 flex justify-center items-center'>
                    <img className='h-16 w-16 rounded-full border-gray-300 border-2 p-0.5' src="https://media-exp1.licdn.com/dms/image/C4E03AQEcGurc54owig/profile-displayphoto-shrink_200_200/0/1556197991582?e=2147483647&v=beta&t=eRFOyDUnUCNLNAoIG2tj-KRKn6MR08A1cw_-pgsKPdQ" />
                </div>
                <div className='absolute w-52 h-20 left-20 top-0 flex flex-col justify-center items-start'>
                    <span className='text-white text-opacity-75'>{user.username}</span>
                    <span className='text-white text-opacity-25'>Hiç mesaj yok.</span>
                </div>
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    className='h-20 bg-tertiary text-white flex items-center justify-center absolute top-0 -right-8'>
                    {isOpen ? <MdKeyboardArrowLeft size={30} /> : <MdKeyboardArrowRight size={30} />}
                </button>
            </div>
            <div id='chatList' className='flex-1 gap-y-[1px] overflow-y-scroll bg-gradient-to-r from-primary to-secondary overflow-x-hidden'>
                <div className='w-full h-10 flex justify-between items-center my-[1px] relative bg-gradient-to-t from-primary to-secondary'>
                    <div className='w-20 h-10 flex justify-center items-center text-white'>
                        <BsPeople size={30} />
                    </div>
                    <div className='absolute w-52 h-10 left-20 top-0 flex flex-col justify-center items-start'>
                        <span className='text-white text-opacity-75'>Online Users</span>
                    </div>
                </div>
                {[...new Array(50)].map((_, i) => (
                    <ListItem key={"chatlistitem" + i} selected={index == i} onSelect={() => setIndex(i)} />
                ))}
            </div>
        </div>
    )
}

const ListItem = ({
    onSelect,
    selected
}) => {
    return (
        <button onClick={onSelect} className={
            'w-full h-20 flex justify-between items-center my-[1px] relative ' +
            (selected ? "bg-secondary" : "bg-gradient-to-r from-primary to-primary hover:to-secondary")
        }>
            <div className='w-20 h-20 flex justify-center items-center'>
                <img className='h-16 rounded-full border-gray-300 border-2 p-0.5' src="https://media-exp1.licdn.com/dms/image/C4E03AQEcGurc54owig/profile-displayphoto-shrink_200_200/0/1556197991582?e=2147483647&v=beta&t=eRFOyDUnUCNLNAoIG2tj-KRKn6MR08A1cw_-pgsKPdQ" />
            </div>
            <div className='absolute w-52 h-20 left-20 top-0 flex flex-col justify-center items-start'>
                <span className='text-white text-opacity-75'>username</span>
                <span className='text-white text-opacity-25'>Hiç mesaj yok.</span>
            </div>
        </button>
    )
}
