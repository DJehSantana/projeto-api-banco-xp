import { promises as fs } from 'fs';
import { jsonDb } from '../../enums/appConstantes.js';

const { readFile, writeFile } = fs;

async function readDatabase() {
    return JSON.parse(await readFile(jsonDb.name));
}

async function writeDatabase(database) {
    return await writeFile(jsonDb.name, JSON.stringify(database, null, 2));
}

export { readDatabase, writeDatabase }