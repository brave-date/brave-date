import React, { lazy, Suspense, useState, useEffect } from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import PageLoader from "./components/PageLoader";
import { authUser } from "./redux/authReducer/selectors";
import { setCurrentUser, setAuthUser } from "./redux/authReducer/actions";
import { useSelector, useDispatch } from "react-redux";

import { setInitialUsers, getUserMatches } from "./api/MatchAPI";
import { getMessagesList } from "./api/ChatAPI";

const App = () => {
  const [currentAuthUser, setCurrentAuthUser] = useState(useSelector(authUser));
  const Landing = lazy(() => import("./pages/Landing"));
  const OnBoarding = lazy(() => import("./pages/OnBoarding"));
  const Recognition = lazy(() => import("./pages/Recognition"));
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentAuthUser(user);
      dispatch(setCurrentUser(user));
      dispatch(getUserMatches());
      dispatch(setAuthUser(user));
      dispatch(setInitialUsers());
      dispatch(getMessagesList());
    }
    // eslint-disable-next-line
  }, [dispatch, localStorage.getItem("user")]);

  if (currentAuthUser && location.pathname === "/") {
    dispatch(setCurrentUser(currentAuthUser));
    dispatch(getUserMatches());
    dispatch(setInitialUsers());
    dispatch(getMessagesList());
    return <Navigate to={"/app/recs"} replace />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            currentAuthUser ? (
              <Navigate to={"/app/recs"} replace />
            ) : (
              <Landing />
            )
          }
        />
        <Route
          exact
          path="/app/onboarding"
          element={
            currentAuthUser ? (
              <Navigate to={"/app/recs"} replace />
            ) : (
              <OnBoarding />
            )
          }
        />
        <Route
          exact
          path="/app/recs"
          element={
            currentAuthUser ? <Recognition /> : <Navigate to={"/"} replace />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
