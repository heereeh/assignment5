import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
  return (
    <>
      <div className="bg-slate-900 min-h-lvh">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
