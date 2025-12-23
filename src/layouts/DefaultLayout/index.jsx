import { Outlet } from "react-router";

function DefaultLayout() {
  return (
    <div className="h-full w-full relative" id="">
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
