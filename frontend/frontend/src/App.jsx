import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import Collection from "./pages/Collection";
import Body from "./pages/Body";
import New_Launch from "./pages/New_Launch";
import Seller_Product from "./pages/Seller_Product";
import Category from "./pages/Category";
import Concern from "./pages/Concern";
import PageLayout from "./component/PageLayout";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collection"
        element={
          <ProtectedRoute>
            <Collection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/body"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Body />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-launch"
        element={
          <ProtectedRoute>
            <PageLayout>
              <New_Launch />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/best-seller"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Seller_Product />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/category"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Category />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/concern"
        element={
          <ProtectedRoute>
            <PageLayout>
              <Concern />
            </PageLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
