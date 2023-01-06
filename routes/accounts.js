import express from 'express';
import { promises as fs } from 'fs';
import { jsonDb } from '../enums/appConstantes.js';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        //pega os parâmetros do body
        let newAccount = req.body;
        const database = JSON.parse(await readFile(jsonDb.name));
        console.log(database);

        if (newAccount.name && newAccount.balance) {
            //adciona o id indicado no arquivo json a propriedade id da nova conta cadastrada
            newAccount = {
                id: database.nextId++,
                ...newAccount
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
        res.status(400).send({ error: e.message });
    }
});


router.get('/', async (req, res) => {
    try {
        //Lê todos os registros do arquivo de BD
        const database = JSON.parse(await readFile(jsonDb.name));
        delete database.nextId;
        res.send(database);

    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

router.get('/:id', async (req, res) => {
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
        res.status(400).send({ error: e.message });
    }
});

export default router;