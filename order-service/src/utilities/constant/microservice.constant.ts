export const MICROSERVICES = {
  NOTIFICATION_SERVICE: 'notifications_service_queue',
  ORDER_SERVICE: 'orders_service_queue',
};

export const MICROSERVICE_MESSAGE_PATTERN = {
  NOTIFICATION: 'notification_service_trigger_notification',
  EMAIL: 'notification_service_trigger_email',
  ORDER_SERVICE: {
    CREATE: 'order_service_create_order',
    UPDATE: 'order_service_update_order',
    DELETE: 'order_service_delete_order',
  },
};
