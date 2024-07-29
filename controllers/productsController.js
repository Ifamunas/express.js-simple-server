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

export const getAllProducts = (request, response) => {
  response.send({
    success: true,
    message: "All products are retrieved successfully",
    payload: products,
  });
};

export const getSingleProduct = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const productFound = products.find((product) => product.id === id);

  if (productFound) {
    response.status(200).send({
      success: true,
      message: "Product is found.",
      payload: productFound,
    });
  } else {
    response.status(404).send({
      success: false,
      message: `There is no product with the id of ${id}`,
    });
  }
};

export const createProduct = (request, response) => {
  try {
    console.log("Request body: ", request.body);
    const data = request.body
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

    products.push(newProduct);
    response.status(201).json(products);

  } catch (error) {
    response.status(500).send({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
};
