// ✅ No importScripts to OneSignal SDK

// ✅ Notification click: open correct page or fallback
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const data = event.notification.data || {};
  const targetUrl = data.url || '/main';
  const urlToOpen = new URL(targetUrl, self.location.origin).href;

  event.waitUntil((async () => {
    const allClients = await clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    for (const client of allClients) {
      if (client.url === urlToOpen && 'focus' in client) {
        return client.focus();
      }
    }

    if (clients.openWindow) {
      return clients.openWindow(urlToOpen);
    }
  })());
});