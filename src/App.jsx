import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AzurePortalLabs from './pages/AzurePortalLabs';
import FoundryLabs from './pages/FoundryLabs';
import LabDoodles from './pages/LabDoodles';
import StudyNotes from './pages/StudyNotes';

import CourseDayPage from './pages/CourseDayPage';
import { ProgressProvider } from './context/ProgressContext';

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<AzurePortalLabs />} />
            <Route path="foundry" element={<FoundryLabs />} />
            <Route path="doodles" element={<LabDoodles />} />
            <Route path="lab/:id" element={<StudyNotes />} />
            <Route path="days/:slug" element={<CourseDayPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}
