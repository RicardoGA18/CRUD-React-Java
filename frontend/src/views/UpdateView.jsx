import React from 'react'
import Nav from '../components/Nav'
import UpdateForm from '../components/UpdateForm'

const UpdateView = () => {
  return (
    <div>
      <Nav ishome={false} />
      <UpdateForm />
    </div>
  )
}

export default UpdateView