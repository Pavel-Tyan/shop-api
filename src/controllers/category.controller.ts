import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { RequestError } from "../utils/RequestError";
import { CATEGORY_NOT_FOUND_MESSAGE } from "../constants";

const categoryService = new CategoryService();

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 400));
    }
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.getCategoryById(
      parseInt(req.params.id)
    );
    if (category) {
      res.json(category);
    } else {
      next(new RequestError(CATEGORY_NOT_FOUND_MESSAGE, 404));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await categoryService.updateCategory(
      parseInt(req.params.id),
      req.body
    );
    if (category) {
      res.json(category);
    } else {
      next(new RequestError(CATEGORY_NOT_FOUND_MESSAGE, 404));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 400));
    }
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const success = await categoryService.deleteCategory(
      parseInt(req.params.id)
    );
    if (success) {
      res.status(204).send();
    } else {
      next(new RequestError(CATEGORY_NOT_FOUND_MESSAGE, 404));
    }
  } catch (error) {
    if (error instanceof Error) {
      next(new RequestError(error.message, 500));
    }
  }
};
