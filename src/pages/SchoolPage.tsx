import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Laptop,
  Palette,
  Puzzle,
  Smile,
  Sparkles,
} from 'lucide-react';
import { SCHOOL_PILLARS, STOCK_MEDIA } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { ResilientImage } from '../components/ResilientImage';

const PILLAR_ICONS = [Smile, BookOpen, Puzzle, Palette, Laptop, Sparkles];

export const SchoolPage: React.FC = () => {
  const { settings, courses, openEnquiryFor } = useInstitution();

  const schoolClasses = courses.filter(
    (c) =>
      c.isActive && (c.category === 'kindergarten' || c.category === 'school')
  );

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
              Our School · {settings.shortName}
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              {settings.schoolName}
            </h1>
            <p className="text-base text-white/85 leading-relaxed max-w-2xl">
              Offering Nursery, Junior KG, Senior KG, and Standard 1 to Standard 5
              in a supportive English medium environment designed to nurture
              curiosity, literacy, and confidence.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => openEnquiryFor('Nursery', 'school_admission')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] font-bold text-sm transition-colors"
              >
                <span>School Admission Enquiry 2026</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-xl">
            <ResilientImage
              src={STOCK_MEDIA.earlyLearning}
              alt="Children learning at Zulekha Begum English Medium School"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Available Classes Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
              Kindergarten & Primary Wing
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#102D55] mt-2">
              Classes Available for Admission
            </h2>
            <p className="text-sm sm:text-base text-[#252525]/80 mt-2 leading-relaxed">
              Select any grade below to begin a 2026 school admission enquiry for
              your child.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {schoolClasses.map((cls) => (
              <div
                key={cls.id}
                className="flex flex-col rounded-2xl overflow-hidden border border-[#102D55]/10 bg-white shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] bg-[#F8F6EF]">
                  <ResilientImage
                    src={
                      cls.category === 'kindergarten'
                        ? STOCK_MEDIA.earlyLearning
                        : STOCK_MEDIA.heroClassroom
                    }
                    alt={`${cls.title} classroom learning`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-xs font-medium text-[#8A6816]">
                    {cls.category === 'kindergarten'
                      ? 'Kindergarten Wing'
                      : 'Primary Wing'}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#102D55] mt-1">
                    {cls.title}
                  </h3>
                  <p className="text-sm text-[#252525]/75 mt-2 leading-relaxed flex-1">
                    {cls.shortDescription}
                  </p>
                  <button
                    type="button"
                    onClick={() => openEnquiryFor(cls.title, 'school_admission')}
                    className="mt-4 w-full py-2.5 px-4 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-xs font-semibold transition-colors"
                  >
                    Enquire for {cls.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six Core School Sections */}
      <section className="py-16 lg:py-20 bg-[#F8F6EF] border-t border-[#102D55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
              Holistic Approach
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#102D55] mt-2">
              How Children Learn at ZBEM School
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCHOOL_PILLARS.map((pillar, idx) => {
              const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <div
                  key={pillar.title}
                  className="bg-white rounded-2xl p-6 border border-[#102D55]/10 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#102D55] text-[#D5A83D] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#102D55]">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#252525]/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
