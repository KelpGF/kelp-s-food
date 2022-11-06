class TableModel {
	constructor() {
		if (this.constructor == TableModel) throw new Error("Abstract classes can't be instantiated.");
	}

	insertOne() {
		throw new Error("Method 'insertOne()' must be implemented.");
	}
	getAll() {
		throw new Error("Method 'getAll()' must be implemented.");
	}
	getById() {
		throw new Error("Method 'getById()' must be implemented.");
	}
	deleteById() {
		throw new Error("Method 'deleteById()' must be implemented.");
	}
}
