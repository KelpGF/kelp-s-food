async function populateTableFoods() {
	const products = await productsTableInstance().getAll();

	const productsHtml = products
		.map((product) => {
			return `
      <tr>
        <td>${product.name}</td>
        <td>${product.qtd_per_day}</td>
        <td>${product.qtd_total}</td>
        <td>${measuresEnum[product.measure] || product.measure}</td>
        <td>
          ${product.meal.map((meal) => mealsEnum[meal] || meal).join(' | ')}
        </td>
        <td>
          <button type="button" onClick="deleteProduct(${product.id})" class="btn-red">
            Excluir
          </button>
        </td>
      </tr>
    `;
		})
		.join('');

	tableFoodsBody.innerHTML = productsHtml;
}
