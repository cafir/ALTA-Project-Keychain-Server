import express from 'express';
import { getHolders, createHolder, deleteHolder, updateHolder } from '../controllers/holders.js';

const router = express.Router();

//read
router.get('/', getHolders);
//create
router.post('/', createHolder);
//update
router.patch('/:id', updateHolder)
//delete
router.delete('/:id', deleteHolder)

export default router;