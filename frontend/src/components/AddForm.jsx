import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import {openModalCharge,closeModalCharge} from '../utils/charge'
import {storage} from '../firebase'

const AddForm = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    ability: '',
    h_ability: '',
    habitat: '',
    img: null,
    type: ''
  })

  const history = useHistory()

  const manageSubmit = async e => {
    try {
      e.preventDefault()
      openModalCharge()
      const refStorage = storage.ref(`pokemons/${pokemon.img[0].name}`)
      const url = await subirAvatar(pokemon.img[0],refStorage)
      const {data} = await axios.post('http://127.0.0.1:8080/api/pokemon', {
        ...pokemon,
        img: url
      })
      closeModalCharge()
      await Swal.fire({
        title: 'Listo',
        icon: 'success',
        html: `<span style="color: black">${data.name} agregado</span>`
      })
      history.push('/')
    } catch (error) {
      closeModalCharge()
      Swal.fire({
        title: 'Error',
        icon: 'error',
        html: `<span style="color: black">${error.message}</span>`
      })
    }
  }

  const subirAvatar = (imagen,refStorage) => {
    return new Promise((resolve, reject) => {
      const tarea = refStorage.put(imagen)
      tarea.on(
        'state_changed',
        () => {},//aqui iría una función que observa la subida de mi archivo
        (error) => {reject(error)}, //aqui manejamos si es que recibimos un error, por eso hace un reject
        () => { //aqui ya podemos inspeccionar cuando el archivo ha terminado de subirse a firebase
          tarea.snapshot.ref.getDownloadURL()
          .then(urlImagen => resolve(urlImagen))
        }
      )
    })
  }

  const setImage = () => {
    if(!pokemon.img || !pokemon.img.length){
      return <img src="https://firebasestorage.googleapis.com/v0/b/pokecrud-94f44.appspot.com/o/assets%2Fpikachu.png?alt=media&token=e7418a9f-5461-4295-b444-8a240b61a2e7" alt="Pikachu"/>
    }else{
      const urlImage = URL.createObjectURL(pokemon.img[0])
      return <img src={urlImage} />
    }
  }

  const manageImage = e => {
    setPokemon({
      ...pokemon,
      img: e.target.files
    })
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
        <h1 className="Form__Title">Añadir Pokemon</h1>
        <form onSubmit={manageSubmit}>
          <div className="Form__Img">
            {setImage()}
          </div>
          <div className="Form__ButtonImg">
            <input type="file" accept="image/png, image/jpeg" onChange={manageImage} files={pokemon.img} required/>
            <button>Subir Imagen <i className="fas fa-images"></i></button>
          </div>
          <input className="Form__Input" type="text" placeholder="Nombre" name="name" onInput={manageInput} value={pokemon.name} required/>
          <input className="Form__Input" type="text" placeholder="Habilidad" name="ability" onInput={manageInput} value={pokemon.ability} required/>
          <input className="Form__Input" type="text" placeholder="Habilidad Oculta" name="h_ability" onInput={manageInput} value={pokemon.h_ability} required/>
          <input className="Form__Input" type="text" placeholder="Habitat" name="habitat" onInput={manageInput} value={pokemon.habitat} required/>
          <select className="Form__Input" onChange={manageInput} value={pokemon.type} name="type" required>
            <option value="">Tipo</option>
            <option value="Acero">Acero</option>
            <option value="Agua">Agua</option>
            <option value="Bicho">Bicho</option>
            <option value="Dragón">Dragón</option>
            <option value="Eléctrico">Eléctrico</option>
            <option value="Fantasma">Fantasma</option>
            <option value="Fuego">Fuego</option>
            <option value="Hielo">Hielo</option>
            <option value="Lucha">Lucha</option>
            <option value="Normal">Normal</option>
            <option value="Planta">Planta</option>
            <option value="Hada">Hada</option>
            <option value="Psíquico">Psíquico</option>
            <option value="Roca">Roca</option>
            <option value="Siniestro">Siniestro</option>
            <option value="Tierra">Tierra</option>
            <option value="Veneno">Veneno</option>
            <option value="Volador">Volador</option>
          </select>
          <input type="submit" value="Añadir Pokemon"/>
        </form>
      </div>
    </div>
  )
}

export default AddForm