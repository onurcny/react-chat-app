import Button from 'components/base/Button'
import Input from 'components/base/Input'
import { Socket } from 'Connection'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from 'store/UserSlice'

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    Socket.on("login", data => {
      dispatch(setUser(data))
      setDisabled(false)
    })
    return () => {
      Socket.off("login")
    }
  })

  const login = () => {
    setDisabled(true)
    Socket.emit("login", { username })
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-2 flex flex-col justify-center items-center gap-y-2 bg-gradient-to-t from-tertiary to-primary rounded-md border-tertiary border-2'>
        <h2 className='w-full text-center text-white font-semibold'>Hoşgeldin!</h2>
        <Input value={username} onChangeText={setUsername} />
        <Button disabled={disabled} onClick={login} title='Giriş Yap' />
      </div>
    </div>
  )
}
