import smallBackgroundImage from 'images/lviv-black-and-white-768x512.jpg'
import mediumBackgroundImage from 'images/lviv-black-and-white-1024x683.jpg'
import largeBackgroundImage from 'images/lviv-black-and-white-1440x960.jpg'
import extraLargeBackgroundImage from 'images/lviv-black-and-white-2560x1707.jpg'

const getBackgroundImage = () => {
  const viewportHeight = window.innerHeight

  if (viewportHeight <= 512) return smallBackgroundImage
  if (viewportHeight <= 683) return mediumBackgroundImage
  if (viewportHeight <= 960) return largeBackgroundImage

  return extraLargeBackgroundImage
}

const toUrl = image => `url('${image}')`

export const updateBackgroundImage = () => (document.body.style.backgroundImage = toUrl(getBackgroundImage()))
