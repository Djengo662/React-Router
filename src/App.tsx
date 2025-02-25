import { Route, Routes } from "react-router";
import "./App.css";
import Dashboard from "./components/dashboard";
import { AllRoutes } from "./utils/all-routes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {AllRoutes.filter((x) => x.id !== "dashboard").map((x) => {
            return <Route key={x.id} path={x.path} element={x.element} />;
          })}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
