import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { COURSE_CATEGORIES } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import type { CourseItem } from '../types/institution';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

interface CourseCardProps {
  course: CourseItem;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { setSelectedCourseModal, openEnquiryFor, settings } = useInstitution();
  const categoryInfo = COURSE_CATEGORIES.find((c) => c.key === course.category);

  const enquiryType =
    course.category === 'kindergarten' || course.category === 'school'
      ? 'school_admission'
      : 'course_enquiry';

  return (
    <article className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#102D55]/10 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="aspect-[4/3] overflow-hidden bg-[#F8F6EF]">
        <ResilientImage
          src={course.imageUrl}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex-1 flex flex-col p-6">
        <p className="text-xs font-medium text-[#8A6816]">
          {categoryInfo ? `${categoryInfo.code} · ${categoryInfo.label}` : 'Program'}
        </p>

        <h3 className="font-serif text-xl font-semibold text-[#102D55] mt-1.5 leading-snug">
          {course.title}
        </h3>

        <p className="text-sm text-[#252525]/80 leading-relaxed mt-2.5 flex-1">
          {course.shortDescription}
        </p>

        {(course.duration || course.eligibility) && (
          <div className="mt-4 pt-3 border-t border-[#102D55]/10 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#252525]/70">
            {course.duration && <span>Duration: {course.duration}</span>}
            {course.eligibility && <span>Eligibility: {course.eligibility}</span>}
          </div>
        )}

        <div className="mt-5 pt-4 border-t border-[#102D55]/10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCourseModal(course)}
            className="px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-[#102D55] hover:bg-[#F8F6EF] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
          >
            Learn More
          </button>

          <button
            type="button"
            onClick={() => openEnquiryFor(course.title, enquiryType)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-xs font-semibold transition-colors whitespace-nowrap"
          >
            <span>Enquiry Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={buildWhatsAppUrl(
              settings.whatsappNumber,
              `Hello, I would like to enquire about ${course.title} at Zulekha Begam Educational Trust for 2026.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp enquiry for ${course.title}`}
            title={`WhatsApp enquiry for ${course.title}`}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-[#1E8E4E]/30 text-[#1E8E4E] hover:bg-[#1E8E4E]/10 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
};
