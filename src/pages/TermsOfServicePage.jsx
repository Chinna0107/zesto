import React from 'react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';

export function TermsOfServicePage() {
  return (
    <div className="bg-zesto-gradient min-h-screen pb-24 md:pb-16 font-sans relative">
      <Header title="Terms of Service" variant="home" />
      
      {/* Top Banner */}
      <div className="relative bg-white/5 backdrop-blur-md border-x-0 border-t-0 border-b border-brand-orange/20 py-16 md:py-20 px-4 overflow-hidden mt-2">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-orange via-transparent to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight text-white drop-shadow-md">Terms of Service</h1>
          <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-sm">
            Please read these terms carefully before using Zesto. These terms govern your use of our website and services.
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
                <FileText className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">1. Acceptance of Terms</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <CheckCircle className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">2. User Account Obligations</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm md:text-base">
              <li>You are responsible for safeguarding the password that you use to access the Service.</li>
              <li>You agree not to disclose your password to any third party.</li>
              <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <Scale className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">3. Intellectual Property</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              The Service and its original content, features and functionality are and will remain the exclusive property of Zesto and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Zesto.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-50 p-2.5 rounded-xl">
                <AlertCircle className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">4. Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              In no event shall Zesto, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

        </motion.div>
      </div>
    </div>
  );
}
