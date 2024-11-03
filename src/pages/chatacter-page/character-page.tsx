import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { RootState } from "@/redux/store";
import { IPeople } from "@/types/types";
import { useEffect } from "react";
import { updateCharacter } from "@/redux/reducers/characters-slice";
import css from "./character-page.module.css";
import { Button } from "@/components/shared";

type FormValues = {
  name: string;
  height: string;
  mass: string;
  gender: string;
};

export default function CharacterPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const character = useSelector((state: RootState) => {
    const allCharacters = Object.values(state.characters.data).flat();
    return allCharacters.find((char) => char.url.endsWith(`/${id}/`));
  });

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: character?.name || "",
      height: character?.height || "",
      mass: character?.mass || "",
      gender: character?.gender || "",
    },
  });

  useEffect(() => {
    if (character) {
      reset({
        name: character.name,
        height: character.height,
        mass: character.mass,
        gender: character.gender
      });
    }
  }, [character, reset]);

  const onSubmit = (data: FormValues) => {
    if (character) {
      const updatedCharacter: IPeople = { ...character, ...data };
      dispatch(updateCharacter(updatedCharacter));
    }
  };

  if (!character) {
    return <div>Загрузка данных о персонаже...</div>;
  }

  return (
    <div className={css.container}>
      <h2 className={css.title}>Редактировать персонажа: {character.name}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.formGroup}>
          <label className={css.label}>Имя:</label>
          <input className={css.input} {...register("name")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Рост:</label>
          <input className={css.input} {...register("height")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Масса:</label>
          <input className={css.input} {...register("mass")} />
        </div>
        <div className={css.formGroup}>
          <label className={css.label}>Гендер:</label>
          <input className={css.input} {...register("gender")} />
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
