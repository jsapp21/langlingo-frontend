const initialState = {
    word: '',
    translate: '',
    image: '',
    language: '',
    date: ''
}

export const wodReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'WOD_WORD':
            return {
                ...state,
                word: action.word.text,
                translate: action.word.translate,
                language: action.word.language
            }
        case 'WOD_IMAGE':
            return {
                ...state,
                image: action.image.image
            }
        case 'WOD_DATE':
            return {
                ...state,
                date: action.date
            }
        default:
            return state 
        }
}