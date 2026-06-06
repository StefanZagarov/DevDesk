import type { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";
import { MainWorkspace } from "@/pages/MainWorkspace";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/workspace-main", element: <MainWorkspace /> },
  // { path: "/register", element: <RegisterPage /> },
  // { path: "/login", element: <LoginPage /> },
];
