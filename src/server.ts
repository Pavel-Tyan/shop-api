import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./utils/errorHandler";
import { categoryRouter } from "./routes/category.route";
import { dataSource } from "./data-source";
import { productRouter } from "./routes/product.route";

dataSource
  .initialize()
  .then(() => {
    console.log("Инициализация для БД прошла успешно");
  })
  .catch((err) => {
    console.error("Ошибка во время инициализации для БД", err);
  });

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
