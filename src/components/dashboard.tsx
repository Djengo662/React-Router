import { NavLink, Outlet, useLocation } from "react-router";

export default function Dashboard() {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <div>
      {isRoot && (
        <>
          <h1>Dashboard</h1>
          <nav>
            <NavLink to="components/weather" end>
              <h1 >Weather</h1>
            </NavLink>
            <NavLink to="components/pokedex" end>
              <h1>Pokedex</h1>
            </NavLink>
          </nav>
        </>
      )}
      <Outlet />
    </div>
  );
}
