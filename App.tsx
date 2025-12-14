import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SolutionsPage from './pages/SolutionsPage';
import AIChatBot from './components/AIChatBot';

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
      const isSolutionsSubNav = routeRef.current.startsWith('#solutions') && newRoute.startsWith('#solutions');

      if (newRoute !== routeRef.current) {
        if (isSolutionsSubNav) {
          // It's a filter change on the same page. No transition, just update the route.
          setRoute(newRoute);
        } else {
          // It's a navigation to a different page. Do the fade transition.
          setIsTransitioning(true);
          setTimeout(() => {
            setRoute(newRoute);
            window.scrollTo(0, 0);
            setTimeout(() => setIsTransitioning(false), 50); 
          }, 300);
        }
      } else {
        // If it's the same route, just ensure we're at the top.
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial call to set state and scroll position correctly.
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    if (route.startsWith('#solutions')) {
      return <SolutionsPage route={route} />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 antialiased selection:bg-yellow-500 selection:text-black">
      <Header />
      <main className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </main>
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default App;