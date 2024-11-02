import css from "./login-form.module.css";
import { useForm } from "react-hook-form";
import { Button } from "../shared";
import { useDispatch } from "react-redux";
import { Input } from "../shared/input/input";
import { login } from "@/redux/reducers/login-slice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    const {email, password} = data;
    if (email === import.meta.env.VITE_EMAIL && password === import.meta.env.VITE_PASSWORD) {
      dispatch(login({email}));
      // reset();
      navigate('/');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setValue("email", (document.getElementById("email") as HTMLInputElement)?.value || "");
      setValue("password", (document.getElementById("password") as HTMLInputElement)?.value || "");
    }, 500);

    return () => clearInterval(interval);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
      <div className={css.formField}>
        <label htmlFor="email" className={css.label}>
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email обязателен",
            },
            pattern: {
              message: "Неверный формат email",
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            },
          })}
        />
        {errors.email && (
          <p className={css.errorText}>{errors.email.message}</p>
        )}
      </div>

      <div className={css.formField}>
        <label htmlFor="password" className={css.label}>
          Пароль
        </label>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Пароль обязателен",
            },
            validate: {
              tooShort: (passwordValue) =>
                passwordValue.length >= 6 ||
                "Пароль должен быть длинее 5 знаков",
            },
          })}
        />
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
      </div>

      <Button type="submit">Войти</Button>
    </form>
  );
}
