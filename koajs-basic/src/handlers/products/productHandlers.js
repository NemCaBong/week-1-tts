const {
  getOne: getProduct,
  getAll: getAllProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} = require("../../database/productRepository");

/**
 *
 * @param ctx
 */
async function getProducts(ctx) {
  try {
    const { limit, sort } = ctx.query;

    let products = limit ? getAllProducts().slice(0, limit) : getAllProducts();

    if (sort) {
      sort === "desc"
        ? products.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        : products.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    // ctx.body = {
    //   data: products,
    // };
    await ctx.render("pages/products", { products });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

async function getProductById(ctx) {
  try {
    const { id } = ctx.params;
    const { fields } = ctx.request.query;
    let fieldsArray = [];
    if (fields) {
      fieldsArray = fields.split(",");
    }
    const currentProduct = getProduct(id);
    if (!currentProduct) throw new Error("Product Not Found with that id!");

    const filteredProduct = {};
    if (fieldsArray.length > 0) {
      fieldsArray.forEach((field) => {
        filteredProduct[field] = currentProduct[field];
      });
    }

    // return (ctx.body = {
    //   data: fieldsArray.length > 0 ? filteredProduct : currentProduct,
    // });

    await ctx.render("pages/product", {
      product: fieldsArray.length > 0 ? filteredProduct : currentProduct,
    });
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function addNewProductHandler(ctx) {
  try {
    const data = ctx.request.body;
    addNewProduct(data);
    ctx.status = 201;
    ctx.body = {
      success: true,
      data: data,
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: e.message,
    };
  }
}

async function updateProductHandler(ctx) {
  try {
    const { id } = ctx.params;
    const data = ctx.request.body;
    updateProduct(id, data);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: { ...data, id: Number(id) },
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

async function deletedProductHandler(ctx) {
  try {
    const { id } = ctx.params;
    deleteProduct(id);
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: "Product deleted",
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      error: err.message,
    };
  }
}

module.exports = {
  getProducts,
  getProductById,
  addNewProductHandler,
  updateProductHandler,
  deletedProductHandler,
};
