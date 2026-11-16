import React from 'react';
import { ArrowRight, Compass, Eye, Heart, Target } from 'lucide-react';
import { STOCK_MEDIA, TRUST_LOGO_PATH } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { ResilientImage } from '../components/ResilientImage';

export const AboutPage: React.FC = () => {
  const { settings, navigate } = useInstitution();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
              About Us · {settings.trustName}
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
              Serving Learners with Integrity & Purpose
            </h1>
            <p className="text-base text-white/85 leading-relaxed">
              {settings.tagline}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg shrink-0">
            <img
              src={TRUST_LOGO_PATH}
              alt="Zulekha Begam Educational Trust Seal"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Overview + Student Activity Photograph */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
              About Zulekha Begam Educational Trust
            </p>
            <h2 className="font-serif text-3xl font-semibold text-[#102D55]">
              Accessible Schooling & Career Skill Development in Bhiwandi
            </h2>
            <p className="text-base text-[#252525]/85 leading-relaxed">
              {settings.aboutOverview}
            </p>
            <p className="text-sm text-[#252525]/75 leading-relaxed">
              Located at {settings.address}, the Trust brings together early
              childhood schooling through {settings.schoolName} ({settings.shortName})
              and practical career divisions spanning ITI & Technical Trades,
              Diploma studies, Computer Education, and Paramedical Training.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#102D55]/10">
              <ResilientImage
                src={STOCK_MEDIA.heroClassroom}
                alt="Students learning in classroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#102D55]/10">
              <ResilientImage
                src={STOCK_MEDIA.earlyLearning}
                alt="Early childhood educational activities"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#102D55]/10">
              <ResilientImage
                src={STOCK_MEDIA.computerLab}
                alt="Computer laboratory training"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#102D55]/10">
              <ResilientImage
                src={STOCK_MEDIA.paramedicalLab}
                alt="Paramedical practical training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-[#F8F6EF] border-y border-[#102D55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-[#102D55]/10 shadow-xs space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#102D55] text-[#D5A83D] flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#102D55]">
              Our Vision
            </h2>
            <p className="text-base text-[#252525]/85 leading-relaxed">
              {settings.vision}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#102D55]/10 shadow-xs space-y-4">
            <div className="w-11 h-11 rounded-xl bg-[#102D55] text-[#D5A83D] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-[#102D55]">
              Our Mission
            </h2>
            <p className="text-base text-[#252525]/85 leading-relaxed">
              {settings.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy, Commitment & Future Goals */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-7 rounded-2xl border border-[#102D55]/10 bg-white space-y-3">
            <Compass className="w-6 h-6 text-[#8A6816]" />
            <h3 className="font-serif text-xl font-semibold text-[#102D55]">
              Our Educational Philosophy
            </h3>
            <p className="text-sm text-[#252525]/80 leading-relaxed">
              {settings.philosophy}
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-[#102D55]/10 bg-white space-y-3">
            <Heart className="w-6 h-6 text-[#8A6816]" />
            <h3 className="font-serif text-xl font-semibold text-[#102D55]">
              Our Commitment to Quality Education
            </h3>
            <p className="text-sm text-[#252525]/80 leading-relaxed">
              {settings.commitment}
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-[#102D55]/10 bg-white space-y-3">
            <ArrowRight className="w-6 h-6 text-[#8A6816]" />
            <h3 className="font-serif text-xl font-semibold text-[#102D55]">
              Our Future Goals
            </h3>
            <p className="text-sm text-[#252525]/80 leading-relaxed">
              {settings.futureGoals}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <button
            type="button"
            onClick={() => navigate('admissions')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] font-bold text-sm transition-colors"
          >
            <span>Enquire for Admissions 2026</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
