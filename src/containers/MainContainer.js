import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProgressBar } from "../layout/utils/AppLoading";
import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import { getCurrentUserRole, getUserProfile } from "../store/selectors";
import Sockets from "../components/Sockets";
import { routes } from "../constants/routes";
import { ROLES_RAW } from "../constants/permissions";
import AccessDenied from "../layout/utils/AccessDenied";

const Home = lazy(() => import("../pages/Home"));
const Profile = lazy(() => import("../pages/Profile"));
const Users = lazy(() => import("../pages/Users"));
const Logout = lazy(() => import("../pages/Logout"));
const AccessDeniedPage = lazy(() => import("../layout/utils/AccessDenied"));

const MainContainer = () => {
  const history = useNavigate();

  const location = useLocation();
  const profile = useSelector(getUserProfile);
  const userRole = useSelector(getCurrentUserRole);

  console.log(userRole)


  if (!userRole) {
    return (
      <MainLayout>
        <Suspense fallback={<ProgressBar />} />
      </MainLayout>
    )
  }

  if (!userRole || !(ROLES_RAW.find(x => x === userRole))) {
    return <AccessDenied />;
  }

  if (location.pathname && profile && profile.role && location.pathname !== "/unauthorized") {
    const path = location.pathname.replace("/", "");
    const navigation = routes[path !== '' ? path : "home"];


    if (navigation && !navigation.role.find(x => x === userRole)) {
      history("/unauthorized");
    }
  }

  return (
    <MainLayout>
      <Suspense fallback={<ProgressBar />}>
        <Sockets></Sockets>
        <Routes>
          <Route path="/unauthorized" element={<AccessDeniedPage />}></Route>
          <Route path="/home" element={<Home />} />
          {/* Crear ruta para id que lleve a Home */}
          <Route path="/:id" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/users" element={<Users />} />
          <Route path='*' element={<Navigate to="/home" />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};

export default MainContainer;
