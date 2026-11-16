import React from 'react';
import { ArrowRight, BookOpenCheck, CheckCircle2 } from 'lucide-react';
import { STOCK_MEDIA } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { ResilientImage } from '../components/ResilientImage';

const ACADEMIC_STAGES = [
  {
    code: '01',
    title: 'Kindergarten Stage (Nursery, Jr. KG & Sr. KG)',
    summary:
      'Focuses on joyful school readiness, phonics awareness, pre-writing coordination, storytelling, rhymes, shapes, numbers, and social comfort.',
    highlights: [
      'Play-way & Montessori-inspired sensory tables',
      'Gentle English listening & spoken familiarity',
      'Drawing, craft, and motor skill exercises',
    ],
  },
  {
    code: '02',
    title: 'Foundational Primary (1st & 2nd Standard)',
    summary:
      'Builds structured English reading fluency, handwriting neatness, foundational arithmetic, and curiosity about everyday science and surroundings.',
    highlights: [
      'Guided reading comprehension & vocabulary building',
      'Concrete number operations & mental math practice',
      'Classroom participation & good study habits',
    ],
  },
  {
    code: '03',
    title: 'Developing Primary (3rd to 5th Standard)',
    summary:
      'Strengthens analytical thinking, written expression, mathematics, environmental studies, and introductory computer education.',
    highlights: [
      'Structured English grammar, composition & presentations',
      'Basic Computer Education in supervised sessions',
      'Regular revision, feedback & parent communication',
    ],
  },
  {
    code: '04',
    title: 'Skill & Career Education Divisions',
    summary:
      'Beyond school education, Zulekha Begam Educational Trust offers dedicated practical programs in ITI Technical Trades, Diploma, Computer Software, and Paramedical fields.',
    highlights: [
      'Hands-on computer & technical workshop practice',
      'Career guidance and interview readiness support',
      'Flexible learning tracks for youth & working learners',
    ],
  },
];

export const AcademicsPage: React.FC = () => {
  const { navigate } = useInstitution();

  return (
    <div className="bg-white">
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
            Academic Structure & Pedagogy
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2 max-w-3xl">
            Structured Academics Built on Clarity & Practice
          </h1>
          <p className="text-base text-white/85 mt-4 max-w-2xl leading-relaxed">
            Every academic stage is designed so students grasp concepts clearly,
            practice regularly in supportive classrooms, and build lasting
            confidence.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            {ACADEMIC_STAGES.map((stage) => (
              <div
                key={stage.code}
                className="p-6 sm:p-8 rounded-2xl border border-[#102D55]/10 bg-[#F8F6EF]/60 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl font-bold text-[#D5A83D] tabular-nums">
                    {stage.code}.
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#102D55]">
                    {stage.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-[#252525]/85 leading-relaxed">
                  {stage.summary}
                </p>
                <ul className="space-y-2 pt-1">
                  {stage.highlights.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-2.5 text-sm text-[#252525]/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#8A6816] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#102D55]/10">
              <div className="aspect-[4/3]">
                <ResilientImage
                  src={STOCK_MEDIA.heroClassroom}
                  alt="Classroom academic instruction"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-white space-y-3">
                <div className="flex items-center gap-2 text-[#102D55] font-semibold text-sm">
                  <BookOpenCheck className="w-4 h-4 text-[#8A6816]" />
                  <span>Balanced Classroom Attention</span>
                </div>
                <p className="text-sm text-[#252525]/80 leading-relaxed">
                  Teachers guide students step-by-step with regular notebook
                  review, spoken English encouragement, and individual doubt
                  resolution.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-[#102D55] text-white p-7 space-y-4">
              <h3 className="font-serif text-2xl font-semibold">
                Explore Programs & Apply
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Browse our complete catalog of school grades and career training
                programs or submit an online 2026 enquiry.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('courses')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] text-xs font-bold transition-colors"
                >
                  <span>Browse Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('admissions')}
                  className="flex-1 px-4 py-3 rounded-lg border border-white/30 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
                >
                  Admissions 2026
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
