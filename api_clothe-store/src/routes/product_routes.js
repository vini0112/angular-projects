import  Router from "express";
import productControllers from "../app/controllers/product_controller.js";
import {storage} from '../multer.config.js'
import multer from "multer";

const router = Router()


const upload = multer({storage})


// getting all 
router.get('/clothes', productControllers.show)

// getting by id
router.get('/clothes/:id', productControllers.getById)

// post
router.post('/clothes',upload.single('image'), productControllers.postingClothes)

// update
router.put('/clothes/:id', productControllers.updateClothe)

// update favorite with patch
router.patch('/clothesFavorite/:id', productControllers.changeFavorite)

// delete
router.delete('/clothes/:id', productControllers.deletingClothe)




export default router;
