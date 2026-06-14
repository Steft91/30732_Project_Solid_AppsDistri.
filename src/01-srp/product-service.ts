/**
 * ProductService
 *
 * Responsabilidad:
 * Gestionar la persistencia de productos.
 */

export interface Product {
    id: number;
    name: string;
}

export class ProductService {

    private products: Product[] = [];

    loadProduct(id: number): Product | undefined {
        console.log(`Cargando producto con ID: ${id} desde el inventario del parque...`);
        return this.products.find(p => p.id === id);
    }

    productExists(id: number): boolean {
        return this.products.some(p => p.id === id);
    }

    saveProduct(product: Product): void {
        if (this.productExists(product.id)) {
            throw new Error(`El producto con ID ${product.id} ya existe.`);
        }

        console.log(`Guardando el producto ${product.name} en la base de datos de la reserva...`);
        this.products.push(product);
    }

}