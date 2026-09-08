import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/potterdb" element={<CategoryPage source="potterdb" label="Harry Potter" />} />
      <Route path="/cosmyday" element={<CategoryPage source="cosmyday" label="Horoscope" />} />
      <Route path="/anycrap" element={<CategoryPage source="anycrap" label="Anycrap" />} />
    </Routes>
  );
}