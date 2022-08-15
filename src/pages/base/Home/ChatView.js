import React from 'react'
import { AiFillWechat } from "react-icons/ai"

export default function ChatView({
    user
}) {
    return (
        <div className='flex flex-1 flex-col gap-y-[0.1rem]'>
            <div className='w-full p-2 h-20 bg-gradient-to-t from-primary to-secondary box-border'></div>
            <div className='flex-1 bg-secondary'>
                {!user && (
                    <div className='w-full h-full flex items-center justify-center text-tertiary'>
                        <AiFillWechat size={300} />
                    </div>
                )}
            </div>
        </div>
    )
}
