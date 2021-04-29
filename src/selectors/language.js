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