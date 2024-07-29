import express from "express";

import productsRouter from "./routes/productRoute.js";

const PORT = 8080;
const app = express();
app.use(express.json());

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

app.get("/", (request, response) => {
  response.send("Hello, World!");
});

app.post("/", (request, response) => {
  const data = request.body;
  console.log("Return post:", data);
  response.send("Data is successfully created.");
});

app.use(productsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
