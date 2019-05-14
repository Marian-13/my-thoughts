import { isAndroid } from 'lib/device'

export const getFilePath = fileName => {
  if (isAndroid()) return `file:///android_asset/www/${fileName}`

  return `file:///${fileName}`
}

const log = (...messages) => {
  messages.forEach(message => console.log(message))

  return true
}

export const createFile = fileName => {
  return new Promise((resolve, reject) => {
    const getFileSuccess = (content) => resolve(content)
    const getFileError = (error) => (log('getFileError', error) && log('getFileError 2', Object.entries(error)) && reject())
    const requestFileSystemError = (error) => (log('requestFileSystem', error) && reject())

    window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
      console.log('fileSystem');
      console.log(fileSystem);

      console.log('fileName');
      console.log(fileName);

      fileSystem.root.getFile(fileName, { create: true }, getFileSuccess, getFileError)
    }, requestFileSystemError)
  })
}
