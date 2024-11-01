import css from "./login-page.module.css";
import { Button } from "../../components/shared";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducers/login-slice";
import { useNavigate } from "react-router-dom";
import useTypedLocalStorage from "../../hooks/useTypedLocalStorage";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, setEmailLocStorage] = useTypedLocalStorage("email", "");
  
  const handleLogin = () => {
    const email = "admin@example.com";
    dispatch(login({ email }));    
    setEmailLocStorage(email);
    navigate("/")
  };

  return <Button onClick={handleLogin}>Login</Button>;
}
