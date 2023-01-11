import { promises as fs } from 'fs';
import { jsonDb } from '../enums/appConstantes.js';
import { deleteAccount, getAccount, getDataAccounts, insertAccount, updateAccount, updateBalance } from '../repositories/account.repository.js';
import { readDatabase } from '../repositories/database/database.service.js';

const { readFile, writeFile } = fs;

async function listAllAccounts() {
    return await getDataAccounts();
}

async function listAccountById(id) {
    const account = await getAccount(id);
    //verifica se encontrou alguma conta, do contrário lança um erro
    if (account) {
        return account
    } else {
        console.log(account);
        throw new Error('Account not found');
    }
}

async function saveAccount(account) {

    if (!account.name || !parseFloat(account.balance)) {
        throw new Error('Fields value empty or invalid');
    }
    return await insertAccount(account);
}

async function destroyAccount(id) {
    if (!id || !parseInt(id)) {
        console.log(id);
        throw new Error('Id value is empty or invalid');
    }

    const idAccount = parseInt(id);
    const database = await readDatabase();
    const account = database.accounts.find(account => account.id === idAccount);

    if (!account) {
        throw new Error('Account not found');
    }
    return await deleteAccount(database, idAccount);

}

async function updateAccountProperties(account) {

    const database = await readDatabase();
    //encontra o index do registro com o mesmo id do req.body
    const index = database.accounts.findIndex(acc => acc.id === account.id);
    //caso não encontre dispara um erro 
    if (index === -1) {
        throw new Error('Account not found');
    }
    if (!account.name || !parseFloat(account.balance)) {
        throw new Error('Invalid fields');
    }
    const name = account.name;
    const balance = parseFloat(account.balance);
    const editAccount = database.accounts[index];

    const saveAccount = await updateAccount(
        editAccount,
        name,
        balance,
        database
    );
    return saveAccount;
}

async function updateAccountBalance(account) {
    const database = await readDatabase();
    //encontra o index do registro com o mesmo id do req.body
    const index = database.accounts.findIndex(acc => acc.id === account.id);

    if (index === -1) {
        throw new Error('Account not found');
    }
    if (!parseFloat(account.balance) || !account.balance) {
        throw new Error('Balance value is empty or invalid');
    }

    const updateAccount = database.accounts[index];
    const balance = parseFloat(account.balance);

    if (updateAccount.balance === balance) {
        throw new Error('Value reported is equal to the previous one');
    }
    //substitui o balance do index encontrado, pelo recebido por parâmetro já convertido em número  
    const saveAccount = await updateBalance(updateAccount, balance, database);

    return saveAccount;
}

export {
    saveAccount,
    listAllAccounts,
    listAccountById,
    destroyAccount,
    updateAccountProperties,
    updateAccountBalance
}