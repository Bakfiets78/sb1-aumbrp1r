import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useServiceDayStore } from '../../store/useServiceDayStore';
import { CalendarDay } from './CalendarDay';

export const CalendarGrid: React.FC<{ currentDate: Date }> = ({ currentDate }) => {
  const { serviceDays } = useServiceDayStore();
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-1">
      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
        <div
          key={day}
          className="h-8 flex items-center justify-center font-semibold text-sm text-gray-700"
        >
          {day}
        </div>
      ))}
      
      {days.map((day) => {
        const dayServiceDays = serviceDays.filter(
          (serviceDay) => serviceDay.date === format(day, 'yyyy-MM-dd')
        );
        
        return (
          <CalendarDay
            key={day.toString()}
            date={day}
            isToday={isToday(day)}
            serviceDays={dayServiceDays}
          />
        );
      })}
    </div>
  );
};