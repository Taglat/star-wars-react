import css from './entity-table.module.css';
import { useNavigate } from "react-router-dom";

interface EntityTableProps<T> {
  data: T[];
  columns: (keyof T)[];
  entityType: string;
}

const EntityTable = <T extends { url: string }>({ data, columns, entityType }: EntityTableProps<T>) => {
  const navigate = useNavigate();

  const handleRowClick = (url: string) => {
    const id = url.split("/").slice(-2, -1)[0];
    navigate(`/${entityType}/${id}`);
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column)}>{String(column)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.url} onClick={() => handleRowClick(item.url)} className={css.row}>
            {columns.map((column) => (
              <td key={String(column)}>{String(item[column])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EntityTable;
