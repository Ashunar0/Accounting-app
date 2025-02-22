import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div>AppLayout</div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
