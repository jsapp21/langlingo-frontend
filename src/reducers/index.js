import { combineReducers } from 'redux'
import { usersReducer } from './users'
import { gameReducer } from './game'
import { wodReducer } from './wod'

export default combineReducers({
    user: usersReducer,
    wod: wodReducer,
    game: gameReducer
})