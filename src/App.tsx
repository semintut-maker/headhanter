/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import VacanciesPage from "./pages/VacanciesPage";
import VacancyPage from "./pages/VacancyPage";

function App() {
  return (
    <BrowserRouter basename='/headhanter'>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<VacanciesPage />}
        />
        <Route
          path='/vacancies'
          element={<VacanciesPage />}
        />
        <Route
          path='/vacancies/:id'
          element={<VacancyPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
