import React from 'react';
import { Shield, Zap, Sparkles, Moon, Heart, Wind } from 'lucide-react';
import Reveal from './Reveal';

const benefits = [
  {
    icon: Shield,
    title: "Supports Immunity",
    desc: "Packed with Vitamin C and natural antioxidants to keep your defenses strong."
  },
  {
    icon: Zap,
    title: "Helps Digestion",
    desc: "Lemongrass and cardamom work together to soothe the stomach and aid digestion."
  },
  {
    icon: Moon,
    title: "Naturally Caffeine-Free",
    desc: "Enjoy sustained, jitter-free energy without the afternoon crash."
  },
  {
    icon: Heart,
    title: "Supports Heart Health",
    desc: "Known traditionally to help maintain healthy blood pressure levels."
  },
  {
    icon: Wind,
    title: "Reduces Inflammation",
    desc: "Cloves and active compounds help reduce systemic inflammation."
  }
];

const Wellness = () => {
  return (
    <section id="benefits" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Wellness in <span className="italic font-normal">Every Drop</span>
          </h2>
          <p className="text-lg text-primary-foreground/80">
            More than just a comforting drink. Our blend is meticulously formulated to nourish your body and calm your mind.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.1}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <benefit.icon className="w-10 h-10 text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-primary-foreground/70 leading-relaxed text-sm">
                  {benefit.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wellness;
