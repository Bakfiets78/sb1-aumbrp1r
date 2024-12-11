import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ServiceDay, Comment } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useServiceDayStore } from '../../store/useServiceDayStore';
import { useNotificationStore } from '../../store/useNotificationStore';

interface CommentSectionProps {
  serviceDay: ServiceDay;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ serviceDay }) => {
  const [comment, setComment] = useState('');
  const { user } = useAuthStore();
  const { updateServiceDay } = useServiceDayStore();
  const { addNotification } = useNotificationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    const newComment: Comment = {
      id: crypto.randomUUID(),
      userId: user.id,
      content: comment.trim(),
      createdAt: new Date().toISOString(),
    };

    updateServiceDay(serviceDay.id, {
      comments: [...serviceDay.comments, newComment],
    });

    addNotification({
      id: crypto.randomUUID(),
      userId: serviceDay.userId,
      type: 'comment',
      content: `${user.name} a commenté votre journée du ${serviceDay.date}`,
      read: false,
      createdAt: new Date().toISOString(),
      relatedId: serviceDay.id,
    });

    setComment('');
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Commentaires</h4>
      
      <div className="space-y-3">
        {serviceDay.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium">
                {comment.userId === user?.id ? 'Vous' : 'Utilisateur'}
              </span>
              <span className="text-xs text-gray-500">
                {format(new Date(comment.createdAt), 'Pp', { locale: fr })}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        ))}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="input flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
        </form>
      )}
    </div>
  );
};