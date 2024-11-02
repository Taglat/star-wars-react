import css from "./navbar.module.css";
import { NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav className={css.root}>
      <ul>
        <li>
          <NavLink
            to="/characters"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/planets"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Planets
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/spaceships"
            className={({ isActive }) => (isActive ? css.active : "")}
          >
            Spaceships
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
