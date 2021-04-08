export const shuffleReducer = (state=null, action) => {
    switch(action.type) {
        case 'SHUFFLE':
            return action.cards
        default:
            return state 
        }
}