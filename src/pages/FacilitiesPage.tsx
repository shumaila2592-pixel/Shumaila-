import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FACILITIES_ITEMS } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { ResilientImage } from '../components/ResilientImage';
import { WhyChooseSection } from '../components/WhyChooseSection';

export const FacilitiesPage: React.FC = () => {
  const { navigate } = useInstitution();

  return (
    <div className="bg-white">
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
            Campus Environment
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2 max-w-3xl">
            Facilities Designed for Focused, Practical Learning
          </h1>
          <p className="text-base text-white/85 mt-4 max-w-2xl leading-relaxed">
            From sunlit classrooms for young children to dedicated computer
            workstations and technical training spaces, every area supports safe,
            hands-on growth.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES_ITEMS.map((facility, idx) => (
              <article
                key={facility.title}
                className="flex flex-col rounded-2xl overflow-hidden border border-[#102D55]/10 bg-white shadow-sm"
              >
                <div className="aspect-[4/3] bg-[#F8F6EF]">
                  <ResilientImage
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-semibold text-[#8A6816] tabular-nums">
                    0{idx + 1}. Campus Facility
                  </p>
                  <h2 className="font-serif text-xl font-semibold text-[#102D55] mt-1">
                    {facility.title}
                  </h2>
                  <p className="text-sm text-[#252525]/80 mt-2.5 leading-relaxed flex-1">
                    {facility.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-sm font-semibold transition-colors"
            >
              <span>Schedule a Campus Visit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <WhyChooseSection />
    </div>
  );
};
