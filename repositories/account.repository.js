import { readDatabase, writeDatabase } from './database/database.service.js';

async function getDataAccounts() {
    const database = await readDatabase();
    return database.accounts;
}

async function getAccount(id) {
    const database = await readDatabase();
    let account = database.accounts.find(account => account.id === id);
    return account;
}

async function insertAccount(account) {
    const database = await readDatabase();

    account = {
        id: database.nextId++,
        name: account.name,
        balance: account.balance
    }
    //adiciona novo cadastro ao BD
    database.accounts.push(account);
    // 2 - adiciona espaço na hora de salvar as informações, melhora a formatação do documento
    await writeDatabase(database);
    return account;
}

async function updateAccount(account, name, balance, database) {
    account.name = name;
    account.balance = balance;

    await writeDatabase(database);
    return account;
}

async function deleteAccount(database, id) {
    database.accounts = database.accounts.filter(account => account.id !== id);
    await writeDatabase(database);
}

async function updateBalance(account, balance, database) {
    account.balance = balance;
    await writeDatabase(database);
    return account;
}

export {
    getDataAccounts,
    insertAccount,
    getAccount,
    updateAccount,
    deleteAccount,
    updateBalance
}