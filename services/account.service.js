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

async function listAllAccounts() {
    const database = JSON.parse(await readFile(jsonDb.name));
    delete database.nextId;

    return database;
}

async function listAccountById(id) {
    const database = JSON.parse(await readFile(jsonDb.name));
    //encontra a conta com o mesmo id passado por parâmetro
    const account = await database.accounts.find(account => account.id === id);
    return account;
}

async function destroyAccount(id) {
    const database = JSON.parse(await readFile(jsonDb.name));
    database.accounts = database.accounts.filter(account => account.id !== id);
    //reescreve o arquivo DB sem o registro com o id passado por parâmetro
    await writeFile(jsonDb.name, JSON.stringify(database, null, 2));
}

async function updateAccountProperties(account) {
    const database = JSON.parse(await readFile(jsonDb.name));

    //encontra o index do registro com o mesmo id do req.body
    const index = database.accounts.findIndex(acc => acc.id === account.id);
    // caso conta conste no arquivo DB, substitui o objeto na posição encontrada 
    //pelo novo objeto com os dados recebidos no body

    if (index === -1) {
        throw new Error('Account not found');
    }

    database.accounts[index].name = account.name;
    database.accounts[index].balance = parseFloat(account.balance);

    await writeFile(jsonDb.name, JSON.stringify(database, null, 2));

    return database.accounts[index];
}

async function updateAccountBalance(account) {
    const database = JSON.parse(await readFile(jsonDb.name));

    //encontra o index do registro com o mesmo id do req.body
    const index = database.accounts.findIndex(acc => acc.id === account.id);

    if (index !== -1) {
        //caso o valor passado seja igual ao registro anterior ou 
        //não seja um valor que possa ser transformado em número, dispara um erro
        if ((database.accounts[index].balance === account.balance)) {
            throw new Error('Invalid balance value');
        } else {
            //substitui o balance do index encontrado, pelo recebido por parâmetro já convertido em número  
            database.accounts[index].balance = parseFloat(account.balance);
            await writeFile(jsonDb.name, JSON.stringify(database, null, 2));

            return database.accounts[index];
        }
    } else {
        throw new Error('Account not found');
    }
}

export {
    saveAccount,
    listAllAccounts,
    listAccountById,
    destroyAccount,
    updateAccountProperties,
    updateAccountBalance
}