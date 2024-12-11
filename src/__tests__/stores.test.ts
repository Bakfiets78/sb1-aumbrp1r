import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../store/useAuthStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { useServiceDayStore } from '../store/useServiceDayStore';
import { useExchangeStore } from '../store/useExchangeStore';

describe('Auth Store', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should handle login and logout', () => {
    const store = useAuthStore.getState();
    
    store.login({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      preferences: {
        notifications: true,
        visibility: 'public',
      },
    });

    expect(store.isAuthenticated).toBe(true);
    expect(store.user?.name).toBe('Test User');

    store.logout();
    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBeNull();
  });
});

describe('Notification Store', () => {
  beforeEach(() => {
    const store = useNotificationStore.getState();
    store.notifications.forEach((n) => store.removeNotification(n.id));
  });

  it('should handle notifications', () => {
    const store = useNotificationStore.getState();
    
    const notification = {
      id: '1',
      userId: '1',
      type: 'like' as const,
      content: 'Test notification',
      read: false,
      createdAt: new Date().toISOString(),
    };

    store.addNotification(notification);
    expect(store.notifications).toHaveLength(1);
    expect(store.unreadCount).toBe(1);

    store.markAsRead('1');
    expect(store.unreadCount).toBe(0);
  });
});

describe('Service Day Store', () => {
  beforeEach(() => {
    useServiceDayStore.getState().setServiceDays([]);
  });

  it('should handle service days', () => {
    const store = useServiceDayStore.getState();
    
    const serviceDay = {
      id: '1',
      userId: '1',
      date: '2023-10-20',
      startTime: '09:00',
      endTime: '17:00',
      location: 'Paris',
      status: 'fixed' as const,
      likes: [],
      comments: [],
    };

    store.addServiceDay(serviceDay);
    expect(store.serviceDays).toHaveLength(1);

    store.updateServiceDay('1', { location: 'Lyon' });
    expect(store.serviceDays[0].location).toBe('Lyon');

    store.deleteServiceDay('1');
    expect(store.serviceDays).toHaveLength(0);
  });
});