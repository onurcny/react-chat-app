import { Socket } from 'Connection'
import React, { useEffect, useRef, useState } from 'react'
import ChatList from './ChatList'
import ChatView from './ChatView'
import HomeHeader from './HomeHeader'

let me

export default function HomePage({
  user
}) {
  const [u, setU] = useState(null)
  const [allMessages, setAllMessages] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    Socket.on("message", data => {
      setAllMessages(prev => [...prev, data])
    })
    return () => {
      Socket.off("message")
    }
  }, [])

  useEffect(() => {
    if (!u)
      return
    setMessages(Array.from(allMessages.filter(x => x.room === u.id)))
  }, [allMessages, u])

  return (
    <div className='w-full h-full flex gap-x-0.5'>
      <ChatList user={user} onSelect={setU} />
      <div className='bg-primary flex-1 flex-col gap-x-[0.1rem]'>
        <HomeHeader user={user} />
        <ChatView user={u} messages={messages} />
      </div>
    </div>
  )
}
