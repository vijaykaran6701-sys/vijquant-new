import { useEffect, useRef } from 'react';

const technologies = [
  { name: 'Figma', color: 'from-purple-500 to-pink-500' },
  { name: 'Adobe Illustrator', color: 'from-orange-500 to-yellow-500' },
  { name: 'Adobe XD', color: 'from-pink-500 to-purple-500' },
  { name: 'Photoshop', color: 'from-blue-500 to-cyan-500' },
  { name: 'Canva', color: 'from-cyan-500 to-blue-500' },
  { name: 'Sketch', color: 'from-yellow-500 to-orange-500' },
  { name: 'InVision', color: 'from-red-500 to-pink-500' },
  { name: 'After Effects', color: 'from-indigo-500 to-purple-500' },
];

export default function TechnologiesMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 0.5;
      const marqueeWidth = marquee.scrollWidth / 2;
      
      if (Math.abs(position) >= marqueeWidth) {
        position = 0;
      }
      
      marquee.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden py-16 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Tools We Master
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto">
          Industry-leading design tools to bring your vision to life
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
        
        <div ref={marqueeRef} className="flex gap-8 whitespace-nowrap">
          {duplicatedTechnologies.map((tech, index) => (
            <div
              key={index}
              className="inline-flex items-center px-8 py-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50"
            >
              <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${tech.color} mr-4`}></div>
              <span className="text-white font-semibold text-lg">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
