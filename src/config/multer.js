const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'assets', 'uploads', 'casa'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'assets', 'uploads', 'casa'))
        },
        filename: (req, file, cb) => {
            console.log('multerrr',file);
            
            const fileName = file.originalname
        
            cb(null, fileName)
        }
    }),
    limits: {
        fileSize: 2 * 2048 * 2048,
    },
}