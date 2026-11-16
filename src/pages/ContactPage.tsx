import React from 'react';
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { useInstitution } from '../context/InstitutionContext';
import { ContactForm } from '../components/ContactForm';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const { settings } = useInstitution();
  const mapQuery = encodeURIComponent(settings.address);

  return (
    <div className="bg-[#F8F6EF]">
      {/* Header */}
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
            Visit or Reach Us
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2">
            Contact {settings.trustName}
          </h1>
          <p className="text-base text-white/85 mt-4 max-w-2xl leading-relaxed">
            Reach our Bhiwandi office for school admissions, course counselling,
            campus visits, and general enquiries.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details + Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#102D55]/10 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#102D55]">
                  {settings.trustName}
                </h2>
                <p className="text-xs font-medium text-[#8A6816] mt-0.5">
                  {settings.schoolName} ({settings.shortName})
                </p>
              </div>

              <div className="space-y-4 text-sm text-[#252525]/85">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8A6816] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#102D55]">Campus Address</p>
                    <p className="mt-0.5 leading-relaxed">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#8A6816] shrink-0 mt-0.5" />
                  <div className="space-y-2 w-full">
                    <p className="font-semibold text-[#102D55]">
                      Contact Numbers
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={buildTelUrl(settings.phonePrimary)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-xs font-semibold tabular-nums transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call {settings.phonePrimary}</span>
                      </a>
                      {settings.phoneSecondary && (
                        <a
                          href={buildTelUrl(settings.phoneSecondary)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#102D55]/20 hover:bg-[#F8F6EF] text-[#102D55] text-xs font-semibold tabular-nums transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call {settings.phoneSecondary}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#8A6816] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#102D55]">
                      Office & Admission Hours
                    </p>
                    <p className="mt-0.5">{settings.businessHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#8A6816] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#102D55]">
                      Official Email
                    </p>
                    {settings.officialEmail ? (
                      <a
                        href={`mailto:${settings.officialEmail}`}
                        className="mt-0.5 text-[#102D55] hover:underline break-all block"
                      >
                        {settings.officialEmail}
                      </a>
                    ) : (
                      <p className="mt-0.5 text-xs text-[#252525]/70">
                        Official email address has not yet been published by the
                        administration. Please reach us by phone, WhatsApp, or
                        the contact form.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#102D55]/10">
                <a
                  href={buildWhatsAppUrl(settings.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#1E8E4E] hover:bg-[#17743F] text-white text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp ({settings.whatsappNumber})</span>
                </a>
              </div>
            </div>

            {/* Google Maps Location Section */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#102D55]/10 shadow-xs">
              <div className="p-4 border-b border-[#102D55]/10 flex items-center justify-between">
                <h3 className="font-serif text-lg font-semibold text-[#102D55]">
                  Campus Location Map
                </h3>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#102D55] hover:text-[#8A6816]"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="aspect-[16/10] bg-[#F8F6EF]">
                <iframe
                  title="Zulekha Begam Educational Trust Location Map"
                  src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};
