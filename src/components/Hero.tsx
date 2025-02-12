import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

export default function Hero() {
  const scrollToNextSection = () => {
    const problemSection = document.getElementById('problem');
    if (problemSection) {
      problemSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero"
      className="relative min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 pt-20"
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/src/assets/hero-image.jpg')",
        }}
      ></div>

      <div className="relative container mx-auto px-6 py-32 flex flex-col items-center text-center z-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
          Révolutionnez l'Économie du Sport
          <span className="block text-primary">avec la Technologie</span>
        </h1>

        <p className="text-xl md:text-2xl mb-12 max-w-3xl text-white">
          PaieCashPlay révolutionne l'industrie du sport avec une solution
          tout-en-un : plateforme de paiement, marketplace, chatbot IA,
          streaming et outils de monétisation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={scrollToNextSection}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center gap-2 font-semibold transition-all"
          >
            Découvrir nos solutions
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* <button className="px-8 py-4 bg-secondary hover:bg-secondary/90 text-white rounded-full flex items-center gap-2 font-semibold transition-all">
            Télécharger le Pitch Deck
            <Download className="w-5 h-5" />
          </button> */}
        </div>
      </div>
    </div>
  );
}
