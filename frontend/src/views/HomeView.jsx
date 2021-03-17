import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {openModalCharge,closeModalCharge} from '../utils/charge'
import Nav from '../components/Nav'
import Card from '../components/Card'

const HomeView = () => {
  const [pokemons,setPokemons] = useState([])

  const getPokemons = async () => {
    openModalCharge()
    const response = await axios.get('http://127.0.0.1:8080/api/pokemon')
    const pokemones = response.data
    setPokemons(pokemones)
    closeModalCharge()
  }

  const refreshPokemons = id => {
    const updatedPokemons = [...pokemons].filter(pokemon => pokemon.id != id)
    setPokemons([...updatedPokemons])
  }

  useEffect(() => {
    getPokemons()
  },[])

  const setCards = () => {
    if(!pokemons || !pokemons.length){
      return
    }else{
      return pokemons.map(pokemon => {
        return (
          <Card 
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.type}
            ability={pokemon.ability}
            h_ability={pokemon.h_ability}
            habitat={pokemon.habitat}
            img={pokemon.img}
            refreshPokemons={refreshPokemons}
          />
        )
      })
    }
  }

  return (
    <div>
      <Nav ishome={true} />
      <div className="l-container">
        <div className="l-contain l-CardBox">
          {setCards()}
        </div>
      </div>
    </div>
  )
}

export default HomeView