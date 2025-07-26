
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'upload/')
    },
    filename: (req,file, callback) =>{
        const time = new Date().getTime()
        callback(null, `${time}_${file.originalname}`)
    }
})


export const upload = multer({
    storage, 
    limits:{
        fileSize: 1024 * 1024 * 2 // 2MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if(allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }else{
            cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
    }
})
