import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";

import LoginPage from "@/pages/login-page/login-page";
import CharactersPage from "@/pages/characters-page/characters-page";
import PlanetsPage from "@/pages/planets-page/planets-page";
import SpaceshipsPage from "@/pages/spaceships-page/spaceships-page";
import NotFoundPage from "@/pages/not-found-page/not-found-page";

import { PrivateLayout, PublicLayout } from "./app-layouts";

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
