import css from "./planet-page.module.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "@/redux/store";
import { IPlanet } from "@/types/types";
import { useEffect } from "react";
import { updatePlanet } from "@/redux/reducers/planets-slice";
import { Button } from "@/components/shared";

type FormValues = {
  name: string;
  diameter: string;
  population: string; 
};

export default function PlanetPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const planet = useSelector((state: RootState) =>
    state.planets.data.find((planet) => planet.url.endsWith(`/${id}/`))
  );

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: planet?.name || "",
      diameter: planet?.diameter || "",
      population: planet?.population || "",
    },
  });

  useEffect(() => {
    if (planet) {
      reset({
        name: planet.name,
        diameter: planet.diameter,
        population: planet.population,
      });
    }
  }, [planet, reset]);

  const onSubmit = (data: FormValues) => {
    if (planet) {
      const updatedPlanet: IPlanet = { ...planet, ...data };
      dispatch(updatePlanet(updatedPlanet));
    }
  };

  if (!planet) {
    return (
      <div className={css.container}>
        <h2 className={css.title}>Редактировать планету: ...</h2>
        <div>Загрузка данных о планете...</div>
      </div>
    );
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Редактировать планету: {planet.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formGroup}>
          <label className={css.label}>Имя:</label>
          <input className={css.input} {...register("name")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Популяция:</label>
          <input className={css.input} {...register("population")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Диаметр:</label>
          <input className={css.input} {...register("diameter")} />
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
