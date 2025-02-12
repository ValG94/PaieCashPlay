import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Pierre Ferracci",
    role: "Président du Paris FC",
    content: "Paiecash a révolutionné notre approche de l'engagement des fans. Une solution innovante et efficace.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    name: "Sarah Johnson",
    role: "Directrice Marketing, Mastercard",
    content: "Un partenariat qui nous a permis d'atteindre de nouveaux sommets dans l'expérience client.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80"
  }
];

const partners = [
  { name: "Mastercard", logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" },
  { name: "Paris FC", logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80" }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Ils nous soutiennent déjà
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold mb-8">Nos Partenaires</h3>
          <div className="flex justify-center items-center gap-12 grayscale opacity-60">
            {partners.map((partner, index) => (
              <img 
                key={index}
                src={partner.logo} 
                alt={partner.name}
                className="h-12 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}