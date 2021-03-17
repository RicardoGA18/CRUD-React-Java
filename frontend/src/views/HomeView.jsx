import React from 'react'
import Nav from '../components/Nav'

const HomeView = () => {
  return (
    <div>
      <Nav ishome={true} />
      <h1>Home</h1>
    </div>
  )
}

export default HomeView