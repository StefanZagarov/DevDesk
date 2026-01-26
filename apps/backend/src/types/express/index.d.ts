// TypeScript will complain if we try to write req.user = ... because the standard Express Request object doesn't have a user property. We need to extend it
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
