import fs from 'fs'
import path from 'path'
import { files, elemidiaCacheDirectory } from './config.js'

const clearXmlCache = () => {
  Object.values(files).forEach((file) => {
    try {
      fs.unlinkSync(file)
    }
    catch (err) {
      console.warn(`failed to delete ${file}: ${err}`)
    }
  })
}

const copyCache = () => {
  Object.values(files).forEach((file) => {
    const fileName = file.split('/').pop()
    const filePath = path.join(elemidiaCacheDirectory, fileName)
    try {
      fs.copyFileSync(filePath, file)
      console.log(`copied xml from ${filePath} to ${file}`)
    } catch (err) {
      console.warn(`failed to copy ${filePath} to ${file}`)
    }
  })
}

export const resetCache = () => {
 clearXmlCache() 
 copyCache()
 console.log('xml cache reset')
}

