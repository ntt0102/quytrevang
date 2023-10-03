class OrderChartDb {
    // Hàm khởi tạo
    constructor() {
        this.create();
    }

    // Các phương thức
    create() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("orderChart", 1);
            request.onupgradeneeded = (e) => {
                this.store = e.target.result;
                this.store.createObjectStore("order", { keyPath: "kind" });
                this.store.createObjectStore("line", { keyPath: "price" });
                this.store.createObjectStore("box", { keyPath: "point" });
                this.store.createObjectStore("ruler", { keyPath: "point" });
                this.store.createObjectStore("pattern1", { keyPath: "point" });
                this.store.createObjectStore("pattern2", { keyPath: "point" });
                this.store.createObjectStore("volprofile", { keyPath: "time" });
                this.store.createObjectStore("alert", { keyPath: "price" });
                resolve();
            };
            request.onsuccess = (e) => {
                this.store = e.target.result;
                resolve();
            };
            request.onerror = () => {
                location.reload();
                reject();
            };
        });
    }
    get(tables) {
        var database = this.store;
        return new Promise(function (resolve, reject) {
            var tx = database.transaction(tables, "readonly");
            if (Array.isArray(tables)) {
                var stores = tables.map((table) => tx.objectStore(table));
                var promises = stores.map(loadStore);
                Promise.all(promises).then((arr) => resolve(arr));
            } else {
                var store = tx.objectStore(tables);
                loadStore(store).then((d) => resolve(d));
            }
        });

        function loadStore(store) {
            return new Promise(function (resolve, reject) {
                const request = store.getAll();
                request.onsuccess = (e) => resolve(e.target.result);
                request.onerror = () => reject();
            });
        }
    }
    set(table, data) {
        const store = this.store
            .transaction(table, "readwrite")
            .objectStore(table);
        if (Array.isArray(data)) {
            if (data.length > 0) data.forEach((item) => store.put(item));
        } else store.put(data);
    }
    clear(table) {
        var database = this.store;
        return new Promise(function (resolve, reject) {
            const request = database
                .transaction(table, "readwrite")
                .objectStore(table)
                .clear();

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (err) => {
                console.error(`Error to empty Object Store: ${table}`);
                reject();
            };
        });
    }
}

export default new OrderChartDb();
