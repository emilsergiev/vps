import React from 'react'
import { Person } from 'blockstack'

const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png'

const Profile = ({ userData, handleSignOut }) => {
  const { username } = userData;
  const person = new Person(userData.profile)
  return (
    <div>
      <img src={ person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage } alt="avatar" />
      <h1>Hello, { person.name() || username || 'Nameless Person' }!</h1>
      <button onClick={ handleSignOut.bind(this) }>Logout</button>
    </div>
  )
}

export default Profile
