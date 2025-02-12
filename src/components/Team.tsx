import React from 'react';
import { Linkedin } from 'lucide-react';
import rcabralImage from '../assets/romaricCabral.jpeg';
import cetotImage from '../assets/cetot.jpg';
import letotImage from '../assets/leanaEtot.jpeg';

const teamMembers = [
  {
    name: "Constantin Etot",
    role: "CEO & fondateur",
    image: cetotImage,
    linkedin: "https://www.linkedin.com/in/constantin-etot/"
  },
  {
    name: "Léana Etot",
    role: "Digital Marketing",
    image: letotImage,
    linkedin: "https://www.linkedin.com/in/leana-etot/"
  },
  {
    name: "Romaric Cabrel Nzokou Koudjou",
    role: "Ingénieur Développeur FullStack",
    image: rcabralImage,
    linkedin: "https://www.linkedin.com/in/romaric-cabrel-nzokou-koudjou-635594190/?originalSubdomain=fr"
  }
];

export default function Team() {
  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          Les Visages derrière Paiecash
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}