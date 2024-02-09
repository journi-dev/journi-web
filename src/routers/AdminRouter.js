import { Route, Routes } from "react-router-dom";
// import Layout from "../components/ui/Layout";
// import { useSelector } from "react-redux";
// import RequireAuth from "../components/ui/RequireAuth";
import Leads from "../pages/admin/Leads/Leads";
// import NotFound from "../pages/Error/NotFound";

export default function AdminRouter() {
  // const authenticated = useSelector((state) => state.user.authenticated);

  return (
    <Routes>
      <Route path="/" element={<Leads />} />
    </Routes>
  );
}

// <Routes>
//   {/* Home Route */}
//   <Route path="/" element={<Layout authenticated={authenticated} />}>
//     {/* Protected Routes */}
//     <Route element={<RequireAuth />}>
//       <Route path="leads" element={<Leads />} />
//     </Route>

//     {/* 404 Route */}
//     <Route path="*" element={<NotFound />} />
//   </Route>
// </Routes>;
