import { FC } from "react";
import {Navigate, Outlet, useParams} from "react-router-dom";

const VALID_LANGUAGES = ["ko", "en","zh","ja"];
const GlobalLayout: FC = () => {
  const { lang } = useParams();
  if (!lang || !VALID_LANGUAGES.includes(lang)) {
    return <Navigate to="/ko" replace />;
  }
  return (
    <div className="relative flex-col items-center transition-bg min-h-screen">
        <Outlet />
    </div>
  );
};

export default GlobalLayout;
