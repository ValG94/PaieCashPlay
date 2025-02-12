import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import logoImage from '../assets/logo paiecashplay.jpg';

export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="PaieCash Play Logo" 
              className="h-8 object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('solution')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Solution
            </button>
            <button 
              onClick={() => scrollToSection('market')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Marché
            </button>
            <button 
              onClick={() => scrollToSection('team')} 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Équipe
            </button>
            <Link 
              to="/invest" 
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Investir
            </Link>
          </nav>

          <button className="md:hidden">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}