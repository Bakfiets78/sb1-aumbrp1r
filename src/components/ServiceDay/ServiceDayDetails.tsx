import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ServiceDay } from '../../types';
import { LikeButton } from '../Social/LikeButton';
import { CommentSection } from '../Social/CommentSection';
import { ExchangeButton } from '../Exchange/ExchangeButton';

interface ServiceDayDetailsProps {
  serviceDay: ServiceDay;
}

export const ServiceDayDetails: React.FC<ServiceDayDetailsProps> = ({
  serviceDay,
}) => {
  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-2">
          {format(new Date(serviceDay.date), 'PPPP', { locale: fr })}
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Début:</span>{' '}
            {format(new Date(`2000-01-01T${serviceDay.startTime}`), 'HH:mm')}
          </div>
          <div>
            <span className="text-gray-500">Fin:</span>{' '}
            {format(new Date(`2000-01-01T${serviceDay.endTime}`), 'HH:mm')}
          </div>
          <div>
            <span className="text-gray-500">Lieu:</span> {serviceDay.location}
          </div>
          <div>
            <span className="text-gray-500">Statut:</span>{' '}
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                serviceDay.status === 'fixed'
                  ? 'bg-green-100 text-green-800'
                  : serviceDay.status === 'available'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {serviceDay.status === 'fixed'
                ? 'Fixe'
                : serviceDay.status === 'available'
                ? 'Disponible'
                : 'En attente'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <LikeButton serviceDay={serviceDay} />
        <ExchangeButton serviceDay={serviceDay} />
      </div>

      <CommentSection serviceDay={serviceDay} />
    </div>
  );
};