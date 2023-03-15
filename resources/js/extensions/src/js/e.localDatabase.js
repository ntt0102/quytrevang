class LocalDatabase {
    // Hàm khởi tạo
    constructor() {}

    // Các phương thức
    init = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("vpsDB", 1);
            request.onupgradeneeded = e => {
                console.log("onupgradeneeded");
                this.database = e.target.result;
                this.database.createObjectStore("data", { keyPath: "time" });
                this.database.createObjectStore("order", { keyPath: "kind" });
                this.database.createObjectStore("marker", { keyPath: "time" });
                this.database.createObjectStore("line", { keyPath: "price" });
                this.database.createObjectStore("ruler", { keyPath: "point" });
                this.database.createObjectStore("alert", { keyPath: "price" });
                resolve();
            };
            request.onsuccess = e => {
                console.log("onsuccess");
                this.database = e.target.result;
                resolve();
            };
            request.onerror = () => {
                console.log("onerror");
                location.reload();
                reject();
            };
        });
    };
    get = tables => {
        var database = this.database;
        return new Promise(function(resolve, reject) {
            var tx = database.transaction(tables, "readonly");
            if (Array.isArray(tables)) {
                var stores = tables.map(table => tx.objectStore(table));
                var promises = stores.map(loadStore);
                Promise.all(promises).then(arr => resolve(arr));
            } else {
                var store = tx.objectStore(tables);
                loadStore(store).then(d => resolve(d));
            }
        });

        function loadStore(store) {
            return new Promise(function(resolve, reject) {
                const request = store.getAll();
                request.onsuccess = e => resolve(e.target.result);
                request.onerror = () => reject();
            });
        }
    };
    set = (table, data) => {
        const store = this.database
            .transaction(table, "readwrite")
            .objectStore(table);
        if (Array.isArray(data)) {
            if (data.length > 0) data.forEach(item => store.put(item));
        } else store.put(data);
    };
    clear = table => {
        var database = this.database;
        return new Promise(function(resolve, reject) {
            const request = database
                .transaction(table, "readwrite")
                .objectStore(table)
                .clear();

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = err => {
                console.error(`Error to empty Object Store: ${table}`);
                reject();
            };
        });
    };
}
