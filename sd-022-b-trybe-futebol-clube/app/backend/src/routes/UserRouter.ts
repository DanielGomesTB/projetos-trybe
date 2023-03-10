import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post('/login', userController.postLogin);
router.get('/login/validate', userController.getLogin);

export default router;
