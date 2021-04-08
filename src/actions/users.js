export const signUpSuccess = (user) => {
  return {
    type: 'SIGN_UP_SUCCESS',
    user
  }
}

export const loginSuccess = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    user
  }
}

export const currentUser = (user) => {
  return {
    type: 'CURRENT_USER',
    user
  }
}

export const logOffUser = (user) => {
  return {
    type: 'LOGOUT_SUCCESS',
    user
  }
}

export const updateUserGames = (game) => {
  return {
    type: 'UPDATE_USER_GAMES',
    game
  }
}


