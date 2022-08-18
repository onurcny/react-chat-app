import Input from 'components/base/Input'
import { Socket } from 'Connection'
import React, { useState } from 'react'
import { AiFillWechat } from "react-icons/ai"
import { BiSend } from "react-icons/bi"

export default function ChatView({ user, messages = [] }) {
    const [message, setMessage] = useState("")

    const send = () => {
        Socket.emit("message", { to: user.id, message })
        setMessage("")
    }

    return (
        <div className='w-full h-[calc(100vh-80px)] bg-secondary'>
            {!user ? (
                <div className='w-full h-full flex items-center justify-center text-tertiary'>
                    <AiFillWechat size={30} />
                </div>
            ) : (
                <div className='relative w-full h-full'>
                    <div className='w-full h-[40px] flex justify-between items-center relative bg-gradient-to-t from-primary to-secondary overflow-hidden'>
                        <div className='px-3 h-full flex justify-center items-center text-white'>
                            {user.username}
                        </div>
                    </div>
                    <div id='customScrollBar' className='w-full h-[calc(100vh-168px)] overflow-y-scroll'>
                        {messages.map((m, i) => (
                            <MessageItem key={"messageitem" + i} side={m.sendBy === user.id} message={m} />
                        ))}
                    </div>
                    <div className='w-full h-12 bg-primary flex items-center px-2 gap-x-2'>
                        <Input value={message} width={"100%"} height={"80%"} onChangeText={setMessage} />
                        <button
                            onClick={send}
                            className='w-10 h-10 bg-secondary rounded-full border-2 border-tertiary hover:bg-tertiary text-primary flex items-center justify-center'>
                            <BiSend size={30} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

const MessageItem = ({
    side = true,
    message = ""
}) => {
    return (
        <div className={
            'w-full py-1 px-2 text-white text-opacity-75 bg-gradient-to-r mb-1 flex ' +
            (side ? 'justify-start ' : 'justify-end ') +
            (side ? 'from-primary to-secondary' : ' from-secondary to-primary')
        }>
            <div className='max-w-[80%]'>
                {message.message}
            </div>
        </div>
    )
}