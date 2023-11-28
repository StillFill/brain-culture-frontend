import "./HeaderToggle.scss";
import { useNavigate, useLocation } from "react-router-dom";

const HeaderToggle = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="header-toggle">
      <button
        onClick={() => navigate("")}
        className={`${location.pathname === "/" ? "active" : ""}`}
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate("management")}
        className={`${location.pathname === "/management" ? "active" : ""}`}
      >
        Gerenciar
      </button>
    </div>
  );
};

export default HeaderToggle;
