import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Driver from "./pages/Driver";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;