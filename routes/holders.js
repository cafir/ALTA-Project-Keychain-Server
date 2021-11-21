import express from 'express';
import { getHolders, createHolder, deleteHolder, updateHolder } from '../controllers/holders.js';

import auth from '../middleware/auth.js';

const router = express.Router();

//read
router.get('/:id',  getHolders);
//create
router.post('/', auth, createHolder);
//update
router.patch('/:id', auth, updateHolder)
//delete
router.delete('/:id', auth, deleteHolder)

export default router;