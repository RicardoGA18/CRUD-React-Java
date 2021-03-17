import React from 'react'
import {Link} from 'react-router-dom'
import getColorByType from '../utils/getColorByType'
import axios from 'axios'
import {openModalCharge,closeModalCharge} from '../utils/charge'
import Swal from 'sweetalert2'

const Card = ({id,img,name,ability,h_ability,habitat,type,refreshPokemons}) => {
  const deletePokemon = async () => {
    const result = await Swal.fire({
      title: '¿Seguro?',
      html: '<span style="color: black">Eliminarás este pokemon</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínalo',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    })
    if(result.isConfirmed){
      try {
        openModalCharge()
        const {data} = await axios.delete(`http://127.0.0.1:8080/api/pokemon/${id}`)
        refreshPokemons(data.id)
        closeModalCharge()
        await Swal.fire({
          title: 'Listo',
          icon: 'success',
          html: `<span style="color: black">Pokemon eliminado</span>`
        })
      } catch (error) {
        closeModalCharge()
        Swal.fire({
          title: 'Error',
          icon: 'error',
          html: `<span style="color: black">${error.message}</span>`
        })
      }
    }
  }

  return (
    <div>
      <div className="Card" style={{ backgroundColor: getColorByType(type) }}>
        <Link to={`/edit/${id}`}>
          <div className="Card__Edit">
            <i className="fas fa-pencil-alt"></i>
          </div>
        </Link>
        <div className="Card__Delete" onClick={deletePokemon}>
          <i className="fas fa-trash-alt"></i>
        </div>
        <p className="Card__Name">{name}</p>
        <div className="Card__Img">
          <img src={img} alt={name}/>
        </div>
        <p className="Card__Subtitle">Datos</p>
        <div className="Card__Info">
          <div className="Card__Info-Item">
            <div className="Card__Info-Key">
              <p>Tipo</p>
            </div>
            <div className="Card__Info-Value">
              <p>{type}</p>
            </div>
          </div>
          <div className="Card__Info-Item">
            <div className="Card__Info-Key">
              <p>Habilidad</p>
            </div>
            <div className="Card__Info-Value">
              <p>{ability}</p>
            </div>
          </div>
          <div className="Card__Info-Item">
            <div className="Card__Info-Key">
              <p>Hab. oculta</p>
            </div>
            <div className="Card__Info-Value">
              <p>{h_ability}</p>
            </div>
          </div>
          <div className="Card__Info-Item">
            <div className="Card__Info-Key">
              <p>Hábitat</p>
            </div>
            <div className="Card__Info-Value">
              <p>{habitat}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card