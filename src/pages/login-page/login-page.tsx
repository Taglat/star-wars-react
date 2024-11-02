import css from "./login-page.module.css";
import LoginForm from "@/components/login-form/login-form";

export default function LoginPage() {
  return (<div className={css.root}>
    <div className={css.text}>
      <p>email: <b>{import.meta.env.VITE_EMAIL}</b></p>
      <p>password: <b>{import.meta.env.VITE_PASSWORD}</b></p>
    </div>
    <LoginForm />
  </div>)
  
}
