import React, { useState, useEffect } from 'react'
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io"
import { BsPeople } from "react-icons/bs"
import { Socket } from 'Connection'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { setOnlines } from 'store/OnlinesSlice'

export default function ChatList({
    onSelect = () => null
}) {
    const onlines = useSelector((state) => state.onlines.value)
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(true)
    const [index, setIndex] = useState(null)

    useEffect(() => {
        onSelect(onlines[index])
    }, [index])

    useEffect(() => {
        Socket.emit("onlines")
        Socket.on("onlines", data => {
            dispatch(setOnlines(data))
            let i = Array.from(data).findIndex(x => x.id === onlines[index].id)
            if(i > -1) {
                setIndex(i)
            }else {
                setIndex(null)
            }
        })
        return () => {
            Socket.off("onlines")
        }
    })


    return (
        <div className={(isOpen ? "w-72" : "w-[90px]") + ' max-h-full transition-all relative'}>
            <div className='h-20 flex bg-gradient-to-t from-primary to-secondary box-border justify-between items-center'>
                <div className='w-full h-full flex justify-between items-center relative bg-gradient-to-t from-primary to-secondary overflow-hidden'>
                    <div className='w-20 h-full flex justify-center items-center text-white'>
                        <FaUserCircle size={50} color={"rgba(255, 255, 255, 0.7)"} />
                    </div>
                    <div className='absolute w-52 h-20 left-20 top-0 flex flex-col justify-center items-start'>
                        <span className='text-white text-opacity-75 pl-3'>{user.username}</span>
                    </div>
                </div>
            </div>
            <button onClick={() => setIsOpen(prev => !prev)} className='relative w-full h-[40px] flex justify-between items-center bg-gradient-to-t from-primary to-secondary overflow-hidden'>
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
            <div className='w-full overflow-hidden'>
                <div id='customScrollBar' className='pt-[0px] w-full h-[calc(100vh-120px)] gap-y-[1px] overflow-y-scroll bg-gradient-to-r from-primary to-secondary overflow-x-hidden'>
                    {onlines.map((u, i) => u.id !== user.id && (
                        <ListItem key={"chatlistitem" + i} user={u} selected={index === i} onSelect={() => setIndex(i)} />
                    ))}
                </div>
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
                <span className='text-white text-opacity-25'>{user.message ?? "Hiç mesaj yok..."}</span>
            </div>
            {user.count > 0 ? <div className='absolute top-2 right-2 w-5 h-5 rounded-full bg-white bg-opacity-50 text-sm flex items-center justify-center text-primary font-semibold border-2 border-primary'>{user.count}</div> : null}

        </button>
    )
}
