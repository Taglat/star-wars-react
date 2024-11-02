import css from "./login-form.module.css";
import { useForm } from "react-hook-form";
import { Button } from "../shared";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
      <div className={css.formField}>
        <label htmlFor="email" className={css.label}>
          Email
        </label>
        <input id="email" type="email" className={css.input} {...register("email", {
          pattern: {
            message: "Неверный формат email",
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          },
          required: {
            value: true,
            message: "Email обязателен"
          }
        })} />
        {errors.email && (
          <p className={css.errorText}>{errors.email.message}</p>
        )}
      </div>

      <div className={css.formField}>
        <label htmlFor="password" className={css.label}>
          Пароль
        </label>
        <input id="password" type="password" className={css.input} {...register("password", {
          validate: {
            tooShort: (passwordValue) => {
              return passwordValue.length < 6 && "Пароль должен быть длинее 5 знаков"
            }
          },
          required: {
            value: true,
            message: "Пароль обязателен"
          }
        })} />
        {errors.password && (
          <p className={css.errorText}>{errors.password.message}</p>
        )}
      </div>

      <Button type="submit">Войти</Button>
    </form>
  );
}
