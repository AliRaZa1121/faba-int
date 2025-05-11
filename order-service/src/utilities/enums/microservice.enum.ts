export const MICROSERVICES = {
    NOTIFICATION_SERVICE: 'notifications_service_queue',
    ORDER_SERVICE: 'orders_service_queue',
};


export const MICROSERVICE_MESSAGE_PATTERN = {
    NOTIFICATION: 'notification_service_trigger_notification',
    EMAIL: 'notification_service_trigger_email',
    ORDER_SERVICE: {
        CREATE: 'order.service.create.order',
        UPDATE: 'order.service.update.order',
        DELETE: 'order.service.delete.order',
    }
};