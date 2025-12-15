import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import CalculatorPage from './pages/CalculatorPage';
import AIChatBot from './components/AIChatBot';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.hash || '#' : '#');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const routeRef = useRef(route);

  useEffect(() => {
    routeRef.current = route;
  }, [route]);

  // Refactored navigation logic as requested
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHashChange = () => {
      const newRoute = window.location.hash || '#';

      if (newRoute !== routeRef.current) {
        setRoute(newRoute);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () =>
      window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    if (route.startsWith('#solutions')) {
      return <SolutionsPage route={route} />;
    }
    if (route === '#about') {
        return <AboutPage />;
    }
    if (route === '#calculator') {
        return <CalculatorPage />;
    }
    if (route === '#dashboard') {
        // Dashboard has its own internal login state
        return <DashboardPage />;
    }
    return <HomePage />;
  };

  // Trigger transition effect when route changes
  useEffect(() => {
     setIsTransitioning(true);
     const timer = setTimeout(() => setIsTransitioning(false), 500);
     return () => clearTimeout(timer);
  }, [route]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 antialiased selection:bg-yellow-500 selection:text-black">
      {/* Hide Header/Footer on Dashboard for a focused view */}
      {route !== '#dashboard' && <Header />}
      
      <main 
        className={`transition-all duration-500 ease-in-out transform ${
            isTransitioning 
            ? 'opacity-0 translate-y-4 scale-[0.99]' 
            : 'opacity-100 translate-y-0 scale-100'
        }`}
      >
        {renderPage()}
      </main>
      
      {route !== '#dashboard' && <Footer />}
      
      {/* Chatbot and WhatsApp persist unless on dashboard */}
      {route !== '#dashboard' && (
        <>
            <FloatingWhatsApp />
            <AIChatBot />
        </>
      )}
    </div>
  );
};

export default App;