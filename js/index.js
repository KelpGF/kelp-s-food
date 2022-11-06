const tableFoodsBody = document.querySelector('#table-foods tbody');
const dataListMeals = document.querySelector('#datalist-meals');
const selectMeasure = document.querySelector('#select-measure');

const productsTableInstance = () => {
	if (!ProductsTable.instance) productsTableInstance();

	return ProductsTable.instance;
};

function populateMealsList() {
	dataListMeals.innerHTML = Object.values(mealsEnum)
		.map((meal) => `<option value="${meal}">`)
		.join('');
}
function populateSelectMeasure() {
	selectMeasure.innerHTML = Object.keys(measuresEnum)
		.map((measureKey) => `<option value="${measureKey}">${measuresEnum[measureKey]}</option>`)
		.join('');
}

function loadAllContents() {
	setTimeout(populateTableFoods, 1000);
	populateMealsList();
	populateSelectMeasure();
}

window.onload = loadAllContents;
