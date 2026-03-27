import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";
import ProtectedRoute from "./component/ProtectedRoute";
import PublicRoute from "./component/PublicRoute";
import Collection from "./pages/Collection";
import Body from "./pages/Body";
import Seller_Product from "./pages/Seller_Product";
import Category from "./pages/Category";
import Concern from "./pages/Concern";
import PageLayout from "./component/PageLayout";
import SkinProduct from "./pages/Skin";
import HairProduct from "./pages/Hair";
import LipProduct from "./pages/Lip";
import Best_seller from "./pages/best_seller";  

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
        path="/skin"
        element={
          <ProtectedRoute>
            <PageLayout>
              <SkinProduct />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hair-product"
        element={
          <ProtectedRoute>
            <PageLayout>
              <HairProduct />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lip"
        element={
          <ProtectedRoute>
            <PageLayout>
              <LipProduct />
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
        path="/best_seller"
        element={
          <ProtectedRoute>
            <PageLayout>
          <Best_seller />
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
