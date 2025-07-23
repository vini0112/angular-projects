import  Router from "express";
import productControllers from "../controllers/product_controller.js";
import {storage} from '../../multer.config.js'
import multer from "multer";
import protectedRoute from "../middleware/protected.route.js";



const router = Router()

const upload = multer({storage})


// getting all 
router.get('/clothes', productControllers.show)

router.get('/product/:id', productControllers.getById)
router.get('/product-size/:id', productControllers.productSize)


// post
router.post('/create-clothes', protectedRoute, upload.single('image'),  productControllers.postingClothes)

// update
router.put('/clothes/:id', protectedRoute, productControllers.updateClothe)

// update favorite with patch
router.patch('/clothesFavorite/:id', productControllers.changeFavorite)

// delete
router.delete('/clothes/:id', protectedRoute, productControllers.deletingClothe)




export default router;
