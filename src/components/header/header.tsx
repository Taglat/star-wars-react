import { useDispatch, useSelector } from "react-redux";
import { Button } from "../shared";
import css from "./header.module.css";
import { logout } from "../../redux/reducers/login-slice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import useTypedLocalStorage from "../../hooks/useTypedLocalStorage";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, setEmailLocStorage] = useTypedLocalStorage("email", "");

  const email = useSelector((state: RootState) => state.login.email);


  const handleLogout = () => {
    dispatch(logout());
    setEmailLocStorage("");
    navigate("/login");
  };

  return (
    <header className={css.root}>
      <div className={css.container}>
        <h2 className={css.logo}>
          <span>StarWars</span> Data
        </h2>
        <div className={css.rightSide}>
          <h2 className={css.email}>{email}</h2>
          {email !== "" && <Button onClick={handleLogout}>Logout</Button>}
        </div>
      </div>
    </header>
  );
}
