import fs from 'fs'
import xml2js from 'xml2js'
import iconv from 'iconv-lite'
import { files } from './config.js'

export const onFileChange = (name, callback) => {
  const file = files[name]
  if (!file) throw new Error(`Invalid file name: ${name}`)
  fs.watchFile(file, () => {
    const data = fs.readFileSync(file)
    const stringData = iconv.decode(data, 'iso-8859-1')
    xml2js.parseString(stringData, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error(err)
        return
      }
      const message = { type: name, payload: result }
      console.log(JSON.stringify(message, null, 2))
      callback(JSON.stringify(message))
    })
    console.log(`change detected: ${file}`)
  })
}

