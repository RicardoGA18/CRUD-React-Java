const getColorByType = type => {
  switch(type){
    case 'Acero':
      return '#cccccc'
    case 'Agua':
      return '#b0e2ff'
    case 'Bicho':
      return '#99cc33'
    case 'Dragón':
      return '#ab82ff'
    case 'Eléctrico':
      return '#ffd700'
    case 'Fantasma':
      return '#778899'
    case 'Fuego':
      return '#ff7f00'
    case 'Hielo':
      return '#add8e6'
    case 'Lucha':
      return '#ff6a6a'
    case 'Normal':
      return '#ddccaa'
    case 'Planta':
      return '#99ff66'
    case 'Hada':
      return '#ffb0ff'
    case 'Psíquico':
      return '#ffb5c5'
    case 'Roca':
      return '#cd853f'
    case 'Siniestro':
      return '#a9a9a9'
    case 'Tierra':
      return '#deb887'
    case 'Veneno':
      return '#cc88bb'
    case 'Volador':
      return '#baaaff'
    default:
      return '#000000'
  }
}

export default getColorByType