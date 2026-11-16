import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { isFirebaseConfigured } from '../lib/firebase';
import { submitEnquiry } from '../services/institutionService';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!isFirebaseConfigured) {
      setErrorMsg(
        'Database connection is not active. Please call 9322444499 or 9322977776.'
      );
      return;
    }

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number.');
      return;
    }

    setSubmitting(true);
    try {
      const id = await submitEnquiry({
        enquiryType: 'general_contact',
        studentName: name.trim(),
        applyingFor: subject.trim() || 'General Enquiry',
        mobileNumber: phone.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSubmittedId(id);
    } catch (err) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Unable to send your message right now. Please call 9322444499.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedId) {
    return (
      <div className="bg-white rounded-2xl border border-[#102D55]/15 p-8 shadow-sm space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-[#102D55]">
          Message Received
        </h3>
        <p className="text-sm text-[#252525]/80 leading-relaxed">
          Thank you for reaching out. Our office will follow up with you at{' '}
          <span className="font-semibold tabular-nums">{phone}</span>.
        </p>
        <p className="text-xs text-[#252525]/60 font-mono">Ref: {submittedId}</p>
        <button
          type="button"
          onClick={() => {
            setSubmittedId(null);
            setName('');
            setPhone('');
            setEmail('');
            setMessage('');
          }}
          className="px-4 py-2 rounded-lg border border-[#102D55]/20 text-xs font-semibold text-[#102D55] hover:bg-[#F8F6EF]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-[#102D55]/15 p-6 sm:p-8 shadow-sm space-y-5"
    >
      <div>
        <h3 className="font-serif text-2xl font-semibold text-[#102D55]">
          Send Us a Message
        </h3>
        <p className="text-sm text-[#252525]/70 mt-1">
          Have a question about school timings, courses, or campus visits?
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm focus:outline-none focus:border-[#102D55]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Mobile Number *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            maxLength={20}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm tabular-nums focus:outline-none focus:border-[#102D55]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            maxLength={140}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Optional"
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm focus:outline-none focus:border-[#102D55]"
          />
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold text-[#102D55] mb-1.5"
          >
            Topic
          </label>
          <select
            id="contact-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm bg-white focus:outline-none focus:border-[#102D55]"
          >
            <option value="General Enquiry">General Enquiry</option>
            <option value="School Admission (Kindergarten - 5th)">
              School Admission (Kindergarten – 5th)
            </option>
            <option value="ITI & Diploma Courses">ITI & Diploma Courses</option>
            <option value="Computer Courses">Computer Courses</option>
            <option value="Paramedical Courses">Paramedical Courses</option>
            <option value="Campus Visit Request">Campus Visit Request</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-msg"
          className="block text-xs font-semibold text-[#102D55] mb-1.5"
        >
          Message *
        </label>
        <textarea
          id="contact-msg"
          required
          rows={4}
          maxLength={1200}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we assist you?"
          className="w-full px-3.5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm focus:outline-none focus:border-[#102D55]"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
};
