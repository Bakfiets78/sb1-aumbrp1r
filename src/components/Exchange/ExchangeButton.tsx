import React, { useState } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { ServiceDay } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useExchangeStore } from '../../store/useExchangeStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { ExchangeModal } from './ExchangeModal';

interface ExchangeButtonProps {
  serviceDay: ServiceDay;
}

export const ExchangeButton: React.FC<ExchangeButtonProps> = ({ serviceDay }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthStore();
  const { exchanges } = useExchangeStore();

  const isPending = exchanges.some(
    (exchange) =>
      (exchange.fromServiceDayId === serviceDay.id ||
        exchange.toServiceDayId === serviceDay.id) &&
      exchange.status === 'pending'
  );

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={!user || serviceDay.status === 'fixed' || isPending}
        className={`flex items-center space-x-2 ${
          !user || serviceDay.status === 'fixed' || isPending
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-blue-600 hover:text-blue-800'
        }`}
      >
        <ArrowsRightLeftIcon className="h-5 w-5" />
        <span className="text-sm">
          {isPending ? 'Échange en attente' : 'Proposer un échange'}
        </span>
      </button>

      <ExchangeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceDay={serviceDay}
      />
    </>
  );
};