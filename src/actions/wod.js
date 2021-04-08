export const wordOfTheDay = (word) => {
    return {
      type: 'WOD_WORD',
      word
    }
}

export const imageOfTheDay = (image) => {
    return {
      type: 'WOD_IMAGE',
      image
    }
}

export const date = (date) => {
    return {
      type: 'WOD_DATE',
      date
    }
}