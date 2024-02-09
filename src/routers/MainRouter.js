import { Route, Routes } from "react-router-dom";
import Layout from "../components/ui/Layout";
import Welcome from "../pages/www/Welcome/Welcome";
import Products from "../pages/www/Products/Products";
import Pricing from "../pages/www/Pricing/Pricing";
import AboutUs from "../pages/www/AboutUs/AboutUs";
import LogIn from "../pages/www/LogIn/LogIn";
import GetStarted from "../pages/www/GetStarted/GetStarted";
import NotFound from "../pages/shared/NotFound";
import { useSelector } from "react-redux";

export default function MainRouter() {
  const authenticated = useSelector((state) => state.user.authenticated);

  return (
    <Routes>
      <Route path="/" element={<Layout authenticated={authenticated} />}>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="products" element={<Products />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="login" element={<LogIn />} />
        <Route path="getting-started" element={<GetStarted />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
