import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BookOpenCheck,
  Compass,
  GraduationCap,
  HeartHandshake,
  Monitor,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../data/defaultSiteData';

const ICON_MAP = {
  GraduationCap,
  Wrench,
  Monitor,
  HeartHandshake,
  BookOpenCheck,
  Award,
  Compass,
  ShieldCheck,
};

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#F8F6EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
            Institutional Strengths
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#102D55] mt-2">
            Why Families & Students Choose Us
          </h2>
          <p className="text-base text-[#252525]/80 mt-3 leading-relaxed">
            Guided by transparency, practical learning, and personal mentorship,
            every program is structured to build real capability without
            unnecessary financial barriers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
            const Icon = ICON_MAP[item.iconKey];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-6 border border-[#102D55]/10 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="w-11 h-11 rounded-xl bg-[#102D55] text-[#D5A83D] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#102D55]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#252525]/75 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
