import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import HomePage from "./pages/Homepage";
import Addhome from "./pages/Addhome";
import AirbnbNavbar from "./components/AirbnbNavbar";
import Favourite from "./pages/favoroute";
import ProtectHome from "./pages/protecthome";
import Homepage from "./pages/Homepage";



function App() {
  return (
    <>
      <AirbnbNavbar />

      <Routes>
        {/* 🔐 Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectHome>
              <HomePage />
            </ProtectHome>
          }
        />

        <Route
          path="/addhome"
          element={
            <ProtectHome>
              <Addhome />
            </ProtectHome>
          }
        />

        <Route
          path="/favourite"
          element={
            <ProtectHome>
              <Favourite />
            </ProtectHome>
          }
        />

        {/* 🔓 Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
