import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load route components for better performance
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Events = lazy(() => import('./pages/Events'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Team = lazy(() => import('./pages/Team'))
const Activities = lazy(() => import('./pages/Activities'))
const Join = lazy(() => import('./pages/Join'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))

export default function App(){
  return (
    <div className="app-root">
      <ErrorBoundary>
        <Header />
        <main>
          <Suspense fallback={<LoadingSpinner fullPage />}>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/activities" element={<Activities/>} />
              <Route path="/projects" element={<Projects/>} />
              <Route path="/events" element={<Events/>} />
              <Route path="/team" element={<Team/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/join" element={<Join/>} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin/>} />
              <Route path="/admin/dashboard" element={<AdminDashboard/>} />
              <Route path="/admin" element={<AdminLogin/>} />
              
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}
