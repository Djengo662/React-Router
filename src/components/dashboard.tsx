import { useState } from "react";
import { CiSun } from "react-icons/ci";
import { NavLink, Outlet, useLocation } from "react-router";
import { AllRoutes } from "../utils/all-routes";
import { FiMoon } from "react-icons/fi";

export default function Dashboard() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const turnModus = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  const currentRoute = AllRoutes.find((y) => y.path === location.pathname);

  return (
    <div className="dashboard">
      <>
        <h1>{currentRoute != null ? currentRoute.name : "Unbekannt"}</h1>
        <nav className="dashboard__nav">
          {AllRoutes.map((x) => (
            <NavLink key={x.id} to={x.path}>
              <div>{x.name}</div>
            </NavLink>
          ))}
        </nav>
      </>
      <div className="dashboard__content">
        <Outlet />
      </div>

      <footer className="dashboard__footer">
        <div>Impressum</div>
        <div>Kontakt</div>
        <div style={{ cursor: "pointer" }} onClick={turnModus}>
          {isDarkMode ? <CiSun size={"2rem"} /> : <FiMoon size={"2rem"} />}
        </div>
      </footer>
    </div>
  );
}
