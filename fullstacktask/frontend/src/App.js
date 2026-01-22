import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/AuthContext";
import MainLayout from "./layouts/MainLayout";
import HomeBody from "./pages/HomeBody";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* MAIN LAYOUT */}
          <Route element={<MainLayout />}>

            {/* HOME BODY ( / ) */}
            <Route index element={<HomeBody />} />

            {/* DASHBOARD */}
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

          </Route>

          {/* AUTH PAGES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
