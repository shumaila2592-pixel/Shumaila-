import React from 'react';
import {
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Phone,
  Wrench,
} from 'lucide-react';
import { ADMISSION_POSTER_PATH } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { AdmissionForm } from '../components/AdmissionForm';
import { ResilientImage } from '../components/ResilientImage';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/whatsapp';

export const AdmissionsPage: React.FC = () => {
  const { settings, openEnquiryFor } = useInstitution();

  return (
    <div className="bg-[#F8F6EF]">
      {/* Hero Banner */}
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[#D5A83D]">
              Zulekha Begam Educational Trust · {settings.shortName}
            </p>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              {settings.admissionHeading || 'ADMISSIONS OPEN 2026'}
            </h1>
            <p className="font-serif text-xl sm:text-2xl text-[#E8CA7A]">
              {settings.admissionSubheading ||
                'Give Your Child the Right Start for a Bright Future!'}
            </p>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              {settings.admissionBannerNote}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: School + Course Admissions Summary & Official Poster */}
          <div className="lg:col-span-5 space-y-6">
            {/* School Admissions Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#102D55]/10 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#102D55] text-[#D5A83D] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                    School Admissions 2026
                  </h2>
                  <p className="text-xs text-[#252525]/70">
                    {settings.schoolName}
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-[#252525]/85 pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A6816] shrink-0 mt-0.5" />
                  <span>
                    <strong>Kindergarten:</strong> Nursery, Junior KG & Senior KG
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A6816] shrink-0 mt-0.5" />
                  <span>
                    <strong>Primary School:</strong> Standard 1 to Standard 5
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A6816] shrink-0 mt-0.5" />
                  <span>
                    <strong>No Donation Policy:</strong> Transparent & accessible
                    admissions
                  </span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => openEnquiryFor('Nursery', 'school_admission')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#F8F6EF] hover:bg-[#EFECE1] text-[#102D55] text-xs font-semibold border border-[#102D55]/15 transition-colors"
              >
                Select School Admission in Form
              </button>
            </div>

            {/* Separate Technical, Computer & Paramedical Course Enquiries Section */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#102D55]/10 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#102D55] text-[#D5A83D] flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                    Technical, Computer & Paramedical Enquiries
                  </h2>
                  <p className="text-xs text-[#252525]/70">
                    Career & Skill Training Divisions
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-[#252525]/85">
                <li>
                  <strong>ITI & Technical:</strong> Electrician, RAC, Plumbing,
                  Motor Mechanic
                </li>
                <li>
                  <strong>Diploma Courses:</strong> Engineering & Non-Engineering
                  tracks
                </li>
                <li>
                  <strong>Computer Courses:</strong> MS Office, Tally, Graphic
                  Designing, CorelDRAW, Digital Marketing, Language Practice,
                  English Typing
                </li>
                <li>
                  <strong>Paramedical:</strong> DMLT, Physiotherapy, Diet &
                  Nutrition, Acupuncture Therapy
                </li>
              </ul>

              <button
                type="button"
                onClick={() => openEnquiryFor('MS Office', 'course_enquiry')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#F8F6EF] hover:bg-[#EFECE1] text-[#102D55] text-xs font-semibold border border-[#102D55]/15 transition-colors"
              >
                Select Career Course Enquiry in Form
              </button>
            </div>

            {/* Official 2026 Poster Reference + Direct Call/WhatsApp */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#102D55]/10 shadow-xs">
              <div className="p-4 border-b border-[#102D55]/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#102D55]">
                  Official 2026 Admission Notice
                </span>
                <span className="text-xs text-[#8A6816] font-medium">
                  Limited Seats
                </span>
              </div>
              <div className="bg-[#F8F6EF] p-3">
                <ResilientImage
                  src={ADMISSION_POSTER_PATH}
                  alt="Zulekha Begam Educational Trust 2026 Admission Poster"
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
              <div className="p-4 flex flex-wrap gap-2">
                <a
                  href={buildTelUrl(settings.phonePrimary)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#102D55] text-white text-xs font-semibold tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{settings.phonePrimary}</span>
                </a>
                <a
                  href={buildWhatsAppUrl(settings.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#1E8E4E] text-white text-xs font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Live Admission Enquiry Form */}
          <div className="lg:col-span-7">
            <AdmissionForm />
          </div>
        </div>
      </section>
    </div>
  );
};
