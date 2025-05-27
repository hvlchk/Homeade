importScripts('https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js');

// ✅ Custom behavior: focus or open installed PWA window on notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const urlToOpen = new URL('/', self.location.origin).href;

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      for (let client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});