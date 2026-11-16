import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useInstitution } from '../context/InstitutionContext';
import { isFirebaseConfigured } from '../lib/firebase';
import { submitEnquiry } from '../services/institutionService';
import type { EnquiryType } from '../types/institution';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface AdmissionFormProps {
  defaultType?: EnquiryType;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({
  defaultType,
}) => {
  const {
    courses,
    settings,
    preselectedSubject,
    preselectedEnquiryType,
  } = useInstitution();

  const [enquiryType, setEnquiryType] = useState<EnquiryType>(
    defaultType || preselectedEnquiryType || 'school_admission'
  );
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [applyingFor, setApplyingFor] = useState(
    preselectedSubject || 'Nursery'
  );
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [previousSchool, setPreviousSchool] = useState('');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedSubject) {
      setApplyingFor(preselectedSubject);
      setEnquiryType(preselectedEnquiryType);
    }
  }, [preselectedSubject, preselectedEnquiryType]);

  const schoolOptions = courses.filter(
    (c) => c.isActive && (c.category === 'kindergarten' || c.category === 'school')
  );
  const careerCourseOptions = courses.filter(
    (c) => c.isActive && c.category !== 'kindergarten' && c.category !== 'school'
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!isFirebaseConfigured) {
      setErrorMsg(
        'Admission database is currently not connected. Please contact our office directly on 9322444499 or via WhatsApp.'
      );
      return;
    }

    const cleanStudent = studentName.trim();
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    if (cleanStudent.length < 2) {
      setErrorMsg('Please enter the full student name (at least 2 characters).');
      return;
    }
    if (cleanMobile.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address or leave the field blank.');
      return;
    }

    setSubmitting(true);
    try {
      const refId = await submitEnquiry({
        enquiryType,
        studentName: cleanStudent,
        parentName: parentName.trim(),
        dateOfBirth: dateOfBirth.trim(),
        applyingFor: applyingFor.trim() || 'General Admission',
        mobileNumber: mobileNumber.trim(),
        email: email.trim(),
        address: address.trim(),
        previousSchool: previousSchool.trim(),
        message: message.trim(),
      });
      setSubmittedRefId(refId);
    } catch (err) {
      const text =
        err instanceof Error
          ? err.message
          : 'Failed to submit enquiry. Please verify your connection or call 9322444499.';
      setErrorMsg(
        text.includes('PERMISSION_DENIED') || text.includes('Missing or insufficient')
          ? 'Unable to save enquiry due to server permission rules. Please call 9322444499.'
          : text
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedRefId(null);
    setStudentName('');
    setParentName('');
    setDateOfBirth('');
    setMobileNumber('');
    setEmail('');
    setAddress('');
    setPreviousSchool('');
    setMessage('');
    setErrorMsg(null);
  };

  if (submittedRefId) {
    return (
      <div className="bg-white rounded-2xl border border-[#102D55]/15 p-8 sm:p-10 shadow-sm space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h3 className="font-serif text-2xl font-semibold text-[#102D55]">
            Admission Enquiry Submitted Successfully
          </h3>
          <p className="text-sm text-[#252525]/80 leading-relaxed">
            Thank you for contacting {settings.trustName}. Your enquiry for{' '}
            <span className="font-semibold text-[#102D55]">{applyingFor}</span> has
            been recorded in our admission register. Our office team will contact
            you on <span className="font-semibold tabular-nums">{mobileNumber}</span>.
          </p>
          <p className="text-xs text-[#252525]/65 font-mono tabular-nums pt-1">
            Reference ID: {submittedRefId}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a
            href={buildWhatsAppUrl(
              settings.whatsappNumber,
              `Hello, I just submitted an admission enquiry (Ref: ${submittedRefId}) for ${studentName} applying for ${applyingFor} for 2026.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1E8E4E] hover:bg-[#17743F] text-white text-sm font-semibold transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Follow Up on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={resetForm}
            className="px-5 py-3 rounded-lg border border-[#102D55]/20 hover:bg-[#F8F6EF] text-[#102D55] text-sm font-semibold transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#102D55]/15 p-6 sm:p-8 lg:p-10 shadow-sm space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#102D55]/10 pb-5">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#102D55]">
            Online Admission Enquiry Form
          </h3>
          <p className="text-sm text-[#252525]/70 mt-1">
            Complete the details below and our admission desk will reach out.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-lg bg-[#F8F6EF] border border-[#102D55]/10 self-start">
          <button
            type="button"
            onClick={() => setEnquiryType('school_admission')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              enquiryType === 'school_admission'
                ? 'bg-[#102D55] text-white'
                : 'text-[#102D55]/75 hover:text-[#102D55]'
            }`}
          >
            ZBEM School
          </button>
          <button
            type="button"
            onClick={() => setEnquiryType('course_enquiry')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              enquiryType === 'course_enquiry'
                ? 'bg-[#102D55] text-white'
                : 'text-[#102D55]/75 hover:text-[#102D55]'
            }`}
          >
            Skill & Career Courses
          </button>
        </div>
      </div>

      {!isFirebaseConfigured && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            Backend database is not yet connected. Submissions require an active
            database connection; please reach us directly at{' '}
            <span className="font-semibold">{settings.phonePrimary}</span>.
          </div>
        </div>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-sm"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="adm-student-name"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Student Name *
          </label>
          <input
            id="adm-student-name"
            type="text"
            required
            maxLength={120}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student's full name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>

        <div>
          <label
            htmlFor="adm-parent-name"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Parent / Guardian Name
          </label>
          <input
            id="adm-parent-name"
            type="text"
            maxLength={120}
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="Father / Mother / Guardian name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>

        <div>
          <label
            htmlFor="adm-dob"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Date of Birth
          </label>
          <input
            id="adm-dob"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>

        <div>
          <label
            htmlFor="adm-class"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Class / Course Applying For *
          </label>
          <select
            id="adm-class"
            required
            value={applyingFor}
            onChange={(e) => setApplyingFor(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] bg-white focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          >
            <optgroup label="ZBEM School (Kindergarten & Primary)">
              {schoolOptions.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </optgroup>
            <optgroup label="Technical, Diploma, Computer & Paramedical Courses">
              {careerCourseOptions.map((c) => (
                <option key={c.id} value={c.title}>
                  {c.title}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label
            htmlFor="adm-mobile"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Parent / Student Mobile Number *
          </label>
          <input
            id="adm-mobile"
            type="tel"
            required
            maxLength={20}
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="e.g. 9322444499"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] tabular-nums focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>

        <div>
          <label
            htmlFor="adm-email"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Email Address
          </label>
          <input
            id="adm-email"
            type="email"
            maxLength={140}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Optional email address"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>

        <div>
          <label
            htmlFor="adm-prev-school"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Previous School (optional)
          </label>
          <input
            id="adm-prev-school"
            type="text"
            maxLength={160}
            value={previousSchool}
            onChange={(e) => setPreviousSchool(e.target.value)}
            placeholder="Name of previous school, if applicable"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>

        <div>
          <label
            htmlFor="adm-address"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Residential Address
          </label>
          <input
            id="adm-address"
            type="text"
            maxLength={350}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Area / Street, Bhiwandi"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="adm-message"
          className="block text-xs font-semibold text-[#102D55] mb-1.5"
        >
          Message / Questions
        </label>
        <textarea
          id="adm-message"
          rows={3}
          maxLength={1200}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any specific question regarding admissions, timings, or courses..."
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm text-[#252525] focus:outline-none focus:border-[#102D55] focus:ring-2 focus:ring-[#D5A83D]/30"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] disabled:opacity-60 text-[#102D55] font-semibold text-sm transition-colors shadow-sm"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Enquiry</span>
            </>
          )}
        </button>

        <a
          href={buildWhatsAppUrl(
            settings.whatsappNumber,
            `Hello, I would like to enquire about admission for ${applyingFor} (2026) at Zulekha Begam Educational Trust.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border border-[#102D55]/20 hover:bg-[#F8F6EF] text-[#102D55] font-semibold text-sm transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-[#1E8E4E]" />
          <span>WhatsApp Enquiry</span>
        </a>
      </div>
    </form>
  );
};
