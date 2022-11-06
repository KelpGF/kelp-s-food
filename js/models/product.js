class Product {
  /** @type {Number} */
  id;
  /** @type {Array<String>} */
  meal;
  /** @type {String} */
  measure;
  /** @type {String} */
  name;
  /** @type {Number} */
  qtd_per_day;
  /** @type {Number} */
  qtd_total;

  /** @param {Product} data */
  constructor(data) {
    Object.assign(this, data)
  }
}