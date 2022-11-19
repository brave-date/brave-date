import Landing from "./pages/Landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
