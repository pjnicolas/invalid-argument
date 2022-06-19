export const suffleArray = <T,>(array: Array<T>): Array<T> => {
  const suffledArray = [...array]

  for (let i = 0; i < suffledArray.length; i += 1) {
    const randomIndex = Math.floor(Math.random() * suffledArray.length)
    const currentElement = suffledArray[i]
    suffledArray[i] = suffledArray[randomIndex]
    suffledArray[randomIndex] = currentElement
  }

  return suffledArray
}
