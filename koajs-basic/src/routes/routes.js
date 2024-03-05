const Router = require("koa-router");
const bookHandlers = require("../handlers/books/bookHandlers");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");
const productHandlers = require("../handlers/products/productHandlers");
const productInputMiddleware = require("../middleware/productInputMiddleware");
// Prefix all routes with /api
const router = new Router({
  prefix: "/api",
});

// routes for books
router.get("/books", bookHandlers.getBooks);
router.get("/books/:id", bookHandlers.getBook);
router.post("/books", bookInputMiddleware, bookHandlers.save);

// routes for products
router.get("/products", productHandlers.getProducts);
router.get("/products/:id", productHandlers.getProductById);
router.post(
  "/products",
  productInputMiddleware,
  productHandlers.addNewProductHandler
);

router.put(
  "/products/:id",
  productInputMiddleware,
  productHandlers.updateProductHandler
);
router.delete("/products/:id", productHandlers.deletedProductHandler);

module.exports = router;
