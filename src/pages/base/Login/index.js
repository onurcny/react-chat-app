import Button from 'components/base/Button'
import Input from 'components/base/Input'
import React, { useEffect, useState } from 'react'

export default function LoginPage({
  onLogin = () => null
}) {
  const [username, setUsername] = useState("")

  const login = () => {
    onLogin({
      username
    })
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='p-2 flex flex-col justify-center items-center gap-y-2 bg-gradient-to-t from-tertiary to-primary rounded-md border-tertiary border-2'>
        <h2 className='w-full text-center text-white font-semibold'>Welcome!</h2>
        <Input onChangeText={setUsername} />
        <Button onClick={login} title='Login' />
      </div>
    </div>
  )
}
