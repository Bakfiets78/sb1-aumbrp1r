import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { authService } from '../../services/auth';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    preferences: {
      notifications: user?.preferences.notifications || false,
      visibility: user?.preferences.visibility || 'public',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedUser = await authService.updateProfile(user.id, formData);
      updateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profil</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary"
            >
              Modifier
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="input mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Préférences
              </label>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.preferences.notifications}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          notifications: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Recevoir les notifications
                  </label>
                </div>

                <div>
                  <select
                    value={formData.preferences.visibility}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          visibility: e.target.value as 'public' | 'private',
                        },
                      })
                    }
                    className="input mt-1"
                  >
                    <option value="public">Public</option>
                    <option value="private">Privé</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary"
              >
                {isLoading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Nom</h3>
              <p className="mt-1 text-sm text-gray-900">{user.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-sm text-gray-900">{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Préférences</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-900">
                  Notifications:{' '}
                  {user.preferences.notifications ? 'Activées' : 'Désactivées'}
                </p>
                <p className="text-sm text-gray-900">
                  Visibilité:{' '}
                  {user.preferences.visibility === 'public' ? 'Public' : 'Privé'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};