import { AppError } from "../lib/app-error.class";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const errorHadler = (
  err: Error | ZodError | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Type", "application/json");

  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.format(),
    });
    return next(err);
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message || "Something went wrong",
    });
    return next(err);
  }

  res.status(500).json({
    status: "error",
    message: `Internal server error, ${err}`,
  });

  return next(err);
};
