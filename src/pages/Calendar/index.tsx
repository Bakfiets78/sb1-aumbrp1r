import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarGrid } from '../../components/Calendar/CalendarGrid';
import { ServiceDayForm } from '../../components/ServiceDay/ServiceDayForm';
import { Dialog } from '@headlessui/react';
import { PlusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handlePreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </h2>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
        
        <button
          onClick={() => setIsFormOpen(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Nouvelle journée</span>
        </button>
      </div>

      <CalendarGrid currentDate={currentDate} />

      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md rounded-lg bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-4">
              Nouvelle journée de service
            </Dialog.Title>
            
            <ServiceDayForm
              onSubmit={() => setIsFormOpen(false)}
              onCancel={() => setIsFormOpen(false)}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};