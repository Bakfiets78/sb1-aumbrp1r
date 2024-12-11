import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Notification } from '../../types';
import { useNotificationStore } from '../../store/useNotificationStore';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const { markAsRead } = useNotificationStore();

  const getIcon = () => {
    switch (notification.type) {
      case 'like':
        return '❤️';
      case 'comment':
        return '💬';
      case 'exchange_request':
        return '🔄';
      case 'exchange_response':
        return '✅';
      default:
        return '📢';
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${
        notification.read ? 'bg-white' : 'bg-blue-50'
      }`}
      onClick={() => !notification.read && markAsRead(notification.id)}
    >
      <div className="flex items-start space-x-3">
        <div className="text-xl">{getIcon()}</div>
        <div className="flex-1">
          <p className="text-sm text-gray-900">{notification.content}</p>
          <p className="text-xs text-gray-500 mt-1">
            {format(new Date(notification.createdAt), 'PPp', { locale: fr })}
          </p>
        </div>
      </div>
    </div>
  );
};