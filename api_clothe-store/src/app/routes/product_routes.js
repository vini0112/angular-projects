import  Router from "express";
import productControllers from "../controllers/product_controller.js";
import {storage} from '../../multer.config.js'
import multer from "multer";
import verifyJWT from "../middleware/verifyJWT.js";



const router = Router()

const upload = multer({storage})


// getting all 
router.get('/clothes', productControllers.show)

// getting by id - using in unit test interceptor 
router.get('/clothes/:id', verifyJWT,productControllers.getById)

// post
router.post('/clothes', verifyJWT, upload.single('image'), productControllers.postingClothes)

// update
router.put('/clothes/:id', verifyJWT, productControllers.updateClothe)

// update favorite with patch
router.patch('/clothesFavorite/:id', productControllers.changeFavorite)

// delete
router.delete('/clothes/:id',verifyJWT, productControllers.deletingClothe)




export default router;
