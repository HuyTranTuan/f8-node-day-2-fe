import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";

// Pages
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const PostDetail = lazy(() => import("@/pages/PostDetail"));

// Layouts
import DefaultLayout from "@/layouts/DefaultLayout";

function AppRoutes() {
  return (
    <BrowserRouter basename="/f8-node-day-2-fe/">
      <Toaster />
      <Routes>
        {/* Default Layout */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<PostDetail />} />
        </Route>

        {/*NotFound*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
