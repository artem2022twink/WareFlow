export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
};

export type CreateProductInput = Omit<Product, 'id'>;