import { promises as fs } from 'fs';
import { jsonDb } from '../enums/appConstantes.js';

const { readFile, writeFile } = fs;

async function saveAccount(account) {
    const database = JSON.parse(await readFile(jsonDb.name));
    console.log(database);

    //adciona o id indicado no arquivo json a propriedade id da nova conta cadastrada
    account = {
        id: database.nextId++,
        name: account.name,
        balance: account.balance
    }
    //adiciona novo cadastro ao BD
    database.accounts.push(account);
    // 2 - adiciona espaço na hora de salvar as informações, melhora a formatação do documento
    await writeFile(jsonDb.name, JSON.stringify(database, null, 2));

    return account;

}

export { saveAccount }