class LocalDatabase {
    // Hàm khởi tạo
    constructor() {
        this.init();
    }
    // Các phương thức
    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("vpsDB", 1);
            request.onupgradeneeded = e => {
                console.log("onupgradeneeded");
                mDatabase = e.target.result;
                mDatabase.createObjectStore("data", { keyPath: "time" });
                mDatabase.createObjectStore("order", { keyPath: "kind" });
                mDatabase.createObjectStore("marker", { keyPath: "time" });
                mDatabase.createObjectStore("line", { keyPath: "price" });
                mDatabase.createObjectStore("ruler", { keyPath: "point" });
                mDatabase.createObjectStore("alert", { keyPath: "price" });
                resolve();
            };
            request.onsuccess = e => {
                console.log("onsuccess");
                mDatabase = e.target.result;
                resolve();
            };
            request.onerror = () => {
                console.log("onerror");
                location.reload();
                reject();
            };
        });
    }
    get(tables) {
        return new Promise(function(resolve, reject) {
            var tx = mDatabase.transaction(tables, "readonly");
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
    }
    set(table, data) {
        const store = mDatabase
            .transaction(table, "readwrite")
            .objectStore(table);
        if (Array.isArray(data)) {
            if (data.length > 0) data.forEach(item => store.put(item));
        } else store.put(data);
    }
    clear(table) {
        return new Promise(function(resolve, reject) {
            const request = mDatabase
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
    }
}
