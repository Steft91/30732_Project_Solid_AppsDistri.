
/**
 * VIOLACIÓN AL PRINCIPIO DE RESPONSABILIDAD ÚNICA (SRP)
 * 
 * Este archivo muestra una clase "Dios" o un componente que hace demasiadas cosas.
 * En el contexto de la Reserva Ecológica, el ProductBloc gestiona el inventario de la tienda
 * de souvenirs y, al mismo tiempo, se encarga de las notificaciones por correo.
 */

interface Product {
    id: number;
    name: string;
}

export class ProductBloc {

    // Responsabilidad 3: Envío de notificaciones (Servicio de Infraestructura)
    // ESTA ES LA VIOLACIÓN: El Bloc no debería saber CÓMO enviar correos electrónicos.
    notifyCustomer(email: string, message: string) {
        console.log(`[Mailer] Enviando correo a ${email}: ${message}`);
        // Lógica directa de envío de correo acoplada aquí
    }

}
