import { Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes";

function populateRoutes() {
  return (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
}

function App() {
  return populateRoutes();
}

export default App;
