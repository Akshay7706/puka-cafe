import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import LocationsView from './components/LocationsView';
import GalleryView from './components/GalleryView';
import AboutView from './components/AboutView';
import FranchiseView from './components/FranchiseView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import { motion } from 'motion/react';

export default function App() {
  const [currentView, setView] = useState<string>('home');
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>('');

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            setView={setView} 
            setSelectedBranchSlug={setSelectedBranchSlug} 
          />
        );
      case 'menu':
        return <MenuView />;
      case 'locations':
        return (
          <LocationsView 
            selectedBranchSlug={selectedBranchSlug} 
            setSelectedBranchSlug={setSelectedBranchSlug} 
          />
        );
      case 'gallery':
        return <GalleryView />;
      case 'about':
        return <AboutView />;
      case 'blog':
        return <BlogView />;
      case 'franchise':
        return <FranchiseView />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView 
            setView={setView} 
            setSelectedBranchSlug={setSelectedBranchSlug} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-puka-bg text-puka-black flex flex-col justify-between selection:bg-puka-gold/30 selection:text-puka-black antialiased">
      {/* Premium Header/Navigation */}
      <Navbar currentView={currentView} setView={setView} />

      {/* Main Core View Area */}
      <main className="flex-grow">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderActiveView()}
        </motion.div>
      </main>

      {/* Corporate Footer Grid */}
      <Footer setView={setView} />
    </div>
  );
}
