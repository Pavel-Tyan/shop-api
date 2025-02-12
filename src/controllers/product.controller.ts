import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.service";
import { RequestError } from "../utils/RequestError";
import { PRODUCT_NOT_FOUND_MESSAGE } from "../constants";

const productService = new ProductService();

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 400));
    }
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const products = await productService.getAllProducts(limit, offset);
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.getProductById(
      parseInt(req.params.id)
    );
    if (product) {
      res.json(product);
    } else {
      next(new RequestError(PRODUCT_NOT_FOUND_MESSAGE, 404));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.updateProduct(
      parseInt(req.params.id),
      req.body
    );
    if (product) {
      res.json(product);
    } else {
      next(new RequestError(PRODUCT_NOT_FOUND_MESSAGE, 404));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const success = await productService.deleteProduct(parseInt(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      next(new RequestError(PRODUCT_NOT_FOUND_MESSAGE, 404));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};
