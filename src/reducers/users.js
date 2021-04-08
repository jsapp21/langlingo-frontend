export const usersReducer = (state=null, action) => {
    switch(action.type) {
        case 'SIGN_UP_SUCCESS':
        case 'CURRENT_USER':
            return {
                ...action.user
            }
        case 'LOGIN_SUCCESS':
            return {
                ...action.user
            }
        case 'LOGOUT_SUCCESS':
            return state=null
        case 'UPDATE_USER_GAMES':
            return {
                ...state,
                games: [...state.games, action.game]
            }
        default:
            return state 
        }
}
