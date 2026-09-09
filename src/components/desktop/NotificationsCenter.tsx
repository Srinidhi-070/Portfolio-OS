import React from 'react';
import { useOS } from '../../context/OSContext';
import { Bell, CheckCheck, Trash2, X, Info, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export const NotificationsCenter: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationRead,
    clearNotifications,
    openApp,
    theme
  } = useOS();

  if (!isNotificationsOpen) return null;
  const isLight = theme === 'arctic-light';

  return (
    <div
      onClick={() => setIsNotificationsOpen(false)}
      className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-xs flex justify-end animate-fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-sm h-full glass-panel-heavy border-l p-4 flex flex-col animate-slide-in-right"
        style={{ color: 'var(--text-primary)', borderColor: 'var(--glass-border)' }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--glass-border)' }}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <Bell className="w-4 h-4 accent-text" /> Notifications Center
          </div>
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button
                onClick={clearNotifications}
                className="p-1 rounded-lg opacity-70 hover:opacity-100 hover:text-rose-400 transition-colors"
                title="Clear All"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 os-scrollbar">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs" style={{ color: 'var(--text-secondary)' }}>
              No new notifications. Everything is running smoothly!
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.actionAppId) {
                    openApp(notif.actionAppId);
                    setIsNotificationsOpen(false);
                  }
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${notif.read ? 'opacity-60 glass-surface' : 'glass-card-interactive shadow-md'}`}
                style={{ borderColor: 'var(--glass-border)' }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-semibold text-xs" style={{ color: 'var(--text-primary)' }}>
                    {notif.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                    {notif.type === 'info' && <Info className="w-3.5 h-3.5 text-cyan-500" />}
                    {notif.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                    {notif.title}
                  </div>
                  <span className="text-[10px] whitespace-nowrap" style={{ color: 'var(--text-tertiary)' }}>{notif.time}</span>
                </div>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{notif.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
