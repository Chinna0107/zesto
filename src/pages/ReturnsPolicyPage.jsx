import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { RefreshCcw, ShieldAlert, CreditCard, HelpCircle } from 'lucide-react';

export function ReturnsPolicyPage() {
  return (
    <div className="bg-zesto-gradient min-h-screen pb-24 md:pb-16 font-sans relative">
      <Header title="Returns & Refunds" variant="home" />
      
      {/* Top Banner */}
      <div className="relative bg-white/5 backdrop-blur-md border-x-0 border-t-0 border-b border-brand-orange/20 py-16 md:py-20 px-4 overflow-hidden mt-2">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange via-transparent to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md">Returns & Refunds</h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            We want you to be completely satisfied with your purchase. Here is how we handle returns.
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
          
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <RefreshCcw className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Return Window</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              We accept returns up to 14 days after delivery. If the item is unused and in its original condition, we will refund the full order amount minus the shipping costs for the return.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              If the item is defective or damaged during transit, please contact us immediately upon receipt so we can evaluate the issue and make it right.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <ShieldAlert className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Non-returnable Items</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products).
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <CreditCard className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Refunds Process</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <HelpCircle className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Exchanges</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item. We do not offer direct exchanges.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}
