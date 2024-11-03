import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import LoginPage from "@/pages/login-page/login-page";
import CharactersPage from "@/pages/characters-page/characters-page";
import PlanetsPage from "@/pages/planets-page/planets-page";
import SpaceshipsPage from "@/pages/spaceships-page/spaceships-page";
import NotFoundPage from "@/pages/not-found-page/not-found-page";

import { PrivateLayout, PublicLayout } from "./app-layouts";
import CharacterPage from "@/pages/chatacter-page/character-page";
import SpaceshipPage from "@/pages/spaceship-page/spaceship-page";
import PlanetPage from "@/pages/planet-page/planet-page";

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
    element: <Navigate to={"/characters"} />,
  },
  {
    path: "/characters",
    element: <CharactersPage />,
  },
  {
    path: "/characters/:id",
    element: <CharacterPage />,
  },
  {
    path: "/planets",
    element: <PlanetsPage />,
  },
  {
    path: "/planets/:id",
    element: <PlanetPage />,
  },
  {
    path: "/spaceships",
    element: <SpaceshipsPage />,
  },
  {
    path: "/spaceships/:id",
    element: <SpaceshipPage />,
  },
];

export default function AppRouter() {
  const email = useSelector((state: RootState) => state.login.email);
  const isLogined = email !== "";

  return (
    <BrowserRouter>
      <Routes>
        {isLogined ? (
          <Route element={<PrivateLayout />}>
            {privateRoutes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        ) : (
          <Route element={<PublicLayout />}>
            {publicRouter.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        )}
        <Route element={<PublicLayout />}>
          <Route path="*" element={<NotFoundPage isLogined={isLogined} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
