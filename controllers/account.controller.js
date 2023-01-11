import { logger } from '../enums/logger.js';
import { destroyAccount, listAccountById, listAllAccounts, saveAccount, updateAccountBalance, updateAccountProperties } from '../services/account.service.js';

async function createAccount(req, res, next) {
    try {
        //pega os parâmetros do body
        let newAccount = req.body;
        const account = await saveAccount(newAccount);
        res.send(account);
        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (e) {
        next(e);
    }

}

async function getAllAccounts(req, res, next) {
    try {
        res.send(await listAllAccounts());
        logger.info('GET /account - Success');
    } catch (e) {
        next(e);
    }
}

async function getAccount(req, res, next) {
    try {
        let idAccount = parseInt(req.params.id);
        const account = await listAccountById(idAccount);

        res.send(account);
        logger.info(`GET /account/:id - ${JSON.stringify(account)}`);

    } catch (e) {
        next(e);
    }
}

async function deleteAccount(req, res, next) {
    try {
        await destroyAccount(req.params.id);
        logger.info(`DELETE /account/:id - Account deleted with success!`);
        res.end();
    } catch (e) {
        next(e);
    }
}

async function updateAccount(req, res, next) {
    try {
        let dataAccount = req.body;

        const account = await updateAccountProperties(dataAccount);

        logger.info(`PUT /account - Account ${account.id} update with success!`);
        res.send(account);
    } catch (e) {
        next(e);
    }
}

async function updateBalance(req, res, next) {
    try {
        let dataAccount = req.body;

        if (!parseFloat(dataAccount.balance)) {
            throw new Error('Invalid balance value')
        }

        const account = await updateAccountBalance(dataAccount);

        logger.info(`PATCH /account - Balance ${account.id} update with success!`);
        res.send(account);
    } catch (e) {
        next(e);
    }
}

export {
    createAccount,
    getAccount,
    getAllAccounts,
    deleteAccount,
    updateAccount,
    updateBalance
}