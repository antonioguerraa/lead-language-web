import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { lazy, Suspense } from "react";

const FunnelPage = lazy(() => import("./pages/FunnelPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-navy flex items-center justify-center">
          <div className="text-text-secondary text-lg">Cargando...</div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/simulador" element={<FunnelPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}
