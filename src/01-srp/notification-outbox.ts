/**
 * NotificationOutbox
 *
 * Responsabilidad:
 * Registrar notificaciones pendientes para reintento.
 */

export interface PendingNotification {
    id: number;
    email: string;
    message: string;
    status: 'PENDING' | 'SENT';
}

export class NotificationOutbox {

    private notifications: PendingNotification[] = [];

    addPendingNotification(email: string, message: string): PendingNotification {
        const notification: PendingNotification = {
            id: this.notifications.length + 1,
            email,
            message,
            status: 'PENDING'
        };

        this.notifications.push(notification);

        console.log('[Outbox] Notificación registrada como pendiente:', notification);

        return notification;
    }

    markAsSent(notificationId: number): void {
        const notification = this.notifications.find(n => n.id === notificationId);

        if (notification) {
            notification.status = 'SENT';
            console.log(`[Outbox] Notificación ${notificationId} marcada como enviada.`);
        }
    }

    getPendingNotifications(): PendingNotification[] {
        return this.notifications.filter(n => n.status === 'PENDING');
    }

}