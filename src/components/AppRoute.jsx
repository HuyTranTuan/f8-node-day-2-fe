import { BrowserRouter, Route, Routes } from "react-router";
import Home from "../pages/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import PostDetail from "../pages/PostDetail";

function AppRoute() {
  return (
    <BrowserRouter basename="/f8-node-day-2-fe/">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="post-detail/:id" element={<PostDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
