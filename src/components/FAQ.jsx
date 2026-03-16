import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    question: "What makes PushpRas Hibiscus tea unique?",
    answer: "Our blend combines premium hibiscus petals with cardamom, lemongrass, cloves, and ginger, sweetened naturally with stevia leaf. It's 100% organic, caffeine-free, and contains zero artificial sugars."
  },
  {
    question: "How do I brew the perfect cup?",
    answer: "Add one heaping teaspoon of the blend to boiling water and let it steep for 5-7 minutes. You can enjoy it hot or iced. Check our Brewing Guide for more details."
  },
  {
    question: "Is this tea safe for everyone?",
    answer: "While our ingredients are natural and generally safe, we recommend consulting with a healthcare provider if you are pregnant, nursing, or on medication—especially if you have blood pressure concerns, as hibiscus is quite potent."
  },
  {
    question: "How long does shipping take?",
    answer: "Orders are processed within 24-48 hours. Standard domestic shipping typically takes 3-5 business days."
  },
  {
    question: "Can I drink this tea every day?",
    answer: "Yes! Our caffeine-free blend is designed for daily wellness. Many of our customers enjoy 1-2 cups throughout the day to support heart health and digestion."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Frequently Asked <span className="italic text-primary">Questions</span>
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="border border-border rounded-2xl overflow-hidden bg-card hover:border-primary/30 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center group"
                >
                  <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    {faq.answer}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
