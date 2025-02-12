import React from 'react';
import { TrendingUp, Users, Database } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problem" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Les défis du Sport à l'Ère Numérique
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Users className="text-primary" />
                Le problème
              </h3>
              <p className="text-gray-600">
                Aujourd'hui, les clubs sportifs et les fédérations peinent à engager efficacement leurs communautés dans un environnement de plus en plus digitalisé.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="text-secondary" />
                L'opportunité
              </h3>
              <p className="text-gray-600">
                Avec PaiecashPlay, nous transformons ces défis en opportunités grâce à des solutions innovantes basées sur la data et l'interaction en temps réel.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
                alt="Sport Digital Challenges"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl">
              <Database className="w-8 h-8 mb-2" />
              <p className="font-semibold">Solutions basées sur la Data</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}