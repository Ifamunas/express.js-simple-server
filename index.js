import { parse } from "querystring";

import fs from "fs/promises";
import http from "http";

const PORT = 8080;

let products = [
  {
    id: 1,
    name: "Laptop",
    image: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg",
    description: "High-performance laptop for all your needs.",
    price: "3999",
    categories: [1, 2],
    variants: ["8GB RAM", "16GB RAM"],
    sizes: ["13-inch", "15-inch"],
  },
  {
    id: 2,
    name: "Smartphone",
    image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
    description: "Latest smartphone with advanced features.",
    price: "2999",
    categories: [1, 3],
    variants: ["64GB", "128GB"],
    sizes: [],
  },
];

const handleSuccess = (response, status, message, payload = {}) => {
  response.writeHead(status, { "Content-Type": "text/plain" });
  response.end(
    JSON.stringify({
      message: message,
      payload: payload,
    })
  );
};

const handleError = (response, status, message) => {
  response.writeHead(status, { "Content-Type": "text/plain" });
  response.end(
    JSON.stringify({
      message: message,
    })
  );
};

http
  .createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    if (request.url === "/" && request.method === "GET") {
      try {
        handleSuccess(response, 200, "Hello, World!");
      } catch (error) {
        handleError(response, 500, "Server Error");
      }
    } else if (request.url === "/" && request.method === "POST") {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body = body + chunk;
          console.log(body);
        });
        handleSuccess(response, 200, "Data is created successfully.");
      } catch (error) {
        handleError(response, 500, "Error in creating new data");
      }
    } else if (request.url === "/products" && request.method === "GET") {
      try {
        handleSuccess(response, 200, "All products returned", products);
      } catch (error) {
        handleError(response, 500, "Server Error");
      }
    } else if (
      request.url.match(/\/products\/([0-9]+)/) &&
      request.method === "GET"
    ) {
      try {
        const id = Number(request.url.split("/")[2]);
        const foundProduct = products.find((product) => product.id === id);
        if (!foundProduct) {
          handleError(
            response,
            404,
            `Error: product of id ${id} does not exist.`
          );
          return;
        }
        handleSuccess(response, 200, "Product found", foundProduct);
      } catch (error) {
        handleError(response, 500, "Error in fetching the product.");
      }
    } else if (
      request.url.match(/\/products\/([0-9]+)/) &&
      request.method === "DELETE"
    ) {
      try {
        const id = Number(request.url.split("/")[2]);
        const foundProduct = products.find((product) => product.id === id);
        if (!foundProduct) {
          handleError(
            response,
            404,
            `Error: product of id ${id} does not exist.`
          );
          return;
        }
        products.filter((product) => product.id !== id);
        handleSuccess(
          response,
          200,
          `Product of id ${id} has been deleted successfully`
        );
      } catch (error) {
        handleError(response, 500, "Error in deleting the product.");
      }
    } else if (request.url == "/products" && method == "POST") {
      try {
        let body = "";
        req.on("data", (chunk) => {
          body = body + chunk;
        });
        req.on("end", async () => {
          const data = parse(body);
          console.log(data);
          const newProduct = {
            id: new Date().getMilliseconds(),
            name: data.name,
            image: data.image,
            description: data.description,
            categories: data.categories,
            variants: data.variants,
            sizes: data.sizes,
            price: data.price,
          };
          const existingProducts = JSON.parse(
            await fs.readFile("products.json", "utf-8")
          );
          existingProducts.push(newProduct);
          await fs.writeFile("products.json", JSON.stringify(existingProducts));
          handleSuccess(response, 200, "New product created successfully");
        });
      } catch (error) {
        handleError(res, 500, "Error in creating new data");
      }
    }
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
