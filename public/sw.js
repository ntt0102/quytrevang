importScripts("helper.js");

self.addEventListener("fetch", (event) => {
    if (!event.request.url.startsWith(self.location.origin)) return;
    if (event.request.method !== "GET") return;
    return event.respondWith(
        fetch(event.request)
            .then((response) =>
                caches
                    .open("cache")
                    .then((cache) =>
                        cache
                            .put(event.request, response.clone())
                            .then(() => response)
                    )
            )
            .catch(() =>
                caches.match(event.request).then((response) => {
                    if (!!response) return response;
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
    if (data.data.event == "export-stock") connectFireantSocket();
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

async function connectFireantSocket() {
    const url =
        "wss://tradestation.fireant.vn/quote?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSIsImtpZCI6IkdYdExONzViZlZQakdvNERWdjV4QkRITHpnSSJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4iLCJhdWQiOiJodHRwczovL2FjY291bnRzLmZpcmVhbnQudm4vcmVzb3VyY2VzIiwiZXhwIjoxODg5NjIyNTMwLCJuYmYiOjE1ODk2MjI1MzAsImNsaWVudF9pZCI6ImZpcmVhbnQudHJhZGVzdGF0aW9uIiwic2NvcGUiOlsiYWNhZGVteS1yZWFkIiwiYWNhZGVteS13cml0ZSIsImFjY291bnRzLXJlYWQiLCJhY2NvdW50cy13cml0ZSIsImJsb2ctcmVhZCIsImNvbXBhbmllcy1yZWFkIiwiZmluYW5jZS1yZWFkIiwiaW5kaXZpZHVhbHMtcmVhZCIsImludmVzdG9wZWRpYS1yZWFkIiwib3JkZXJzLXJlYWQiLCJvcmRlcnMtd3JpdGUiLCJwb3N0cy1yZWFkIiwicG9zdHMtd3JpdGUiLCJzZWFyY2giLCJzeW1ib2xzLXJlYWQiLCJ1c2VyLWRhdGEtcmVhZCIsInVzZXItZGF0YS13cml0ZSIsInVzZXJzLXJlYWQiXSwianRpIjoiMjYxYTZhYWQ2MTQ5Njk1ZmJiYzcwODM5MjM0Njc1NWQifQ.dA5-HVzWv-BRfEiAd24uNBiBxASO-PAyWeWESovZm_hj4aXMAZA1-bWNZeXt88dqogo18AwpDQ-h6gefLPdZSFrG5umC1dVWaeYvUnGm62g4XS29fj6p01dhKNNqrsu5KrhnhdnKYVv9VdmbmqDfWR8wDgglk5cJFqalzq6dJWJInFQEPmUs9BW_Zs8tQDn-i5r4tYq2U8vCdqptXoM7YgPllXaPVDeccC9QNu2Xlp9WUvoROzoQXg25lFub1IYkTrM66gJ6t9fJRZToewCt495WNEOQFa_rwLCZ1QwzvL0iYkONHS_jZ0BOhBCdW9dWSawD6iF1SIQaFROvMDH1rg";
    const ws = new WebSocket(url);

    ws.onopen = function () {
        console.log("WebSocket connection open");
        const msg = '{"protocol":"messagepack","version":1}';
        ws.send(msg);
    };

    ws.onmessage = function (e) {
        const reader = new FileReader();
        reader.onload = function (evt) {
            const arrayBuffer = evt.target.result;
            const parsedMessages = self.bufferParse(arrayBuffer);
            parsedMessages.forEach((e) => {
                const r = self.bufferDecode(e);
                if (r[3] == "UpdateLastPrices" && r[4][0].length > 2000) {
                    exportStock(r[4][0]);
                    ws.close();
                }
            });
        };
        reader.readAsArrayBuffer(e.data);
    };

    ws.onclose = function () {
        console.log("WebSocket connection closed");
    };

    ws.onerror = function (error) {
        connectFireantSocket();
        console.error("WebSocket error:", error);
    };
}

function exportStock(data) {
    const form = new FormData();
    form.append("stockData", JSON.stringify(data));
    fetch("api/export-stock", {
        method: "POST",
        body: form,
    })
        .then((rsp) => rsp.json())
        .then((result) => console.log("result: ", result));
}
