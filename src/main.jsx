import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Champions from "./pages/Champions";
import ChampionDetail from "./pages/ChampionDetail";
import Regions from "./pages/Regions";
import Quiz from "./pages/Quiz";
import RegionDetail from "./pages/RegionDetail";
import "./index.css";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Champions />} />
          <Route path="/champion/:id" element={<ChampionDetail />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/region/:id" element={<RegionDetail />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/summoner" element={<div className="p-6">Page Invocateur (à venir)</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);