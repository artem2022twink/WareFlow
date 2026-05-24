import * as productRepository from './product.repository.js';
import { NotFoundError, ValidationError } from '../../lib/errors.js';
import type { Product, CreateProductInput } from './product.types.js';

export async function getAll(): Promise<Product[]> {
    return productRepository.findAll();
}

export async function getById(id: number): Promise<Product> {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ValidationError('Product id must be a positive integer');
    }

    const product = await productRepository.findById(id);
    
    if(!product) {
        throw new NotFoundError(`Product with id ${id} not found`);
    }

    return product;
}

export async function getByCategory(category: string): Promise<Product[]> {
    if(!category.trim()) {
        throw new ValidationError('Category is required');
    }

    const products = await productRepository.findAll();
    const target = category.trim().toLowerCase();

    return products.filter(p => p.category.toLowerCase() === target);
}

export async function getLowStock(threshold: number): Promise<Product[]> {
    if(!Number.isFinite(threshold) || threshold < 0) {
        throw new ValidationError('Stock threshold must be a non-negative number');
    }

    const products = await productRepository.findAll();

    return products.filter(p => p.stock <= threshold);
}

export async function getByName(query: string): Promise<Product[]> {
    if(!query.trim()) {
        throw new ValidationError('Search query is required');
    }

    const products = await productRepository.findAll();
    const target = query.trim().toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(target));
}

export async function getByPriceRange(min: number, max: number, category?: string): Promise<Product[]> {
    if(!Number.isFinite(min) || min < 0) {
        throw new ValidationError('Min price must be a non-negative number');
    }
    if(!Number.isFinite(max) || max < min) {
        throw new ValidationError('Max price must be greater than or equal to min');
    }

    let products = await productRepository.findAll();
    products = products.filter(p => p.price >= min && p.price <= max);

    if(category && category.trim()) {
        const target = category.trim().toLowerCase();
        products = products.filter(p => p.category.toLowerCase() === target);
    }

    return products;
}

export async function create(input: CreateProductInput): Promise<Product> {
    if(typeof input.name !== 'string' || input.name.trim() === '') {
        throw new ValidationError('Product name is required');
    }
    if(!Number.isInteger(input.stock) || input.stock < 0) {
        throw new ValidationError('Stock must be a non-negative integer');
    }
    if(!Number.isInteger(input.price) || input.price < 0) {
        throw new ValidationError('Price must be a non-negative integer');
    }
    if(typeof input.category !== 'string' || input.category.trim() === '') {
        throw new ValidationError('Category is required');
    }

    return productRepository.create({
        name: input.name.trim(),
        price: input.price,
        category: input.category.trim().toLowerCase(),
        stock: input.stock
    });
}