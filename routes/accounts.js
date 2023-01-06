import express from 'express';
import { promises as fs } from 'fs';
import { jsonDb } from '../enums/appConstantes.js';
import { logger } from '../enums/logger.js';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        //pega os parâmetros do body
        let newAccount = req.body;
        const database = JSON.parse(await readFile(jsonDb.name));
        console.log(database);


        if (newAccount.name && parseFloat(newAccount.balance)) {
            //adciona o id indicado no arquivo json a propriedade id da nova conta cadastrada
            newAccount = {
                id: database.nextId++,
                name: newAccount.name,
                balance: newAccount.balance
            }
            //adiciona novo cadastro ao BD
            database.accounts.push(newAccount);
            // 2 - adiciona espaço na hora de salvar as informações, melhora a formatação do documento
            await writeFile(jsonDb.name, JSON.stringify(database, null, 2));
        } else {
            throw new Error('Invalid fields');
        }
        res.send(newAccount);

    } catch (e) {
        next(e);
    }
});


router.get('/', async (req, res, next) => {
    try {
        //Lê todos os registros do arquivo de BD
        const database = JSON.parse(await readFile(jsonDb.name));
        delete database.nextId;
        res.send(database);

    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const database = JSON.parse(await readFile(jsonDb.name));
        let idAccount = parseInt(req.params.id);
        //encontra a conta com o mesmo id passado por parâmetro
        const account = await database.accounts.find(account => account.id === idAccount);

        //verifica se encontrou alguma conta, do contrário lança um erro
        if (account) {
            res.send(account);
        } else {
            throw new Error('Account not found');
        }
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const idAccount = parseInt(req.params.id);
        const database = JSON.parse(await readFile(jsonDb.name));

        database.accounts = database.accounts.filter(account => account.id !== idAccount);

        //reescreve o arquivo DB sem o registro com o id passado por parâmetro
        await writeFile(jsonDb.name, JSON.stringify(database, null, 2));
        logger.info('Account deleted with success!');
        res.end();

    } catch (e) {
        next(e);
    }

});

router.put('/', async (req, res, next) => {
    try {
        let dataAccount = req.body;
        const database = JSON.parse(await readFile(jsonDb.name));

        //encontra o index do registro com o mesmo id do req.body
        const index = database.accounts.findIndex(account => account.id === dataAccount.id);
        // caso conta conste no arquivo DB, substitui o objeto na posição encontrada 
        //pelo novo objeto com os dados recebidos no body

        if (index === -1) {
            throw new Error('Account not found');
        }

        if (dataAccount.name && parseFloat(dataAccount.balance)) {

            database.accounts[index].name = dataAccount.name;
            database.accounts[index].balance = parseFloat(dataAccount.balance);

            await writeFile(jsonDb.name, JSON.stringify(database, null, 2));
            logger.info('Account update with success!');
            res.send(database.accounts[index]);
        } else {
            throw new Error('Invalid fields');
        }
    } catch (e) {
        next(e);
    }
});

router.patch('/updateBalance', async (req, res, next) => {
    try {
        let dataAccount = req.body;
        const database = JSON.parse(await readFile(jsonDb.name));

        //encontra o index do registro com o mesmo id do req.body
        const index = database.accounts.findIndex(account => account.id === dataAccount.id);

        if (index !== -1) {
            //caso o valor passado seja igual ao registro anterior ou 
            //não seja um valor que possa ser transformado em número, dispara um erro
            if ((database.accounts[index].balance === dataAccount.balance) ||
                !parseFloat(dataAccount.balance)) {
                throw new Error('Invalid balance value');
            } else {
                //substitui o balance do index encontrado, pelo recebido por parâmetro já convertido em número  
                database.accounts[index].balance = parseFloat(dataAccount.balance);
                await writeFile(jsonDb.name, JSON.stringify(database, null, 2));

                logger.info('Balance update with success!');
                res.send(database.accounts[index]);
            }
        } else {
            throw new Error('Account not found');
        }
    } catch (e) {
        next(e);
    }
});

router.use((e, req, res, next) => {
    let erros = [];
    erros.push(e.message);

    logger.error(`${req.method} ${req.baseUrl} - ${e.message}`);
    res.status(400).json({ erros });
});

export default router;