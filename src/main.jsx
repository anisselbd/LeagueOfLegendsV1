import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Champions from "./pages/Champions";
import ChampionDetail from "./pages/ChampionDetail";
import Regions from "./pages/Regions";
import Quiz from "./pages/Quiz";
import RegionDetail from "./pages/RegionDetail";
import Home from "./pages/Home";
import "./index.css";

function App() {
  const location = useLocation();
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            style={{ minHeight: "100%" }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/champion/:id" element={<ChampionDetail />} />
              <Route path="/regions" element={<Regions />} />
              <Route path="/region/:id" element={<RegionDetail />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/summoner" element={<div className="p-6">Page Invocateur (à venir)</div>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
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