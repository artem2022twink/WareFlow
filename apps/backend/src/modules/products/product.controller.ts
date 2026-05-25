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

export async function getLowStock(req: Request, res: Response): Promise<void> {
    const threshold = Number(req.query.threshold);
    res.json(await productService.getLowStock(threshold));
}

export async function getByName(req: Request, res: Response): Promise<void> {
    const q = typeof req.query.q === 'string' ? req.query.q : '';
    res.json(await productService.getByName(q));
}

export async function getByPriceRange(req: Request, res: Response): Promise<void> {
    const min = Number(req.query.min);
    const max = Number(req.query.max);
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    res.json(await productService.getByPriceRange(min, max, category));
}

export async function create(req: Request, res: Response): Promise<void> {
    res.status(201).json(await productService.create(req.body));
}