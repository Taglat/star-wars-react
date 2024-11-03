import css from "./characters-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchCharacters, setPage } from "@/redux/reducers/characters-slice";
import EntityTable from "@/components/entity-table/entity-table";
import Pagination from "@/components/shared/pagination/pagination";
import { IPeople } from "@/types/types";

export default function CharactersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, page, totalPages } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (loading) return;
  <div className={css.container}>
    <h1 className={css.title}>Персонажи</h1>
    <div className={css.loading}>Загрузка...</div>
  </div>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Персонажи</h1>
      <EntityTable<IPeople>
        data={currentPageData}
        columns={["name", "height", "mass", "gender"]}
        entityType="characters"
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
