export const shuffledCategory = (cards) => {
    return {
      type: 'SHUFFLED_CATEGORY',
      cards
    }
}

export const guess = (id) => {
  return {
    type: 'GUESS',
    id
  }
}

export const gameLanguage = (gameType) => {
  return {
    type: 'GAME_TYPE',
    gameType
  }
}

export const finishGame = (game) => {
  return {
    type: 'FINISH_GAME',
    game
  }
}