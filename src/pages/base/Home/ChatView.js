import Input from 'components/base/Input'
import { Socket } from 'Connection'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { AiFillWechat } from "react-icons/ai"
import { BiSend } from "react-icons/bi"

let _messages = []

export default forwardRef(function ChatView({ }, ref) {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState("")

    useImperativeHandle(ref, () => ({
        setUser,
        setMessages
    }))

    const send = () => {
        console.log(user.id, message)
        Socket.emit("message", { to: user.id, message })
    }

    useEffect(() => {
        if (!user)
            return
        Socket.on("message", data => {
            if (data.room !== user.id)
                return
                
            _messages.push(data)
            setMessages([..._messages])
        })
        return () => {
            Socket.off("message")
        }
    }, [user])

    return (
        <div className='flex flex-1 flex-col'>
            <div className='flex-1 bg-secondary'>
                {!user ? (
                    <div className='w-full h-full flex items-center justify-center text-tertiary'>
                        <AiFillWechat size={30} />
                    </div>
                ) : (
                    <div className='w-full h-full flex flex-col'>
                        <div className='w-full h-[40px] flex justify-between items-center relative bg-gradient-to-t from-primary to-secondary overflow-hidden'>
                            <div className='w-20 h-full flex justify-center items-center text-white'>

                            </div>
                        </div>
                        <div id='customScrollBar' className='flex-1 overflow-y-scroll mt-0.5'>
                            {messages.map((m, i) => (
                                <MessageItem key={"messageitem" + i} side={m.sendBy === user.id} message={m} />
                            ))}
                        </div>
                        <div className='w-full h-16 p-2 bg-primary flex gap-x-2'>
                            <Input onChangeText={setMessage} width={"100%"} height={"100%"} />
                            <button
                                onClick={send}
                                className='w-12 h-12 bg-tertiary rounded-full border-2 border-secondary text-primary flex items-center justify-center hover:bg-secondary'>
                                <BiSend size={30} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
})

const MessageItem = ({
    side = true,
    message = ""
}) => {
    return (
        <div className={
            'w-full py-1 px-2 text-white text-opacity-50 bg-gradient-to-r mb-0.5 ' +
            (side ? 'text-left ' : 'text-right ') +
            (side ? 'from-primary to-secondary' : ' from-secondary to-primary')
        }>
            {message.message}
        </div>
    )
}