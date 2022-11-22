import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";

const App = () => {
  const Landing = lazy(() => import("./pages/Landing"));
  const OnBoarding = lazy(() => import("./pages/OnBoarding"));
  const Recognition = lazy(() => import("./pages/Recognition"));

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/app/onboarding" element={<OnBoarding />} />
          <Route exact path="/app/recs" element={<Recognition />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
