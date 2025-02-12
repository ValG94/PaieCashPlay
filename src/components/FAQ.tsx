import React from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Quels sont les risques de l'investissement ?",
    answer: "Comme tout investissement, il existe des risques. Nous les minimisons grâce à notre modèle économique éprouvé et notre équipe expérimentée."
  },
  {
    question: "Comment vos fonds seront-ils utilisés ?",
    answer: "Les fonds seront principalement utilisés pour le développement technologique, l'expansion commerciale et le marketing."
  },
  {
    question: "Quand puis-je espérer un retour sur investissement ?",
    answer: "Nous visons un horizon de 3 ans pour les premiers retours significatifs sur investissement."
  },
  {
    question: "En tant qu'investisseur, puis-je bénéficier d'avantages fiscaux ?",
    answer: "Oui, vous pouvez bénéficier d'une réduction d'impôt en investissant dans notre entreprise. Cette réduction s'applique spécifiquement aux versements en numéraire effectués lors de la souscription au capital initial ou aux augmentations de capital de petites entreprises. Important : pour être éligible à cet avantage fiscal, vous devez conserver vos titres pendant une durée minimale, soit jusqu'au 31 décembre de la cinquième année suivant celle de votre souscription."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Questions Fréquemment Posées
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden"
            >
              <button
                className="w-full p-6 flex items-center justify-between text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-primary" />
                ) : (
                  <Plus className="w-5 h-5 text-primary" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}