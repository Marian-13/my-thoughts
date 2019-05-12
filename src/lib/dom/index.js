export const hideElementsWithClass = className => {
  const elementsToHide = document.getElementsByClassName(className)

  Array.from(elementsToHide).forEach(element => element.style.display = 'none')
}

export const showElementsWithClass = className => {
  const elementsToShow = document.getElementsByClassName(className)

  Array.from(elementsToShow).forEach(element => element.style.display = '')
}

export const scrollElementToBottom = element => (element.scrollTop = element.scrollHeight)
