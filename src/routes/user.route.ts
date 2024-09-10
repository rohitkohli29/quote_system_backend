import express from 'express';
import { 
    addUser as addUserController 
} from '../controllers/user.controller';
const router = express.Router();

router.route('/add_user').post(addUserController);

export default router;