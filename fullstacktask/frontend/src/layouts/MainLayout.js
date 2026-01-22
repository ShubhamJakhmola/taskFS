import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">

      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold text-slate-800">
            Task Management
          </h1>

          {/* NAV RIGHT */}
          <nav className="flex items-center gap-4 text-slate-700">
            🙍🏻‍♂️{user ? (
              <>
                <span className="text-sm text-slate-600">
                 {user}
                </span>
                
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-3 py-1 rounded-md border border-slate-300 hover:bg-slate-100 transition"
                >
                  Register
                </Link>
              </>
            )}

          </nav>
        </div>
      </header>

      {/* BODY */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t text-center text-sm text-slate-500 py-4">
        © {new Date().getFullYear()} Task Management System
      </footer>
    </div>
  );
};

export default MainLayout;
