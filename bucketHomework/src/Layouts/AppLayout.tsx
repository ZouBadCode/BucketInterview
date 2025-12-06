import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

//AppLayout is a basic layout prepare for future modification