import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <div className="bg-zesto-gradient min-h-screen pb-24 md:pb-16 font-sans relative">
      <Header title="Privacy Policy" variant="home" />
      
      {/* Top Banner */}
      <div className="relative bg-white/5 backdrop-blur-md border-x-0 border-t-0 border-b border-brand-orange/20 py-16 md:py-20 px-4 overflow-hidden mt-2">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange via-transparent to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md">Privacy Policy</h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Your privacy is critically important to us. Learn how we collect, use, and protect your personal information.
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
                <Database className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Information We Collect</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              We collect information to provide better services to all our users. The types of personal information we collect include:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm md:text-base">
              <li><strong>Personal Details:</strong> Name, email address, phone number, and shipping address.</li>
              <li><strong>Payment Information:</strong> Credit card details, UPI IDs, and billing address (processed securely by our payment partners).</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, device information, and IP addresses.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <Eye className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">How We Use Your Data</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              Your information is used to enhance your shopping experience:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm md:text-base">
              <li>To process and deliver your orders accurately.</li>
              <li>To communicate with you regarding order updates, offers, and support.</li>
              <li>To personalize your experience and recommend relevant products.</li>
              <li>To detect and prevent fraudulent activities.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <Shield className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Data Protection</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. All payment transactions are encrypted using SSL technology and are processed through a gateway provider; they are not stored or processed on our servers.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <Lock className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Your Rights</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact our support team. We will not sell, trade, or otherwise transfer your Personally Identifiable Information to outside parties.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}
