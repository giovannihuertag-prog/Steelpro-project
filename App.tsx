import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import AIChatBot from './components/AIChatBot';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const routeRef = useRef(route);

  useEffect(() => {
    routeRef.current = route;
  }, [route]);

  useEffect(() => {
    const handleHashChange = () => {
      const newRoute = window.location.hash || '#';
      // Only transition if not just filtering within solutions
      const isSolutionsSubNav = routeRef.current.startsWith('#solutions') && newRoute.startsWith('#solutions');

      if (newRoute !== routeRef.current) {
        if (isSolutionsSubNav) {
          setRoute(newRoute);
        } else {
          setIsTransitioning(true);
          setTimeout(() => {
            setRoute(newRoute);
            window.scrollTo(0, 0);
            setTimeout(() => setIsTransitioning(false), 50); 
          }, 300);
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#solutions')) {
      return <SolutionsPage route={route} />;
    }
    if (route === '#about') {
        return <AboutPage />;
    }
    if (route === '#dashboard') {
        // Dashboard has its own internal login state, so we just render it.
        // It's a "private" page but handled client-side for this demo.
        return <DashboardPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 antialiased selection:bg-yellow-500 selection:text-black">
      {/* Hide Header/Footer on Dashboard for a focused view, or keep them. Keeping them for consistency but maybe simpler. */}
      {route !== '#dashboard' && <Header />}
      
      <main className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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