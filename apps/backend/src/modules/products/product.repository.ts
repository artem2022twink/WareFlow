import { prisma } from "../../lib/prisma.js";
import type { Product } from "./product.types.js";

export async function findAll(): Promise<Product[]> {
    return prisma.product.findMany();
}

export async function findById(id: number): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
}

export async function create(input: Omit<Product, 'id'>): Promise<Product> {
    return prisma.product.create({ data: input });
}