/**
 * Mailer
 *
 * Responsabilidad única:
 * Encargarse únicamente del envío de correos electrónicos.
 */

export class Mailer {

    sendEmail(email: string, message: string): void {
        console.log(`[Mailer] Enviando correo a ${email}: ${message}`);
    }

}