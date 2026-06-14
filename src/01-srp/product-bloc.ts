/**
 * ProductBloc
 *
 * Responsabilidad:
 * Coordinar el flujo de registro de productos.
 *
 * No persiste directamente productos.
 * No envía correos directamente.
 * No borra productos guardados si falla la notificación.
 */

import { Product, ProductService } from "./product-service";
import { Mailer } from "./mailer";
import { NotificationOutbox } from "./notification-outbox";

export class ProductBloc {

    constructor(
        private productService: ProductService,
        private mailer: Mailer,
        private notificationOutbox: NotificationOutbox
    ) {}

    loadProduct(id: number): Product | undefined {
        return this.productService.loadProduct(id);
    }

    saveProduct(product: Product): void {
        this.productService.saveProduct(product);
    }

    notifyCustomer(email: string, message: string): void {
        this.mailer.sendEmail(email, message);
    }

    registerProduct(product: Product, customerEmail: string): void {
        console.log('--- Iniciando registro transaccional de producto ---');

        if (this.productService.productExists(product.id)) {
            console.error(`No se puede registrar. El producto con ID ${product.id} ya existe.`);
            return;
        }

        try {
            this.productService.saveProduct(product);
            console.log('Producto guardado correctamente.');
        } catch (error) {
            console.error('Error de persistencia. El producto no fue guardado:', error);
            return;
        }

        const message = `El producto ${product.name} fue registrado correctamente en la reserva.`;

        const pendingNotification = this.notificationOutbox.addPendingNotification(
            customerEmail,
            message
        );

        try {
            this.mailer.sendEmail(customerEmail, message);
            this.notificationOutbox.markAsSent(pendingNotification.id);
            console.log('Correo enviado correctamente.');
        } catch (error) {
            console.error('Error de notificación. El producto se mantiene guardado:', error);
            console.warn('La notificación queda pendiente para reintento.');
        }

        console.log('--- Fin del registro transaccional de producto ---');
    }

}