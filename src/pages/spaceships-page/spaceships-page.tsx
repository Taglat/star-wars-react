import css from "./spaceships-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchSpaceships, setPage } from "@/redux/reducers/spaceships-slice";
import EntityTable from "@/components/entity-table/entity-table";
import Pagination from "@/components/shared/pagination/pagination";
import { IStarship } from "@/types/types";

export default function SpaceshipsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, page, totalPages } = useSelector(
    (state: RootState) => state.spaceships
  );

  useEffect(() => {
    dispatch(fetchSpaceships(page));
  }, [dispatch, page]);

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (loading) {
    return;
    <div className={css.container}>
      <h1 className={css.title}>Корабли</h1>
      <div className={css.loading}>Загрузка...</div>
    </div>;
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Корабли</h1>
      <EntityTable<IStarship>
        data={currentPageData}
        columns={["name", "model", "starship_class"]}
        entityType="spaceships"
      />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
