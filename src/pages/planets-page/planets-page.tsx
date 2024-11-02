import css from "./Planets-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { fetchPlanets, setPage } from "@/redux/reducers/planets-slice";
import EntityTable from "@/components/entity-table/entity-table";
import Pagination from "@/components/shared/pagination/pagination";
import { IPlanet } from "@/types/types";

export default function PlanetsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, page, totalPages } = useSelector((state: RootState) => state.planets);

  useEffect(() => {
    dispatch(fetchPlanets(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  if (loading) return <div className={css.loading}>Loading...</div>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Planets</h1>
      <EntityTable<IPlanet> data={data} columns={["name", "diameter", "population"]} entityType="planets" />
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
