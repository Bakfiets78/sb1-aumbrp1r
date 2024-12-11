import { describe, it, expect, beforeEach } from 'vitest';
import { authService } from '../services/auth';

describe('Auth Service', () => {
  it('should login with valid credentials', async () => {
    const user = await authService.login('jean.dupont@sncf.fr', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('jean.dupont@sncf.fr');
  });

  it('should throw error with invalid credentials', async () => {
    await expect(
      authService.login('invalid@email.com', 'wrongpassword')
    ).rejects.toThrow('Identifiants invalides');
  });

  it('should register new user', async () => {
    const user = await authService.register(
      'Marie Martin',
      'marie.martin@sncf.fr',
      'password'
    );
    expect(user).toBeDefined();
    expect(user.name).toBe('Marie Martin');
    expect(user.email).toBe('marie.martin@sncf.fr');
  });

  it('should update user profile', async () => {
    const updatedUser = await authService.updateProfile('1', {
      name: 'Jean Martin',
      preferences: {
        notifications: false,
        visibility: 'private',
      },
    });
    expect(updatedUser.name).toBe('Jean Martin');
    expect(updatedUser.preferences.notifications).toBe(false);
    expect(updatedUser.preferences.visibility).toBe('private');
  });
});