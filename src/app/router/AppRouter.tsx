import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/Home/HomePage';
import { AboutPage } from '@/pages/About/AboutPage';
import { TestPage } from '@/pages/Test/TestPage';

/**
 * Central route definitions.
 * Routes are layout-agnostic; the layout is provided by LayoutProvider
 * wrapping this router in App.tsx.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}
