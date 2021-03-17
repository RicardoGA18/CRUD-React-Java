import React from 'react'

const Card = ({id,img,name,ability,h_ability,habitat,type}) => {
  return (
    <div className="Card">
      <div className="Card__Edit">
        <i className="fas fa-pencil-alt"></i>
      </div>
      <div className="Card__Delete">
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
  )
}

export default Card