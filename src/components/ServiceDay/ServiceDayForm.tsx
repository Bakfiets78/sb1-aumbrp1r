import React, { useState } from 'react';
import { ServiceDay } from '../../types';
import { useServiceDayStore } from '../../store/useServiceDayStore';

interface ServiceDayFormProps {
  initialData?: ServiceDay;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ServiceDayForm: React.FC<ServiceDayFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    date: initialData?.date || '',
    startTime: initialData?.startTime || '',
    endTime: initialData?.endTime || '',
    location: initialData?.location || '',
    status: initialData?.status || 'fixed',
  });

  const { addServiceDay, updateServiceDay } = useServiceDayStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (initialData) {
      updateServiceDay(initialData.id, formData);
    } else {
      addServiceDay({
        id: crypto.randomUUID(),
        userId: 'current-user-id', // À remplacer par l'ID réel de l'utilisateur
        likes: [],
        comments: [],
        ...formData,
      } as ServiceDay);
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="input mt-1"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heure de début
          </label>
          <input
            type="time"
            value={formData.startTime}
            onChange={(e) =>
              setFormData({ ...formData, startTime: e.target.value })
            }
            className="input mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Heure de fin
          </label>
          <input
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="input mt-1"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lieu</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="input mt-1"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as ServiceDay['status'],
            })
          }
          className="input mt-1"
        >
          <option value="fixed">Fixe</option>
          <option value="available">Disponible pour échange</option>
          <option value="pending_exchange">Échange en attente</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
};