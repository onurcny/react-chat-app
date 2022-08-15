import React, { useEffect, useState } from 'react'
import ChatList from './ChatList'
import ChatView from './ChatView'

export default function HomePage() {
  const [users, setUsers] = useState(["asdf","asdf","asdf"])
  const [index, setIndex] = useState(null)

  useEffect(() => {
      console.log(index)
  }, [index])

  return (
    <div className='bg-primary w-full h-full flex gap-x-[0.1rem]'>
      <ChatList onIndexChange={setIndex} />
      <ChatView user={users[index]} />
    </div>
  )
}
