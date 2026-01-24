import { Router } from "express";
import { register, login } from "src/controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
// TODO:
// Logout doesnt mean anything here yet, we will implemet a server side logout when we want to force a logout (for a stolen account). But for that we need to implement "Refresh Token Whitelist" or a "Blocklist" in Redis. Decide if we will do this later
// authRouter.post("/logout", logout)

export default authRouter;
