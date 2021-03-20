import Avatars from '../Screens/Login/Avatars'

namespace MemoryGame {
  export type PlayerType = {
    name: string,
    avatar: typeof Avatars[0],
  }
  
  export type RankingType = {
    player: PlayerType,
    rounds: number,
  }
}

export default MemoryGame
