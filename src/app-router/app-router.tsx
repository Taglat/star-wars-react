import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/login-page/login-page";
import CharactersPage from "../pages/characters-page/characters-page";
import PlanetsPage from "../pages/planets-page/planets-page";
import SpaceshipsPage from "../pages/spaceships-page/spaceships-page";
import NotFoundPage from "../pages/not-found-page/not-found-page";

type AppRoute = {
  path: string;
  element: JSX.Element;
};

const publicRouter: AppRoute[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const privateRoutes: AppRoute[] = [
  {
    path: "/",
    element: <CharactersPage />,
  },
  {
    path: "/planets",
    element: <PlanetsPage />,
  },
  {
    path: "/spaceships",
    element: <SpaceshipsPage />,
  },
];

export default function AppRouter() {
  const isLogined = true;

  return (
    <BrowserRouter>
      <Routes>
        {isLogined
          ? privateRoutes.map((route) => (
              <Route path={route.path} element={route.element} />
            ))
          : publicRouter.map((route) => (
              <Route path={route.path} element={route.element} />
            ))}
        <Route path="*" element={<NotFoundPage isLogined={isLogined} />} />
      </Routes>
    </BrowserRouter>
  );
}
