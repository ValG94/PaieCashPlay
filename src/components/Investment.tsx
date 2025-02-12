import React from 'react';
import { CheckCircle2, ArrowUpRight, Target, Rocket, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const investmentDetails = [
  {
    title: "Utilisation des fonds",
    items: [
      "Technologie (400K€) : R&D, infrastructure cloud, sécurité",
      "Déploiement (250K€) : Formation des équipes, intégration clubs",
      "Réglementaire (150K€) : Certification FIFA, conformité RGPD",
      "Opérations (100K€) : RH, bureaux, administration"
    ]
  },
  {
    title: "Termes d'investissement",
    items: [
      "Valorisation Pre-money : 5M€",
      "Post-money : 5.808M€",
      "Multiplication de la valeur attendue : x5 - x7",
      "Sortie des investisseurs prévue à 5 ans"
    ]
  }
];

export default function Investment() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Proposition d'investissement
            </h2>
            
            {investmentDetails.map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">{section.title}</h3>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Link 
              to="/invest"
              className="px-8 py-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-all flex items-center gap-2 inline-flex"
            >
              Investir maintenant
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phase 1 (2025)</h3>
              <p className="text-gray-600">50 clubs pilotes en Europe & Afrique, certification FIFA & conformité réglementaire</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <Rocket className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phase 2 (2026)</h3>
              <p className="text-gray-600">Déploiement à 100+ clubs et 200+ académies, expansion vers 5 marchés majeurs</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Notre vision</h3>
              <p className="text-gray-600">Digitaliser et optimiser l'écosystème du sport avec des solutions technologiques avancées</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}