const { data: products } = require("./products.json");
const fs = require("fs");

/**
 *
 * @returns [{id: number, name: string, price: number, desciption: string, product: string, color: string, image: string, createdAt: string}]
 */
function getAll() {
  return products;
}

/**
 *
 * @param id
 * @returns {id: number, name: string, price: number, desciption: string, product: string, color: string, image: string, createdAt: string}
 */
function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

/**
 *
 * @param data
 */
function addNewProduct(data) {
  data = {
    ...data,
    id: products.length + 1,
    createdAt: new Date().toISOString(),
  };
  const updatedProducts = [...products, data];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: updatedProducts })
  );
}

function updateProduct(id, data) {
  const productIndex = products.findIndex(
    (product) => product.id === Number(id)
  );
  products[productIndex] = { ...data, id: Number(id) };
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: products })
  );
}

function deleteProduct(id) {
  const deletedIndex = products.findIndex(
    (product) => product.id === Number(id)
  );
  products.splice(deletedIndex, 1);

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({ data: products })
  );
}

module.exports = {
  getOne,
  getAll,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
