const express = require("express");
var cors = require("cors");
const repoContext = require("./repository/repository-wrapper.js");
const validators = require("./validators/custom-validations.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => validators.body(req, res, next));

app.listen(3000, function () {
  console.log("Server started. Listening on port 3000.");
});

app.get("/api/products", (req, res) => {
  let products = repoContext.products.findAllProducts();
  res.send(products);
});

app.get("/api/products/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  let product = repoContext.products.findProductById(id);
  res.send(product);
});

app.post("/api/products", (req, res) => {
  let newProduct = req.body;
  let addedProduct = repoContext.products.createProduct(newProduct);
  res.send(addedProduct);
});

app.put("/api/products", (req, res) => {
  let productToUpdate = req.body;
  let updatedProduct = repoContext.products.updateProduct(productToUpdate);
  res.send(updatedProduct);
});

app.delete("/api/products/:id", (req, res) => {
  let id = req.params.id;
  let updatedDataSet = repoContext.products.deleteProduct(id);
  res.send(updatedDataSet);
});
