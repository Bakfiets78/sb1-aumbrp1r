import React from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { ServiceDay } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useServiceDayStore } from '../../store/useServiceDayStore';
import { useNotificationStore } from '../../store/useNotificationStore';

interface LikeButtonProps {
  serviceDay: ServiceDay;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ serviceDay }) => {
  const { user } = useAuthStore();
  const { updateServiceDay } = useServiceDayStore();
  const { addNotification } = useNotificationStore();

  const isLiked = user ? serviceDay.likes.includes(user.id) : false;

  const handleLike = () => {
    if (!user) return;

    const newLikes = isLiked
      ? serviceDay.likes.filter((id) => id !== user.id)
      : [...serviceDay.likes, user.id];

    updateServiceDay(serviceDay.id, { likes: newLikes });

    if (!isLiked) {
      addNotification({
        id: crypto.randomUUID(),
        userId: serviceDay.userId,
        type: 'like',
        content: `${user.name} a aimé votre journée du ${serviceDay.date}`,
        read: false,
        createdAt: new Date().toISOString(),
        relatedId: serviceDay.id,
      });
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-1 ${
        isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
      }`}
    >
      {isLiked ? (
        <HeartSolid className="h-5 w-5" />
      ) : (
        <HeartOutline className="h-5 w-5" />
      )}
      <span className="text-sm">{serviceDay.likes.length}</span>
    </button>
  );
};