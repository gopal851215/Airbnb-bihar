import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import Homepage from "./pages/Homepage";
import Addhome from "./pages/Addhome";
import Favourite from "./pages/favoroute";
import AirbnbNavbar from "./components/AirbnbNavbar";

// 🔐 Role-based Protected Route
function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />; // not logged in
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />; // role not allowed

  return children;
}

function App() {
  return (
    <>
      <AirbnbNavbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Guest + Host accessible */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["host", "guest"]}>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourite"
          element={
            <ProtectedRoute allowedRoles={["host", "guest"]}>
              <Favourite />
            </ProtectedRoute>
          }
        />

        {/* Host only */}
        <Route
          path="/addhome"
          element={
            <ProtectedRoute allowedRoles={["host"]}>
              <Addhome />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
