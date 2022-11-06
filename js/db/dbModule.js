class DbModule {
	constructor() {
		this.initDatabases();
	}

	initDatabases() {
		new KelpsFoodDb();
	}
}

new DbModule();
