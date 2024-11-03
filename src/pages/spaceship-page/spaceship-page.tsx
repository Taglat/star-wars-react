import css from "./spaceship-page.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "@/redux/store";
import { IStarship } from "@/types/types";
import { useEffect } from "react";
import { updateSpaceship } from "@/redux/reducers/spaceships-slice";
import { Button } from "@/components/shared";

type FormValues = {
  name: string;
  model: string;
  starship_class: string; 
};

export default function SpaceshipPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const spaceship = useSelector((state: RootState) => {
    const allSpaceships = Object.values(state.spaceships.data).flat();
    return allSpaceships.find((char) => char.url.endsWith(`/${id}/`));
  });

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: spaceship?.name || "",
      model: spaceship?.model || "",
      starship_class: spaceship?.starship_class || "",
    },
  });

  useEffect(() => {
    if (spaceship) {
      reset({
        name: spaceship.name,
        model: spaceship.model,
        starship_class: spaceship.starship_class,
      });
    }
  }, [spaceship, reset]);

  const onSubmit = (data: FormValues) => {
    if (spaceship) {
      const updatedSpaceship: IStarship = { ...spaceship, ...data };
      dispatch(updateSpaceship(updatedSpaceship));
    }
  };

  if (!spaceship) {
    return (
      <div className={css.container}>
        <h2 className={css.title}>Редактировать корабль: ...</h2>
        <div>Загрузка данных о корабле...</div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Редактировать корабль: {spaceship.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formGroup}>
          <label className={css.label}>Имя:</label>
          <input className={css.input} {...register("name")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Модель:</label>
          <input className={css.input} {...register("model")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Класс:</label>
          <input className={css.input} {...register("starship_class")} />
        </div>
        <div className={css.buttons}>
          <Button type="submit" theme="secondary">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
