import { DataSource } from "typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "./entities/category.entity";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 15432,
  username: "admin",
  password: "123",
  database: "db",
  entities: ["src/entities/**/*.ts"],
  logging: true,
  synchronize: true,
});

export const seedData = async () => {
  const productRepository = dataSource.getRepository(Product);
  await productRepository.clear();
  const products: Omit<Product, "id">[] = [
    {
      name: "Молоко",
      description: "Молоко 3,5%",
      category: "Еда",
      count: 5,
      measure: "л",
      img: "",
    },
    {
      name: "Пицца маргарита",
      description:
        "традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой. Повар, специализирующийся на приготовлении пиццы, — пиццайоло.",
      category: "Еда",
      count: 10,
      measure: "шт",
      img: "/pizza-1.png",
    },
    {
      name: "Сырная пицца",
      description:
        "традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой. Повар, специализирующийся на приготовлении пиццы, — пиццайоло.",
      category: "Еда",
      count: 10,
      measure: "шт",
      img: "/pizza-1.png",
    },
    {
      name: "Гавайская пицца",
      description:
        "традиционное итальянское блюдо, изначально в виде круглой дрожжевой лепёшки, выпекаемой с уложенной сверху начинкой из томатного соуса, сыра и зачастую других ингредиентов, таких как мясо, овощи, грибы и прочие продукты. Небольшую пиццу иногда называют пиццеттой. Повар, специализирующийся на приготовлении пиццы, — пиццайоло.",
      category: "Еда",
      count: 10,
      measure: "шт",
      img: "/pizza-1.png",
    },
    {
      name: "Тетради",
      description: "Тетради 64 листа",
      category: "Канцелярия",
      count: 100,
      measure: "шт",
      img: "",
    },
    {
      name: "Альбом",
      description: "Альбом 24 листа",
      category: "Канцелярия",
      count: 50,
      measure: "шт",
      img: "",
    },
    {
      name: "Карандаши",
      description: "Набор цветных карандашей",
      category: "Канцелярия",
      count: 30,
      measure: "шт",
      img: "",
    },
    {
      name: "Наушники",
      description: "Проводные наушники",
      category: "Техника",
      count: 100,
      measure: "шт",
      img: "",
    },
    {
      name: "Альбом",
      description: "Альбом 24 листа",
      category: "Канцелярия",
      count: 50,
      measure: "шт",
      img: "",
    },
    {
      name: "Стул",
      description: "Деревянный стул",
      category: "Мебель",
      count: 10,
      measure: "шт",
      img: "",
    },
  ];
  await productRepository.save(products);

  const categoryRepository = dataSource.getRepository(Category);
  await categoryRepository.clear();
  const categories: Omit<Category, "id">[] = [
    { name: "Еда" },
    { name: "Канцелярия" },
    { name: "Мебель" },
    { name: "Техника" },
  ];
  await categoryRepository.save(categories);

  console.log("Начальные данные успешно добавлены в БД");
};
