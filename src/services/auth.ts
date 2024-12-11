import { User } from '../types';

// Simuler un backend d'authentification
const MOCK_USER: User = {
  id: '1',
  name: 'Jean Dupont',
  email: 'jean.dupont@sncf.fr',
  preferences: {
    notifications: true,
    visibility: 'public',
  },
};

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (email === 'jean.dupont@sncf.fr' && password === 'password') {
      return MOCK_USER;
    }
    
    throw new Error('Identifiants invalides');
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return {
      ...MOCK_USER,
      name,
      email,
    };
  },

  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    // Simuler une requête API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    return {
      ...MOCK_USER,
      ...data,
    };
  },
};