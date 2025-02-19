import { NextFunction, Request, Response } from "express";
import { RequestError } from "./RequestError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  if (err instanceof RequestError) {
    res
      .status(err.statusCode)
      .json({
        status: "error",
        message: err.message,
      })
      .end();

    return;
  }

  res
    .status(500)
    .json({
      status: "error",
      message: "Internal Server Error",
    })
    .end();
};
