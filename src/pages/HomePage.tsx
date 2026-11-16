import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  MapPin,
  Megaphone,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  ADMISSION_POSTER_PATH,
  COURSE_CATEGORIES,
  FACILITIES_ITEMS,
  STOCK_MEDIA,
  TRUST_LOGO_PATH,
} from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { ResilientImage } from '../components/ResilientImage';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/whatsapp';

const SCHOOL_CLASSES_SUMMARY = [
  { name: 'Nursery', stage: 'Early Childhood' },
  { name: 'Junior KG', stage: 'Early Childhood' },
  { name: 'Senior KG', stage: 'School Readiness' },
  { name: 'Standard 1', stage: 'Primary Foundation' },
  { name: 'Standard 2', stage: 'Primary Foundation' },
  { name: 'Standard 3', stage: 'Core Academics' },
  { name: 'Standard 4', stage: 'Core Academics' },
  { name: 'Standard 5', stage: 'Upper Primary' },
];

export const HomePage: React.FC = () => {
  const {
    settings,
    announcements,
    gallery,
    navigate,
    openEnquiryFor,
  } = useInstitution();

  const activeAnnouncements = announcements.filter((a) => a.isActive);

  return (
    <div>
      {/* 1. Full-Width Hero Section */}
      <section className="relative overflow-hidden bg-[#0A1E3B] text-white">
        <div className="absolute inset-0">
          <ResilientImage
            src={settings.heroBannerUrl || STOCK_MEDIA.heroClassroom}
            alt="Happy students learning in a classroom at Zulekha Begam Educational Trust"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E3B]/95 via-[#102D55]/85 to-[#102D55]/55" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 space-y-6"
            >
              {settings.admissionsOpen && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#D5A83D] text-[#102D55] text-xs font-bold tracking-wider uppercase shadow-sm">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{settings.heroBadge || 'ADMISSIONS OPEN – 2026'}</span>
                </div>
              )}

              <div className="space-y-3">
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold leading-[1.12] tracking-tight text-white">
                  {settings.heroHeading}
                </h1>
                <p className="font-serif text-xl sm:text-2xl text-[#E8CA7A] font-medium">
                  {settings.heroSubheading}
                </p>
              </div>

              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl">
                {settings.heroDescription}
              </p>

              <p className="text-sm sm:text-base font-medium text-[#E8CA7A]">
                {settings.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('school')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] text-sm font-bold transition-colors shadow-md whitespace-nowrap"
                >
                  <span>Explore Our School</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('courses')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white text-[#102D55] hover:bg-[#F8F6EF] text-sm font-semibold transition-colors shadow-sm whitespace-nowrap"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Our Courses</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('admissions')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold backdrop-blur-xs transition-colors whitespace-nowrap"
                >
                  <span>Admission Open 2026</span>
                </button>
              </div>
            </motion.div>

            {/* Right Institutional Crest Card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4"
            >
              <div className="bg-white/95 backdrop-blur-md text-[#252525] rounded-2xl p-6 sm:p-7 border border-[#D5A83D]/50 shadow-2xl space-y-5">
                <div className="flex items-center gap-4">
                  <img
                    src={TRUST_LOGO_PATH}
                    alt="Zulekha Begam Educational Trust Official Seal"
                    className="w-16 h-16 object-contain shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6816]">
                      Registered Trust · E-12759
                    </p>
                    <h2 className="font-serif text-lg font-bold text-[#102D55] leading-snug mt-0.5">
                      {settings.schoolName}
                    </h2>
                  </div>
                </div>

                <div className="border-t border-[#102D55]/10 pt-4 space-y-2.5 text-sm">
                  <div className="flex items-center justify-between text-[#252525]/85">
                    <span>School Classes</span>
                    <span className="font-semibold text-[#102D55]">
                      Nursery to 5th Std
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#252525]/85">
                    <span>Career Divisions</span>
                    <span className="font-semibold text-[#102D55]">
                      ITI · Computer · Paramedical
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[#252525]/85">
                    <span>Admission Policy</span>
                    <span className="font-semibold text-[#102D55]">
                      No Donation Policy
                    </span>
                  </div>
                </div>

                <div className="border-t border-[#102D55]/10 pt-4 space-y-2 text-xs text-[#252525]/75">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#8A6816] shrink-0 mt-0.5" />
                    <span>{settings.address}</span>
                  </div>
                  <div className="flex items-center gap-2 tabular-nums">
                    <Phone className="w-4 h-4 text-[#8A6816] shrink-0" />
                    <a
                      href={buildTelUrl(settings.phonePrimary)}
                      className="font-semibold text-[#102D55] hover:underline"
                    >
                      {settings.phonePrimary}
                    </a>
                    {settings.phoneSecondary && (
                      <>
                        <span>/</span>
                        <a
                          href={buildTelUrl(settings.phoneSecondary)}
                          className="font-semibold text-[#102D55] hover:underline"
                        >
                          {settings.phoneSecondary}
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Live Announcements Ribbon */}
      {activeAnnouncements.length > 0 && (
        <section
          aria-label="Institutional Announcements"
          className="bg-[#F8F6EF] border-b border-[#102D55]/10"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#102D55] text-[#D5A83D] flex items-center justify-center shrink-0">
                <Megaphone className="w-4 h-4" />
              </div>
              <p className="text-sm text-[#252525]">
                <span className="font-semibold text-[#102D55]">
                  {activeAnnouncements[0].title}:{' '}
                </span>
                <span className="text-[#252525]/85">
                  {activeAnnouncements[0].body}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('admissions')}
              className="text-xs font-bold text-[#102D55] hover:text-[#8A6816] inline-flex items-center gap-1 whitespace-nowrap shrink-0 self-start md:self-center"
            >
              <span>Apply for 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      )}

      {/* 3. About & Vision/Mission Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
                  About the Institution
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#102D55] leading-tight">
                  Education Rooted in Purpose, Discipline & Practical Skill
                </h2>
                <p className="text-[15px] sm:text-base text-[#252525]/85 leading-relaxed">
                  {settings.aboutOverview}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="p-5 rounded-xl bg-[#F8F6EF] border border-[#102D55]/10">
                  <h3 className="font-serif text-lg font-semibold text-[#102D55]">
                    Our Vision
                  </h3>
                  <p className="text-sm text-[#252525]/80 mt-2 leading-relaxed">
                    {settings.vision}
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#F8F6EF] border border-[#102D55]/10">
                  <h3 className="font-serif text-lg font-semibold text-[#102D55]">
                    Our Mission
                  </h3>
                  <p className="text-sm text-[#252525]/80 mt-2 leading-relaxed">
                    {settings.mission}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-sm font-semibold transition-colors"
                >
                  <span>Read About Our Trust</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
              <div className="rounded-2xl overflow-hidden border border-[#102D55]/10 bg-[#F8F6EF] flex flex-col">
                <div className="flex-1 min-h-[240px]">
                  <ResilientImage
                    src={STOCK_MEDIA.earlyLearning}
                    alt="Kindergarten and primary students engaged in activity-based learning"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white border-t border-[#102D55]/10">
                  <p className="text-xs font-semibold text-[#102D55]">
                    ZBEM School · Kindergarten to 5th
                  </p>
                  <p className="text-xs text-[#252525]/70 mt-0.5">
                    Activity-based English medium learning
                  </p>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#102D55]/10 bg-[#F8F6EF] flex flex-col">
                <div className="flex-1 min-h-[240px]">
                  <ResilientImage
                    src={ADMISSION_POSTER_PATH}
                    alt="Zulekha Begam Educational Trust 2026 Admission Poster"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-4 bg-white border-t border-[#102D55]/10">
                  <p className="text-xs font-semibold text-[#102D55]">
                    Official 2026 Admission Notice
                  </p>
                  <p className="text-xs text-[#252525]/70 mt-0.5">
                    School, ITI, Diploma, Computer & Paramedical
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our School – ZBEM School Showcase */}
      <section className="py-16 lg:py-24 bg-[#102D55] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
                Zulekha Begum English Medium School
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
                ZBEM School: Nursery to 5th Standard
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                A joyful, structured English medium school environment where early
                childhood discovery grows naturally into confident primary
                academics and computer literacy.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('school')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] text-sm font-bold transition-colors self-start whitespace-nowrap"
            >
              <span>Visit Our School Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SCHOOL_CLASSES_SUMMARY.map((cls) => (
              <button
                key={cls.name}
                type="button"
                onClick={() => openEnquiryFor(cls.name, 'school_admission')}
                className="text-left p-5 rounded-xl bg-white/8 hover:bg-white/14 border border-white/15 transition-colors group"
              >
                <p className="text-xs font-medium text-[#E8CA7A]">{cls.stage}</p>
                <p className="font-serif text-xl font-semibold text-white mt-1 group-hover:text-[#D5A83D] transition-colors">
                  {cls.name}
                </p>
                <p className="text-xs text-white/70 mt-3 inline-flex items-center gap-1">
                  <span>Enquire for 2026</span>
                  <ArrowRight className="w-3 h-3" />
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Course Categories Directory (A - F) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
                Academic & Skill Programs
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#102D55] mt-2">
                Educational Courses Across Six Divisions
              </h2>
              <p className="text-base text-[#252525]/80 mt-3 leading-relaxed">
                From early childhood classrooms to practical vocational, computer,
                diploma, and paramedical training — choose the path suited to your
                goals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('courses', { courseCategory: 'all' })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#102D55]/20 hover:bg-[#F8F6EF] text-[#102D55] text-sm font-semibold transition-colors self-start whitespace-nowrap"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {COURSE_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#102D55]/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#F8F6EF]">
                  <ResilientImage
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-semibold text-[#8A6816]">{cat.code}</p>
                  <h3 className="font-serif text-xl font-semibold text-[#102D55] mt-1">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-[#252525]/80 mt-2 leading-relaxed flex-1">
                    {cat.description}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[#102D55]/10">
                    <button
                      type="button"
                      onClick={() =>
                        navigate('courses', { courseCategory: cat.key })
                      }
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#102D55] hover:text-[#8A6816] transition-colors"
                    >
                      <span>Explore {cat.shortLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us */}
      <WhyChooseSection />

      {/* 7. Facilities & Gallery Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
                Campus Infrastructure & Life
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#102D55] mt-2">
                Learning Spaces & Campus Gallery
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('facilities')}
                className="px-4 py-2.5 rounded-lg border border-[#102D55]/20 hover:bg-[#F8F6EF] text-xs font-semibold text-[#102D55] transition-colors"
              >
                All Facilities
              </button>
              <button
                type="button"
                onClick={() => navigate('gallery')}
                className="px-4 py-2.5 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-xs font-semibold transition-colors"
              >
                Open Photo Gallery
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FACILITIES_ITEMS.slice(0, 3).map((fac) => (
              <div
                key={fac.title}
                className="rounded-2xl overflow-hidden border border-[#102D55]/10 bg-[#F8F6EF]"
              >
                <div className="aspect-[4/3]">
                  <ResilientImage
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-serif text-lg font-semibold text-[#102D55]">
                    {fac.title}
                  </h3>
                  <p className="text-sm text-[#252525]/75 mt-1.5 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {gallery.length > 0 && (
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate('gallery')}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-[#102D55]/10 text-left"
                >
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3B]/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 right-3 text-xs font-medium text-white truncate">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 8. Final 2026 Admission CTA Banner */}
      <section className="py-16 lg:py-20 bg-[#F8F6EF] border-t border-[#102D55]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#102D55] text-white p-8 sm:p-12 lg:p-14 border border-[#D5A83D]/40 shadow-xl text-center space-y-6">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D5A83D]">
              <Sparkles className="w-4 h-4" />
              <span>{settings.admissionHeading}</span>
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              {settings.admissionSubheading}
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              {settings.admissionBannerNote}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => navigate('admissions')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] text-sm font-bold transition-colors"
              >
                Fill Online Admission Form
              </button>
              <a
                href={buildWhatsAppUrl(settings.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Admission Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
