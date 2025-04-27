import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import CursorSpotlight from './components/CursorSpotlight';  // Import directly

// Components
const Home = lazy(() => import('./pages/Home'));
const StudentList = lazy(() => import('./pages/StudentList'));
const AddStudent = lazy(() => import('./pages/AddStudent'));
const EditStudent = lazy(() => import('./pages/EditStudent'));
const Navbar = lazy(() => import('./components/Navbar'));
const LoadingSpinner = lazy(() => import('./components/LoadingSpinner'));

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--dark-bg);
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppWrapper>
          <CursorSpotlight />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
                border: '1px solid var(--neon-blue)',
                boxShadow: '0 0 10px rgba(0, 243, 255, 0.2)'
              },
              success: {
                iconTheme: {
                  primary: '#00f3ff',
                  secondary: '#000'
                }
              }
            }}
          />
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/students" element={<StudentList />} />
                <Route path="/add-student" element={<AddStudent />} />
                <Route path="/edit-student/:id" element={<EditStudent />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
