import type { RouteObject } from "react-router-dom";
import { Home } from "../pages/Home";

export const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  // { path: "/register", element: <RegisterPage /> },
  // { path: "/login", element: <LoginPage /> },
  // { path: "/workspace-main", element: <MainWorkspace /> },
];
