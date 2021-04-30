export const selectLanguage = (lang) => {
    switch (lang) {
        case 'es':
           return  "Spanish"  
        case 'fr':  
            return "French"
        case 'de': 
            return "German"
        case 'pt':
            return "Português"
        case 'ru':
            return "Russian"
        case 'th':
            return "Thai"
        case 'vi':
            return "Vietnamese"
        default:
            return lang
    }
}

export const options = [
    { key: 'a', id: 'es', text: 'Spanish', value: 'es' },
    { key: 'b', id: 'fr', text: 'French', value: 'fr' },
    { key: 'c', id: 'de', text: 'German', value: 'de' },
    { key: 'd', id: 'pt', text: 'Português', value: 'pt' },
    { key: 'e', id: 'ru', text: 'Russian', value: 'ru' },
    { key: 'f', id: 'th', text: 'Thai', value: 'th' },
    { key: 'g', id: 'vi', text: 'Vietnamese', value: 'vi' }
  ]