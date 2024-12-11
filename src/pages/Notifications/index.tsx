import React from 'react';
import { NotificationList } from '../../components/Notifications/NotificationList';

export const NotificationsPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <NotificationList />
    </div>
  );
};