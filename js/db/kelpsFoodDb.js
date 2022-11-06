class KelpsFoodDb {
	#_dbName = 'kelps_foods';
	#_dbTablesData = [
		{
			name: 'products',
			options: { autoIncrement: true, keyPath: 'id' },
			indexes: [{ name: 'name', options: { unique: false } }],
		},
	];

	/** @type {IDBDatabase} */
	#_connection;

	constructor() {
		const openIndexDB = window.indexedDB.open(this.#_dbName, 4);

		openIndexDB.onerror = (event) => {
			console.error(event);
		};

		openIndexDB.onsuccess = (event) => {
			console.log(`Database ${this.#_dbName} Connected`);
			this.#_connection = event.target.result;

			this.initTables();
		};

		openIndexDB.onupgradeneeded = (event) => {
			console.log('onupgradeneeded ' + this.#_dbName);

			/** @type {IDBDatabase} */
			const db = event.target.result;

			this.#_dbTablesData.forEach((dbData) => {
				const objectStore = db.createObjectStore(dbData.name, dbData.options);

				if (dbData.indexes)
					dbData.indexes.forEach((indexData) =>
						objectStore.createIndex(indexData.name, indexData.name, indexData.options),
					);
			});
		};
	}

	initTables() {
		ProductsTable.init(this.#_connection);
	}
}
