import css from "./login-page.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "@/components/shared";

import { login } from "@/redux/reducers/login-slice";
import LoginForm from "@/components/login-form/login-form";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    const email = "admin@example.com";
    dispatch(login({ email }));    
    navigate("/")
  };

  return (<div className={css.root}>
    <div className={css.text}>TEXT</div>
    <LoginForm />
  </div>)
  
}
