import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { I18nProvider } from './contexts/I18nContext'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.tsx'
import Dashboard from './pages/Dashboard/Dashboard.tsx'
import { ToastProvider } from './components/Toast/Toast.tsx'
import { ProtectedRoute } from './hooks/ProtectedRoute'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>,
)
