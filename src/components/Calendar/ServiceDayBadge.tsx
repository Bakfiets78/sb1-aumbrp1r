import React from 'react';
import { format } from 'date-fns';
import { ServiceDay } from '../../types';

interface ServiceDayBadgeProps {
  serviceDay: ServiceDay;
}

export const ServiceDayBadge: React.FC<ServiceDayBadgeProps> = ({ serviceDay }) => {
  const getStatusColor = (status: ServiceDay['status']) => {
    switch (status) {
      case 'fixed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'available':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending_exchange':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      className={`p-1 rounded text-xs border ${getStatusColor(
        serviceDay.status
      )}`}
    >
      <div className="font-medium">
        {format(new Date(`2000-01-01T${serviceDay.startTime}`), 'HH:mm')} -{' '}
        {format(new Date(`2000-01-01T${serviceDay.endTime}`), 'HH:mm')}
      </div>
      <div className="text-xs truncate">{serviceDay.location}</div>
    </div>
  );
};