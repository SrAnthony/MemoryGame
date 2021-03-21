export const Cards = {
  ['Assets/Cards/Asset1.png']: require('Assets/Cards/Asset1.png'),
  ['Assets/Cards/Asset2.png']: require('Assets/Cards/Asset2.png'),
  ['Assets/Cards/Asset3.png']: require('Assets/Cards/Asset3.png'),
  ['Assets/Cards/Asset4.png']: require('Assets/Cards/Asset4.png'),
  ['Assets/Cards/Asset5.png']: require('Assets/Cards/Asset5.png'),
  ['Assets/Cards/Asset6.png']: require('Assets/Cards/Asset6.png'),
  ['Assets/Cards/Asset7.png']: require('Assets/Cards/Asset7.png'),
  ['Assets/Cards/Asset8.png']: require('Assets/Cards/Asset8.png'),
  ['Assets/Cards/Asset9.png']: require('Assets/Cards/Asset9.png'),
  ['Assets/Cards/Asset10.png']: require('Assets/Cards/Asset10.png'),
  ['Assets/Cards/Asset11.png']: require('Assets/Cards/Asset11.png'),
  ['Assets/Cards/Asset12.png']: require('Assets/Cards/Asset12.png'),
  ['Assets/Cards/Asset13.png']: require('Assets/Cards/Asset13.png'),
  ['Assets/Cards/Asset14.png']: require('Assets/Cards/Asset14.png'),
  ['Assets/Cards/Asset15.png']: require('Assets/Cards/Asset15.png'),
  ['Assets/Cards/Asset16.png']: require('Assets/Cards/Asset16.png'),
  ['Assets/Cards/Asset17.png']: require('Assets/Cards/Asset17.png'),
  ['Assets/Cards/Asset18.png']: require('Assets/Cards/Asset18.png'),
  ['Assets/Cards/Asset19.png']: require('Assets/Cards/Asset19.png'),
  ['Assets/Cards/Asset20.png']: require('Assets/Cards/Asset20.png'),
  ['Assets/Cards/Asset21.png']: require('Assets/Cards/Asset21.png'),
  ['Assets/Cards/Asset22.png']: require('Assets/Cards/Asset22.png'),
  ['Assets/Cards/Asset23.png']: require('Assets/Cards/Asset23.png'),
  ['Assets/Cards/Asset24.png']: require('Assets/Cards/Asset24.png'),
  ['Assets/Cards/Asset25.png']: require('Assets/Cards/Asset25.png'),
  ['Assets/Cards/Asset26.png']: require('Assets/Cards/Asset26.png'),
  ['Assets/Cards/Asset27.png']: require('Assets/Cards/Asset27.png'),
}

export type CardType = typeof CardsList[0]

export const CardsList = Object.entries(Cards).map(([key, value]) => ({
  key,
  name: key,
  image: value,
}))
