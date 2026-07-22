import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Tracker from "./pages/Tracker";
import Driver from "./pages/Driver";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/tracker" element={<Tracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
