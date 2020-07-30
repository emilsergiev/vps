import React from 'react'
import { useConnect } from '@blockstack/connect'

const Signin = () => {
  const { doOpenAuth } = useConnect()

  return (
    <div>
      <h1>Welcome to The View Point Site!</h1>
      <button onClick={() => doOpenAuth()}>Sign In</button>
    </div>
  )
}

export default Signin
