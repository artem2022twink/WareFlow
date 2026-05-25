import type { Request, Response } from "express";
import * as productService from './product.service.js';

export async function getAll(_req: Request, res: Response): Promise<void> {
    res.json(await productService.getAll());
}

export async function getById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    res.json(await productService.getById(id));
}

export async function getByCategory(req: Request, res: Response): Promise<void> {
    const category = typeof req.params.category === 'string' ? req.params.category : '';
    res.json(await productService.getByCategory(category));
}