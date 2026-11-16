import React, { useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COURSE_CATEGORIES } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { ResilientImage } from './ResilientImage';

export const CourseModal: React.FC = () => {
  const {
    selectedCourseModal,
    setSelectedCourseModal,
    openEnquiryFor,
    settings,
  } = useInstitution();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCourseModal(null);
      }
    };
    if (selectedCourseModal) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCourseModal, setSelectedCourseModal]);

  if (!selectedCourseModal) return null;

  const categoryInfo = COURSE_CATEGORIES.find(
    (c) => c.key === selectedCourseModal.category
  );

  const enquiryType =
    selectedCourseModal.category === 'kindergarten' ||
    selectedCourseModal.category === 'school'
      ? 'school_admission'
      : 'course_enquiry';

  const hasVerifiedMeta = Boolean(
    selectedCourseModal.eligibility ||
      selectedCourseModal.duration ||
      selectedCourseModal.fees ||
      selectedCourseModal.verifiedDetails
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1E3B]/70 backdrop-blur-xs"
      onClick={() => setSelectedCourseModal(null)}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#102D55]/10 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-52 sm:h-60 bg-[#F8F6EF] shrink-0">
          <ResilientImage
            src={selectedCourseModal.imageUrl}
            alt={selectedCourseModal.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3B]/80 via-[#0A1E3B]/25 to-transparent" />
          <button
            type="button"
            onClick={() => setSelectedCourseModal(null)}
            aria-label="Close course details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 text-[#102D55] flex items-center justify-center hover:bg-white transition-colors shadow"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <p className="text-xs font-medium text-[#E8CA7A]">
              {categoryInfo ? `${categoryInfo.code} · ${categoryInfo.label}` : 'Course'}
            </p>
            <h2
              id="course-modal-title"
              className="font-serif text-2xl sm:text-3xl font-semibold mt-1"
            >
              {selectedCourseModal.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#102D55]/70 mb-2">
              Program Overview
            </h3>
            <p className="text-[15px] text-[#252525] leading-relaxed">
              {selectedCourseModal.shortDescription}
            </p>
          </div>

          {hasVerifiedMeta ? (
            <div className="border-t border-[#102D55]/10 pt-5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#102D55]/70">
                Verified Course Details
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedCourseModal.eligibility && (
                  <div className="p-3.5 rounded-xl bg-[#F8F6EF]">
                    <dt className="text-xs text-[#252525]/65">Eligibility</dt>
                    <dd className="text-sm font-semibold text-[#102D55] mt-1">
                      {selectedCourseModal.eligibility}
                    </dd>
                  </div>
                )}
                {selectedCourseModal.duration && (
                  <div className="p-3.5 rounded-xl bg-[#F8F6EF]">
                    <dt className="text-xs text-[#252525]/65">Duration</dt>
                    <dd className="text-sm font-semibold text-[#102D55] mt-1">
                      {selectedCourseModal.duration}
                    </dd>
                  </div>
                )}
                {selectedCourseModal.fees && (
                  <div className="p-3.5 rounded-xl bg-[#F8F6EF]">
                    <dt className="text-xs text-[#252525]/65">Fee Information</dt>
                    <dd className="text-sm font-semibold text-[#102D55] mt-1">
                      {selectedCourseModal.fees}
                    </dd>
                  </div>
                )}
              </dl>
              {selectedCourseModal.verifiedDetails && (
                <p className="text-sm text-[#252525]/85 leading-relaxed">
                  {selectedCourseModal.verifiedDetails}
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#F8F6EF] border border-[#102D55]/10 text-sm text-[#252525]/85 leading-relaxed">
              Verified eligibility, batch schedules, duration, and transparent fee
              details are shared directly by our Bhiwandi admission desk upon enquiry.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                const title = selectedCourseModal.title;
                setSelectedCourseModal(null);
                openEnquiryFor(title, enquiryType);
              }}
              className="flex-1 py-3 px-5 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-sm font-semibold transition-colors"
            >
              Enquiry Now
            </button>
            <a
              href={buildWhatsAppUrl(
                settings.whatsappNumber,
                `Hello, I would like to enquire about "${selectedCourseModal.title}" at Zulekha Begam Educational Trust for 2026.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg border border-[#102D55]/20 hover:bg-[#F8F6EF] text-[#102D55] text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#1E8E4E]" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
