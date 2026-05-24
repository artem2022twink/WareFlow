import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Product } from "./product.types.js";

const DB_PATH = path.join(import.meta.dirname, '../../../data/products.json');

type Database = {
    products: Product[];
}

async function readDB(): Promise<Database> {
    const raw = await readFile(DB_PATH, 'utf-8');
    return JSON.parse(raw) as Database;
}

async function writeDB(db: Database): Promise<void> {
    await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function findAll(): Promise<Product[]> {
    const db = await readDB();
    return db.products;
}

export async function findById(id: number): Promise<Product | null> {
    const db = await readDB();
    return db.products.find(p => p.id === id) ?? null;
}

export async function create(input: Omit<Product, 'id'>): Promise<Product> {
    const db = await readDB();
    const maxId = db.products.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct: Product = { id: maxId + 1, ...input };
    db.products.push(newProduct);
    await writeDB(db);
    return newProduct;
}