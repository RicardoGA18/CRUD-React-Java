import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ({ishome}) => {
  const setButton = () => {
    if(ishome){
      return (
        <Link to="/add">
          <button className="Nav__Button">
            Añadir
            <i className="fas fa-plus-circle"></i>
          </button>
        </Link>
      )
    }else{
      return <></>
    }
  }

  return ( 
    <nav className="Nav l-container">
      <div className="l-contain">
        <Link to="/">
          <div className="Nav__Logo">
            <img src="https://firebasestorage.googleapis.com/v0/b/pokecrud-94f44.appspot.com/o/assets%2Fpokeball.png?alt=media&token=a5725300-2d46-4ee3-8d20-1b5842897adb" alt="Pokeball"/>
            <p>PokeCRUD</p>
          </div>
        </Link>
        {setButton()}
      </div>
    </nav>
  )
}

export default Nav