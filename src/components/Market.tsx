import React, { useEffect, useRef } from 'react';
import { TrendingUp, Users, BarChart3, Globe, Building, Briefcase } from 'lucide-react';

const CountUpAnimation = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = React.useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime;
          const startValue = 0;
          const endValue = end;

          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;

            if (progress < 1) {
              const value = Math.floor(startValue + (endValue - startValue) * progress);
              setCount(value);
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [end, duration]);

  return (
    <span ref={countRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default function Market() {
  return (
    <section id="market" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Un marché en pleine Expansion
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="text-primary" />
              Europe
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Building className="text-primary w-5 h-5" />
                28 Ligues professionnelles
              </li>
              <li className="flex items-center gap-2">
                <Users className="text-primary w-5 h-5" />
                <CountUpAnimation end={200000} suffix="+ clubs amateurs" />
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="text-primary w-5 h-5" />
                <CountUpAnimation end={300} suffix="M+ supporters actifs" />
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="text-primary w-5 h-5" />
                Marché des transferts : <CountUpAnimation end={7} suffix="Mrd€/an" />
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Globe className="text-secondary" />
              Afrique
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Building className="text-secondary w-5 h-5" />
                <CountUpAnimation end={1000} suffix="+ clubs professionnels" />
              </li>
              <li className="flex items-center gap-2">
                <Users className="text-secondary w-5 h-5" />
                <CountUpAnimation end={5000} suffix="+ académies" />
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="text-secondary w-5 h-5" />
                <CountUpAnimation end={700} suffix="M+ supporters" />
              </li>
              <li className="flex items-center gap-2">
                <Briefcase className="text-secondary w-5 h-5" />
                Marché encore inexploité
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center">Projections Financières</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Année 1 (2025)</h4>
              <p className="text-3xl font-bold text-primary mb-2">
                <CountUpAnimation end={4.5} suffix="M€" />
              </p>
              <p className="text-gray-600">Revenus</p>
              <p className="text-xl font-semibold text-secondary mt-2">
                EBITDA: <CountUpAnimation end={1.2} suffix="M€" />
              </p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Année 3 (2026)</h4>
              <p className="text-3xl font-bold text-primary mb-2">
                <CountUpAnimation end={15} suffix="M€" />
              </p>
              <p className="text-gray-600">Revenus</p>
              <p className="text-xl font-semibold text-secondary mt-2">
                Valorisation: <CountUpAnimation end={75} suffix="M€" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}