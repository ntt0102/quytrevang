self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith(self.location.origin)) return;
    if (event.request.method !== "GET") return;
    if (event.request.url.endsWith(".mp3"))
        event.respondWith(fetch(event.request));
    else
        event.respondWith(
            fetch(event.request)
                .then((response) =>
                    caches.open("cache").then((cache) => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                )
                .catch(() =>
                    caches.match(event.request).then((response) => {
                        if (response) return response;
                        return self.clients
                            .matchAll({
                                includeUncontrolled: true,
                                type: "window",
                            })
                            .then((clients) =>
                                clients.forEach((client) =>
                                    client.postMessage({ type: "OFFLINE" })
                                )
                            );
                    })
                )
        );
});

self.addEventListener("push", (event) => {
    if (!(self.Notification && self.Notification.permission === "granted")) {
        return;
    }
    const data = event.data.json();
    event.waitUntil(self.registration.showNotification(data.title, data));
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    dismissNotification(event);
    event.waitUntil(
        self.clients
            .matchAll({
                includeUncontrolled: true,
                type: "window",
            })
            .then((clientList) => {
                if (clientList.length == 0)
                    return clients.openWindow(event.action || "/");
                if (!event.action) return clientList[0].focus();
                if (event.action.includes("http"))
                    return clients.openWindow(event.action);
                return clientList[0]
                    .navigate(event.action)
                    .then((c) => c.focus());
            })
    );
});
self.addEventListener("notificationclose", (event) => {
    dismissNotification(event);
});

function dismissNotification(event) {
    self.registration.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
            if (!event.notification.data || !event.notification.data.id) return;
            const data = new FormData();
            data.append("endpoint", subscription.endpoint);

            fetch(`api/notifications/${event.notification.data.id}/dismiss`, {
                method: "POST",
                body: data,
            });
        }
    });
}
