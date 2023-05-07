import path from 'path'
import multer from 'multer'
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename (request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const extension = file.originalname.split('.')[1]
      const filename = `${fileHash}.${extension}`
      callback(null, filename)
    }
  })

}
