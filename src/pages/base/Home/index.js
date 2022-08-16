import { Socket } from 'Connection'
import React, { useEffect, useRef, useState } from 'react'
import ChatList from './ChatList'
import ChatView from './ChatView'
import HomeHeader from './HomeHeader'

const MESSAGES = []

export default function HomePage({
  user
}) {
  const chatViewRef = useRef(null)
  const onSelectUser = u => {
    chatViewRef.current.setUser(u)
    chatViewRef.current.setMessages(MESSAGES.filter(x => x.room === u.id))
  }

  useEffect(() => {
    Socket.on("message", data => {
      console.log(data);
      MESSAGES.push(data)
    })
    return () => {
      Socket.off("message")
    }
  }, [])

  return (
    <div className='w-full h-full flex flex-col'>
      <HomeHeader user={user} />
      <div className='bg-primary flex-1 flex gap-x-[0.1rem]'>
        <ChatList user={user} onSelect={onSelectUser} />
        <ChatView ref={chatViewRef} />
      </div>
    </div>
  )
}
