import React from 'react';
import { useNotificationStore } from '../../store/useNotificationStore';
import { NotificationItem } from './NotificationItem';

export const NotificationList: React.FC = () => {
  const { notifications, markAllAsRead } = useNotificationStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Notifications</h2>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Tout marquer comme lu
          </button>
        )}
      </div>
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Aucune notification pour le moment
          </p>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
};