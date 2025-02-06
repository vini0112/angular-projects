import  Router from "express";
import productControllers from "../app/controllers/product_controller.js";

const router = Router()



// getting all 
router.get('/clothes', productControllers.show)
router.get('/favoriteClothes', productControllers.showFavorites)

// getting by id
router.get('/clothes/:id', productControllers.getById)

// post
router.post('/clothes', productControllers.postingClothes)

// update
router.put('/clothes/:id', productControllers.updateClothe)
router.patch('/clothesFavorite/:id', productControllers.changeFavorite)

// delete
router.delete('/clothes/:id', productControllers.deletingClothe)




export default router;
