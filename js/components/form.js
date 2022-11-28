const formProduct = new Product({
	name: '',
	qtd_per_day: 1,
	qtd_total: 0,
	measure: measuresEnum.unity,
	meal: [],
});

const strategiesFormValues = {
	name: (val) => val,
	qtd_per_day: (val) => Number(val),
	qtd_total: (val) => Number(val),
	measure: (val) => val,
	meal: (val) =>
		formProduct.meal.includes(val) || !Object.values(mealsEnum).includes(val)
			? formProduct.meal
			: [...formProduct.meal, val],
};

/** @type {HTMLFormElement} */
const formProductElement = document.querySelector('#product-form');
const formProductSelectedMealsElement = document.querySelector('#product-form #selected-meals');
formProductElement.onchange = changeFormValue;
formProductElement.onsubmit = addProduct;

/** @param {InputEvent} event */
function changeFormValue(event) {
	const { name, value } = event.target;

	formProduct[name] = strategiesFormValues[name](value);

	if (name === 'meal') {
		event.target.value = '';
		showMealsForm();
	}
}
function removeMealForm(deletedMeal) {
	formProduct.meal = formProduct.meal.filter((meal) => meal != deletedMeal);
	showMealsForm();
}
function showMealsForm() {
	formProductSelectedMealsElement.innerHTML = formProduct.meal
		.map(
			(meal) => `
        <span onClick="removeMealForm('${meal}')">
          ${meal}
          <span class='close-icon'>
            &#x2715
          </span>
        </span>
  `,
		)
		.join('');
}

async function addProduct(event) {
	event.preventDefault();

	if (
		formProduct.name.length < 3 ||
		formProduct.qtd_per_day <= 0 ||
		formProduct.qtd_total < 0 ||
		!Object.values(measuresEnum).includes(formProduct.measure) ||
		formProduct.meal.length === 0
	)
		return;

	await productsTableInstance()
		.insertOne({
			meal: formProduct.meal,
			measure: formProduct.measure,
			name: formProduct.name,
			qtd_per_day: formProduct.qtd_per_day,
			qtd_total: formProduct.qtd_total,
		})
		.then(() => {
			formProduct.name = '';
			formProduct.measure = '';
			formProduct.qtd_per_day = 1;
			formProduct.qtd_total = 0;
			formProduct.meal = [];

			showMealsForm();
			populateTableFoods();

			formProductElement['input-name'].value = '';
			formProductElement['input-meal'].value = '';
			formProductElement['input-qtd_per_day'].value = 1;
			formProductElement['input-qtd_total'].value = 0;
		})
		.catch(console.error);
}

async function deleteProduct(id) {
	await productsTableInstance().deleteById(Number(id)).then(populateTableFoods).catch(console.error);
}
