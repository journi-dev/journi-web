import { Route, Routes } from "react-router-dom";
import Layout from "../components/ui/Layout";
import RequireAuth from "../components/ui/RequireAuth";
import { useSelector } from "react-redux";
import Analytics from "../pages/app/Analytics/Analytics";
import Social from "../pages/app/Social/Social";
import Support from "../pages/app/Support/Support";
import Home from "../pages/app/Home/Home";
import Updates from "../pages/app/Updates/Updates";
import AllSettings from "../pages/app/Settings/AllSettings";
import BusinessInfo from "../pages/app/Settings/BusinessInfo/BusinessInfo";
import MenuAndRetail from "../pages/app/Settings/MenuAndRetail/MenuAndRetail";
import UsersAndPatrons from "../pages/app/Settings/UsersAndPatrons/UsersAndPatrons";
import AppAndWebsite from "../pages/app/Settings/AppAndWebsite";
import Integrations from "../pages/app/Settings/Integrations";
import GiftCards from "../pages/app/Settings/GiftCards";
import Billing from "../pages/app/Settings/Billing";
import Developers from "../pages/app/Settings/Developers";
import MyAccount from "../pages/app/Settings/MyAccount";
import WATSONSettings from "../pages/app/Settings/WATSONSettings";
import ComingSoon from "../pages/shared/ComingSoon";
import NotFound from "../pages/shared/NotFound";

export default function AppRouter() {
  const authenticated = useSelector((state) => state.user.authenticated);

  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<Layout authenticated={authenticated} />}>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />
          <Route path="updates" element={<Updates />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="social" element={<Social />} />
          <Route path="support" element={<Support />} />

          {/* Settings Route and Subroutes */}
          <Route path="settings" element={<AllSettings />}>
            <Route path="business-info" element={<BusinessInfo />} />
            <Route path="menu" element={<MenuAndRetail />} />
            <Route path="users" element={<UsersAndPatrons />} />
            <Route path="my-app" element={<AppAndWebsite />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="gift-cards" element={<GiftCards />} />
            <Route path="billing" element={<Billing />} />
            <Route path="develop" element={<Developers />} />
            <Route path="my-account" element={<MyAccount />} />
            <Route path="platform" element={<WATSONSettings />} />
            <Route path="help" element={<ComingSoon />} />
            <Route path="tasks" element={<ComingSoon />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
