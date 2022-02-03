import React from "react";
import Navbar from "./component/Navbar/Navbar";
import Wishlist from "./pages/Wishlist/Wishlist";

import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import TopMovies from "./pages/TopMovies/TopMovies";
import SearchMovies from "./pages/Search/Search";
import Register from "./pages/Register/Register";

const ProtectedRoute = (props: any, { ...options }) => {
  const authToken: string | null = window.sessionStorage.getItem("auth-token");
  if (props.condition === "active") {
    if (authToken) {
      return <div {...options}>{props.children}</div>;
    } else {
      return <Navigate to="/login" />;
    }
  } else {
    if (!authToken) {
      return <div {...options}>{props.children}</div>;
    } else {
      return <Navigate to="/top" />;
    }
  }
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute condition="inactive">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute condition="inactive">
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="/top" element={<TopMovies />} />
          <Route path="/search" element={<SearchMovies />} />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute condition="active">
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/top" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
