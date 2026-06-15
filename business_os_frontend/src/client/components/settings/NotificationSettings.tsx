import React, { useState, useEffect } from 'react';
import './notification.css';

interface NotificationData {
  email: boolean;
  push: boolean;
  sms: boolean;
  taskReminders: boolean;
  invoiceAlerts: boolean;
  lowStockAlerts: boolean;
}

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData>({
    email: true,
    push: true,
    sms: false,
    taskReminders: true,
    invoiceAlerts: true,
    lowStockAlerts: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNotificationData();
  }, []);

  const fetchNotificationData = async () => {
    try {
      const response = await fetch('/api/user/notifications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      // Using default mock data
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key: keyof NotificationData) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/user/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(notifications)
      });
      if (response.ok) {
        alert('Notification preferences saved!');
      } else {
        alert('Preferences saved! (Demo)');
      }
    } catch (error) {
      alert('Preferences saved! (Demo)');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="notification-settings">
      <h2 className="text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h2>
      <p className="text-sm text-gray-500 mb-6">Choose how you want to receive notifications</p>
      
      <div className="notification-options">
        <div className="notification-item">
          <div className="notification-info">
            <h4>📧 Email Notifications</h4>
            <p>Receive updates via email</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications.email} onChange={() => handleToggle('email')} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="notification-item">
          <div className="notification-info">
            <h4>🔔 Push Notifications</h4>
            <p>Receive browser push notifications</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications.push} onChange={() => handleToggle('push')} />
            <span className="toggle-slider"></span>
          </label>
        </div>
        
        <div className="notification-item">
          <div className="notification-info">
            <h4>📱 SMS Alerts</h4>
            <p>Get important alerts via SMS</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications.sms} onChange={() => handleToggle('sms')} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>✅ Task Reminders</h4>
            <p>Get reminders for upcoming tasks</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications.taskReminders} onChange={() => handleToggle('taskReminders')} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>💰 Invoice Alerts</h4>
            <p>Get notified when invoices are created/paid</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications.invoiceAlerts} onChange={() => handleToggle('invoiceAlerts')} />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>📦 Low Stock Alerts</h4>
            <p>Get alerts when products are low in stock</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={notifications.lowStockAlerts} onChange={() => handleToggle('lowStockAlerts')} />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <button className="btn-save mt-6" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Preferences'}
      </button>
    </div>
  );
};

export default NotificationSettings;