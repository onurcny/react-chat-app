import { Socket } from 'Connection'
import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import ChatView from './ChatView'
import HomeHeader from './HomeHeader'

export default function HomePage() {
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

  const onSelect = u => {
    setU(u)
  }

  return (
    <div className='w-full h-full flex gap-x-0.5'>
      <ChatList onSelect={onSelect} />
      <div className='bg-primary flex-1 flex-col gap-x-[0.1rem]'>
        <HomeHeader />
        <ChatView user={u} messages={messages} />
      </div>
    </div>
  )
}
