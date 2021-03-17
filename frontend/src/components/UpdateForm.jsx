import React,{useState,useEffect} from 'react'
import {useParams,useHistory} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { closeModalCharge, openModalCharge } from '../utils/charge'

const UpdateForm = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    ability: '',
    h_ability: '',
    habitat: '',
    img: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/95/latest/20160817212623/Charizard.png/200px-Charizard.png',
    type: ''
  })

  const history = useHistory()
  const {id} = useParams()

  // const getPokemon = async () => {
  //   try {
  //     openModalCharge()
  //     const {data} = await axios.get(`http://127.0.0.1:8080/api/pokemon/${id}`)
  //     setPokemon({
  //       name: data.name,
  //       ability: data.ability,
  //       h_ability: data.h_ability,
  //       habitat: data.habitat,
  //       img: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/95/latest/20160817212623/Charizard.png/200px-Charizard.png',
  //       type: data.type
  //     })
  //     closeModalCharge()
  //   } catch (error) {
  //     closeModalCharge()
  //     Swal.fire({
  //       title: 'Error',
  //       icon: 'error',
  //       html: `<span style="color: black">${error.message}</span>`
  //     })
  //   }
  // }

  // useEffect(() => {
  //   getPokemon()
  // },[])

  const manageSubmit = async e => {
    try {
      e.preventDefault()
      openModalCharge()
      const {data} = axios.put(`http://127.0.0.1:8080/api/pokemon/${id}`,pokemon)
      closeModalCharge()
      await Swal.fire({
        title: 'Listo',
        icon: 'success',
        html: `<span style="color: black">${data.name} actualizado</span>`
      })
      history.pushState('/')
    } catch (error) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `<span style="color: black">${error.message}</span>`
      })
    }
  }

  const manageInput = e => {
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="l-container">
      <div className="Form">
        <h1 className="Form__Title">Actualizar Pokemon</h1>
        <form onSubmit={manageSubmit}>
          <div className="Form__Img">
            <img src="https://firebasestorage.googleapis.com/v0/b/pokecrud-94f44.appspot.com/o/assets%2Fpikachu.png?alt=media&token=e7418a9f-5461-4295-b444-8a240b61a2e7" alt="Pikachu"/>
          </div>
          <div className="Form__ButtonImg">
            <input type="file" disabled/>
            <button>Subir Imagen <i className="fas fa-images"></i></button>
          </div>
          <input className="Form__Input" type="text" placeholder="Nombre" name="name" onInput={manageInput} value={pokemon.name} required/>
          <input className="Form__Input" type="text" placeholder="Habilidad" name="ability" onInput={manageInput} value={pokemon.ability} required/>
          <input className="Form__Input" type="text" placeholder="Habilidad Oculta" name="h_ability" onInput={manageInput} value={pokemon.h_ability} required/>
          <input className="Form__Input" type="text" placeholder="Habitat" name="habitat" onInput={manageInput} value={pokemon.habitat} required/>
          <input className="Form__Input" type="text" placeholder="Tipos" name="type" onInput={manageInput} value={pokemon.type} required/>
          <input type="submit" value="Añadir Pokemon"/>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm