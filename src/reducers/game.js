const initialState = {
    cards: [],
    guess: [],
    matched: [],
    correct: null,
    language: '',
    category_id: null
}

export const gameReducer = (state= initialState, action) => {
    let newState
    switch(action.type) {
        case 'GAME_TYPE':
            return {
                ...state,
                language: action.gameType.language,
                category_id: action.gameType.category
            }
        case 'SHUFFLED_CATEGORY':
            return {
                ...state,
                cards:[...action.cards].map(obj => ({...obj, isComplete: false}))
            }
        case 'GUESS':
            newState = {
                ...state,
                guess: [...state.guess, action.id]
            } 
            if (newState.guess.length === 2) {
                if (newState.guess[0] === newState.guess[1]) {
                    return newState = {
                        ...state,
                        cards: state.cards.map(obj => {
                            if (obj.id === action.id) {
                                 return {...obj, isComplete: true}
                            } else {
                                return obj
                            }    
                        }),
                        guess: [],
                        matched: [...state.matched, action.id],
                        correct: true
                    }
                } else {
                    return newState = {
                        ...state,
                        guess: [],
                        correct: false
                    }
                }
            }

            return newState
        case 'FINISH_GAME':
            return initialState
        default:
            return state
        }
        
}

           
