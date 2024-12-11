import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ServiceDay } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useServiceDayStore } from '../../store/useServiceDayStore';
import { useExchangeStore } from '../../store/useExchangeStore';
import { useNotificationStore } from '../../store/useNotificationStore';

interface ExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceDay: ServiceDay;
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({
  isOpen,
  onClose,
  serviceDay,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>('');
  const { user } = useAuthStore();
  const { serviceDays } = useServiceDayStore();
  const { addExchange } = useExchangeStore();
  const { addNotification } = useNotificationStore();

  const userServiceDays = serviceDays.filter(
    (day) => day.userId === user?.id && day.id !== serviceDay.id
  );

  const handleExchange = () => {
    if (!user || !selectedDayId) return;

    const exchange = {
      id: crypto.randomUUID(),
      fromUserId: user.id,
      toUserId: serviceDay.userId,
      fromServiceDayId: selectedDayId,
      toServiceDayId: serviceDay.id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    } as const;

    addExchange(exchange);

    addNotification({
      id: crypto.randomUUID(),
      userId: serviceDay.userId,
      type: 'exchange_request',
      content: `${user.name} propose un échange pour votre journée du ${serviceDay.date}`,
      read: false,
      createdAt: new Date().toISOString(),
      relatedId: exchange.id,
    });

    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Proposer un échange
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choisissez une journée à échanger
              </label>
              <select
                value={selectedDayId}
                onChange={(e) => setSelectedDayId(e.target.value)}
                className="input"
              >
                <option value="">Sélectionnez une journée</option>
                {userServiceDays.map((day) => (
                  <option key={day.id} value={day.id}>
                    {day.date} - {day.location}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleExchange}
                disabled={!selectedDayId}
                className="btn btn-primary"
              >
                Proposer l'échange
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};