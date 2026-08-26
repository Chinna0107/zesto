import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Placing an order is simple! Browse our categories, add your desired products to the cart, and proceed to checkout. You can securely pay using various payment methods."
  },
  {
    question: "Do you offer cash on delivery (COD)?",
    answer: "Currently, we accept prepaid orders only to ensure contactless and safe delivery of your items. We support all major Credit/Debit cards, UPI, and Net Banking."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with the tracking details. You can also log into your account and check the 'My Orders' section for real-time updates."
  },
  {
    question: "Can I cancel my order?",
    answer: "Orders can be cancelled before they are dispatched. Once an order is shipped, it cannot be cancelled. Please contact our support team immediately if you need to cancel an order."
  },
  {
    question: "Are your products authentic?",
    answer: "Yes, absolutely! We source all our electronics, fashion, and home products directly from trusted brands and verified vendors to ensure you receive 100% authentic items."
  }
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-zesto-gradient min-h-screen pb-24 md:pb-16 font-sans relative">
      <Header title="FAQs" variant="home" />
      
      {/* Top Banner */}
      <div className="relative bg-white/5 backdrop-blur-md border-x-0 border-t-0 border-b border-brand-orange/20 py-16 md:py-20 px-4 overflow-hidden mt-2">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange via-transparent to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md">Frequently Asked Questions</h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Find answers to the most common questions about shopping with Zesto.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.08)] p-8 md:p-12 space-y-10"
        >
          
          <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-6">
            <div className="bg-orange-50 p-2.5 rounded-xl">
              <HelpCircle className="w-6 h-6 text-brand-orange" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Common Queries</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={cn(
                  "border rounded-2xl overflow-hidden transition-all duration-300",
                  openIndex === index ? "border-brand-orange shadow-md bg-white" : "border-gray-100 hover:border-brand-orange/50 bg-gray-50/50 hover:bg-white"
                )}
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className={cn("w-5 h-5 transition-colors", openIndex === index ? "text-brand-orange" : "text-gray-400")} />
                    <span className="font-bold text-gray-900 text-[15px] pr-4">{faq.question}</span>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 shrink-0 transition-transform duration-300", openIndex === index ? "text-brand-orange rotate-180" : "text-gray-400")} />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-1">
                        <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </div>
  );
}
