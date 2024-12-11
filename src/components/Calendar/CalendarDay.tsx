import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ServiceDay } from '../../types';
import { ServiceDayBadge } from './ServiceDayBadge';

interface CalendarDayProps {
  date: Date;
  isToday: boolean;
  serviceDays: ServiceDay[];
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isToday,
  serviceDays,
}) => {
  return (
    <div
      className={`min-h-[100px] p-2 border rounded-lg ${
        isToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-sm ${
            isToday ? 'font-bold text-blue-600' : 'text-gray-600'
          }`}
        >
          {format(date, 'd')}
        </span>
      </div>
      <div className="space-y-1">
        {serviceDays.map((serviceDay) => (
          <ServiceDayBadge key={serviceDay.id} serviceDay={serviceDay} />
        ))}
      </div>
    </div>
  );
};