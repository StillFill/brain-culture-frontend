import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import HeaderToggle from "./Components/HeaderToggle/HeaderToggle";
import Management from "./Pages/Management";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <HeaderToggle></HeaderToggle>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="management" element={<Management />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
