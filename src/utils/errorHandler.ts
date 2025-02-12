import { Request, Response, NextFunction } from "express";
import { RequestError } from "./RequestError";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err);

  if (err instanceof RequestError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};
