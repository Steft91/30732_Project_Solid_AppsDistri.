
/**
 * APLICACIÓN PARCIAL DEL PRINCIPIO DE RESPONSABILIDAD ÚNICA (SRP)
 *
 * ProductBloc ya no guarda productos directamente ni envía correos directamente.
 * Ahora delega la persistencia a ProductService y las notificaciones a Mailer.
 */

import { Product, ProductService } from './product-service';
import { Mailer } from './mailer';

export class ProductBloc {

    private productService = new ProductService;
    private mailer = new Mailer;

    loadProduct(id: number): Product | undefined {
        return this.productService.loadProduct(id);
    }

    saveProduct(product: Product): void {
        this.productService.saveProduct(product);
    }

    sendEmail(email: string, message: string): void {
        this.mailer.sendEmail(email, message);
    }

}
