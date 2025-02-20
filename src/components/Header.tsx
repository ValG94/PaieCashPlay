import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/logo paiecashplay.jpg';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const location = useLocation();
  
  // Empêcher le défilement du body quand le menu est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'hero', label: 'Accueil', href: '/#hero' },
    { id: 'solution', label: 'Solution', href: '/#solution' },
    { id: 'market', label: 'Marché', href: '/#market' },
    { id: 'team', label: 'Équipe', href: '/#team' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <img 
              src={logoImage} 
              alt="PaieCash Play Logo" 
              className="h-8 object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-gray-700 hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg px-3 py-2"
              >
                {item.label}
              </a>
            ))}
            <Link 
              to="/invest" 
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Investir
            </Link>
          </nav>

          {/* Bouton Menu Mobile */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Ouvrir le menu"
            aria-expanded={isMenuOpen}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      >
        <div 
          className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <Link 
                  to="/" 
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img 
                    src={logoImage} 
                    alt="PaieCash Play Logo" 
                    className="h-8 object-contain"
                  />
                </Link>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Fermer le menu"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  to="/invest" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Investir
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}