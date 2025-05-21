
import React, { useEffect, useRef } from 'react';
import { Pill } from 'lucide-react';

const HeroPillOrbit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Create orbiting pills
    const createOrbitingPills = () => {
      // Clear existing pills
      const existingPills = container.querySelectorAll('.hero-orbiting-pill');
      existingPills.forEach(pill => pill.remove());
      
      // Create new pills
      const pillCount = window.innerWidth < 768 ? 8 : 12;
      
      for (let i = 0; i < pillCount; i++) {
        const pill = document.createElement('div');
        pill.classList.add('hero-orbiting-pill');
        
        // Randomize pill properties
        const size = Math.random() * 30 + 15; // 15-45px
        const angle = (i / pillCount) * Math.PI * 2; // Distribute evenly
        const distance = Math.random() * 30 + 70; // 70-100% of orbit radius
        const speed = Math.random() * 15 + 25; // 25-40s per revolution
        const delay = Math.random() * -30; // Random start position
        
        // Randomly choose color variant
        const colorVariant = Math.floor(Math.random() * 4);
        let color;
        
        switch(colorVariant) {
          case 0:
            color = `hsla(196, 72%, 49%, 0.8)`; // Primary blue
            break;
          case 1:
            color = `hsla(185, 72%, 40%, 0.8)`; // Teal
            break;
          case 2:
            color = `hsla(210, 70%, 60%, 0.8)`; // Light blue
            break;
          default:
            color = `hsla(200, 60%, 70%, 0.8)`; // Sky blue
        }
        
        // Set pill styles
        pill.style.width = `${size}px`;
        pill.style.height = `${size / 2}px`;
        pill.style.borderRadius = '50%';
        pill.style.backgroundColor = color;
        pill.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        pill.style.position = 'absolute';
        pill.style.top = '50%';
        pill.style.left = '50%';
        pill.style.transform = 'translate(-50%, -50%)';
        pill.style.animation = `hero-orbit ${speed}s linear ${delay}s infinite`;
        pill.style.transformOrigin = 'center';
        pill.style.zIndex = '1';
        
        // Calculate initial position on the orbit
        const orbitRadius = Math.min(container.offsetWidth, container.offsetHeight) / 2.5 * (distance / 100);
        const x = Math.cos(angle) * orbitRadius;
        const y = Math.sin(angle) * orbitRadius;
        
        pill.style.setProperty('--x', `${x}px`);
        pill.style.setProperty('--y', `${y}px`);
        pill.style.setProperty('--orbit-radius', `${orbitRadius}px`);
        
        container.appendChild(pill);
      }
    };
    
    // Create keyframe animation dynamically
    const createOrbitAnimation = () => {
      // Remove existing style element if it exists
      const existingStyle = document.getElementById('hero-pill-orbit-style');
      if (existingStyle) existingStyle.remove();
      
      const style = document.createElement('style');
      style.id = 'hero-pill-orbit-style';
      style.textContent = `
        @keyframes hero-orbit {
          0% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(0deg);
          }
          50% {
            transform: translate(calc(-50% - var(--x)), calc(-50% + var(--y))) rotate(180deg);
          }
          100% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) rotate(360deg);
          }
        }
        
        @keyframes hero-central-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(30, 174, 219, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 50px rgba(30, 174, 219, 0.5);
          }
        }
        
        @keyframes hero-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-15px) rotate(-1deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(15px) rotate(1deg);
          }
        }
      `;
      
      document.head.appendChild(style);
    };
    
    // Initialize
    createOrbitAnimation();
    createOrbitingPills();
    
    // Recreate pills when window is resized
    const handleResize = () => {
      createOrbitingPills();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      const style = document.getElementById('hero-pill-orbit-style');
      if (style) style.remove();
    };
  }, []);
  
  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* Central Large Pill */}
      <div className="relative z-10 animate-[hero-float_8s_ease-in-out_infinite]">
        <div className="bg-gradient-to-r from-senay-blue-500 to-senay-teal-500 w-96 h-48 rounded-full flex items-center justify-center shadow-2xl animate-[hero-central-pulse_4s_ease-in-out_infinite]">
          <div className="bg-white w-88 h-40 rounded-full flex items-center justify-center">
            <Pill className="text-senay-blue-600 h-8 w-8 mr-2" />
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-senay-blue-600 to-senay-teal-600 font-bold text-5xl">
              SenayMed
            </div>
          </div>
        </div>
      </div>
      
      {/* Extra decorative pill elements */}
      <div className="absolute top-1/4 left-1/4 bg-senay-blue-300 w-8 h-4 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/3 right-1/3 bg-senay-teal-300 w-10 h-5 rounded-full opacity-60"></div>
      <div className="absolute top-2/3 left-1/3 bg-senay-blue-200 w-6 h-3 rounded-full opacity-40"></div>
    </div>
  );
};

export default HeroPillOrbit;
