// Express 4 doesn't automatically catch errors thrown in async functions, so we create this wrapper for the controllers' try/catch blocks

import { Request, Response, NextFunction } from "express";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // If fn throws or rejects, .catch will pass the error to the Express' error handler middleware
  };
};
