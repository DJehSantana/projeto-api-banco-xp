import express from 'express';

import { createAccount, deleteAccount, getAccount, getAllAccounts, updateAccount, updateBalance } from '../controllers/account.controller.js';

import { logger } from '../enums/logger.js';

const router = express.Router();

router.post('/', createAccount);

router.get('/', getAllAccounts);

router.get('/:id', getAccount);

router.delete('/:id', deleteAccount);

router.put('/', updateAccount);

router.patch('/updateBalance', updateBalance);

router.use((e, req, res, next) => {
    let erros = [];
    erros.push(e.message);

    logger.error(`${req.method} ${req.baseUrl} - ${e.message}`);
    res.status(400).json({ erros });
});

export default router;