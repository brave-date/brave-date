import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader";

const App = () => {
  const Landing = lazy(() => import("./pages/Landing"));
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route exact path="/" element={<Landing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
