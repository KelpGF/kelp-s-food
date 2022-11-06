class ProductsTable extends TableModel {
	#_tableName = 'products';
	#_tableMode = 'readwrite';

	/** @type {IDBDatabase} */
	#_database;

	/** @type {IDBObjectStore} */
	#_objectStore;

	/** @type {ProductsTable} */
	static #_instance;

	/** @param {IDBDatabase} database */
	constructor(database) {
		super();

		this.#_database = database;
	}

	/** @param {IDBDatabase} database */
	static init(database) {
		ProductsTable.#_instance = new ProductsTable(database);
	}

	static get instance() {
		return ProductsTable.#_instance;
	}

	get objectStore() {
		if (!this.#_objectStore) {
			const transaction = this.#_database.transaction([this.#_tableName], this.#_tableMode);
			this.#_objectStore = transaction.objectStore(this.#_tableName);

			transaction.oncomplete = () => (this.#_objectStore = null);
		}

		return this.#_objectStore;
	}

	/**
	 * * Add one product
	 * @param {{meal: Array<String>; measure: String; name:String; qtd_per_day:Number; qtd_total:Number}} product
	 *
	 * @returns {Promise<void>}
	 */
	async insertOne(product) {
		return new Promise((resolve, reject) => {
			const objectStore = this.objectStore;

			const consult = objectStore.add(product);

			consult.onsuccess = (e) => resolve(e.target.result);
			consult.onerror = (e) => reject(e);
		});
	}

	/**
	 * * Get all elements
	 * @param {Number} id
	 *
	 * @returns {Promise<Array<Product>>}
	 */
	async getAll() {
		return new Promise((resolve, reject) => {
			const objectStore = this.objectStore;

			const consult = objectStore.getAll();

			consult.onsuccess = (e) => resolve(e.target.result);
			consult.onerror = (e) => reject(e);
		});
	}

	/**
	 * * Get one element by id
	 * @param {Number} id
	 */
	async getById(id) {
		return new Promise((resolve, reject) => {
			const objectStore = this.objectStore;

			const consult = objectStore.get(id);

			consult.onsuccess = (e) => resolve(e.target.result);
			consult.onerror = (e) => reject(e);
		});
	}

	/**
	 * * Delete one element by id
	 * @param {Number} id
	 */
	async deleteById(id) {
		return new Promise((resolve, reject) => {
			const objectStore = this.objectStore;

			const consult = objectStore.delete(id);

			consult.onsuccess = (e) => resolve(e.target.result);
			consult.onerror = (e) => reject(e);
		});
	}
}
