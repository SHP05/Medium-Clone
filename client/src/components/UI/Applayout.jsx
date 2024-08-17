import { Outlet } from "react-router-dom";
import Sidebar from "../Home/SideBar";
import Navbar from "../Navbar/NavbarResp";

function Applayout() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="absolute">
        <Sidebar />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Applayout;
