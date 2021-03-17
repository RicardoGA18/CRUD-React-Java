import React from 'react'
import Nav from '../components/Nav'
import AddForm from '../components/AddForm'

const AddView = () => {
  return (
    <div>
      <Nav ishome={false} />
      <AddForm />
    </div>
  )
}

export default AddView