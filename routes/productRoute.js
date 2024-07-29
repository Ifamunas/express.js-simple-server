import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
} from "../controllers/productsController.js";

const productsRouter = Router();

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

productsRouter.get("/products", getAllProducts);

productsRouter.post("/products", createProduct)

productsRouter.get("/products/:id", getSingleProduct);

export default productsRouter;
