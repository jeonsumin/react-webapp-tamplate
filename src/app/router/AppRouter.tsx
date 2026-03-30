import { Routes, Route } from 'react-router-dom';
import {HomePage} from "pages/Home/HomePage";

/**
 * Central route definitions.
 * Routes are layout-agnostic; the layout is provided by LayoutProvider
 * wrapping this router in App.tsx.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
