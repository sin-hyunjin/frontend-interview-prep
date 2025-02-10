import { Product } from "../types";

export const generateProducts = (count: number = 1000): Product[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: Math.floor(Math.random() * 10000) + 1000,
    description: `Description for product ${index + 1}`,
    image: `https://picsum.photos/seed/${index + 1}/200/200`,
    category: ["Electronics", "Clothing", "Books", "Food"][
      Math.floor(Math.random() * 4)
    ],
  }));
};
