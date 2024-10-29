import { Outlet } from "react-router-dom";
import SidePanel from "../components/SidePanel";
const Layout = () => {
  return (
    <>
      <div className="dashboard">
        <SidePanel />
      </div>
      <Outlet />
    </>
  );
};
export default Layout;
