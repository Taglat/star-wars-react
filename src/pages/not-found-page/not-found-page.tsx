import css from "./not-found-page.module.css";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/shared";

export default function NotFoundPage({ isLogined }: { isLogined: boolean }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    if (isLogined) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={css.root}>
      <div className={css.text}>
        <h2 className={css.code}>404</h2>
        <h2 className={css.text}>Page Not Found</h2>
      </div>
      <Button onClick={handleRedirect}>
        {isLogined ? "=> Main Page" : "=> Login Page"}
      </Button>
    </div>
  );
}
