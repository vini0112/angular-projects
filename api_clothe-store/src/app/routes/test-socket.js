import Router from "express"
import testSocketController from "../controllers/test-socket.controller.js"

const router = Router.Router()


router.get('/test-socket', testSocketController.getAllMessages)

router.post('/test-socket', testSocketController.savingNewService)

router.put('/test-socket/:id', testSocketController.updatingService)

router.delete('/test-socket/:id', testSocketController.deletingService)

export default router;