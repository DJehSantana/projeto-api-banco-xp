import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();

app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
    try {
        //tenta ler o arquivo de dados
        await readFile('accounts.json');
        console.log("API Started and file readed with success!");
    } catch (e) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        //caso o arquivo de dados não exista, cria o arquivo e o primeiro registro
        //utilizando o initialJson
        writeFile('accounts.json', JSON.stringify(initialJson)).then(() => {
            console.log("API Started and new file created!");
        }).catch(err => {
            console.log(err);
        });
    }
});