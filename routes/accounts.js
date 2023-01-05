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
        const database = await readFile(jsonDb.name);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
})

export default router;