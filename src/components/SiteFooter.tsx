import React from 'react';
import {
  Facebook,
  Instagram,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react';
import { TRUST_LOGO_PATH } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { buildTelUrl, buildWhatsAppUrl } from '../utils/whatsapp';

export const SiteFooter: React.FC = () => {
  const { settings, navigate } = useInstitution();

  const hasSocials = Boolean(
    settings.facebookUrl || settings.instagramUrl || settings.youtubeUrl
  );

  return (
    <footer className="bg-[#0A1E3B] text-white border-t border-[#D5A83D]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="bg-white rounded-full p-1 shrink-0">
                <img
                  src={TRUST_LOGO_PATH}
                  alt="Zulekha Begam Educational Trust Seal"
                  className="h-12 w-12 object-contain"
                />
              </div>
              <div>
                <h2 className="font-serif text-lg font-semibold text-white leading-snug">
                  {settings.trustName}
                </h2>
                <p className="text-xs font-medium text-[#D5A83D] mt-0.5">
                  {settings.schoolName}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#E8CA7A] font-medium">
              {settings.tagline}
            </p>

            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              Dedicated to accessible school education, practical technical training,
              computer literacy, and career-oriented learning in Bhiwandi,
              Maharashtra.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={buildWhatsAppUrl(settings.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-xs font-semibold text-white hover:bg-[#25D366]/25 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Enquiry</span>
              </a>

              {hasSocials && (
                <div className="flex items-center gap-2">
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/80 hover:text-[#D5A83D] hover:border-[#D5A83D]/50 transition-colors"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/80 hover:text-[#D5A83D] hover:border-[#D5A83D]/50 transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {settings.youtubeUrl && (
                    <a
                      href={settings.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/80 hover:text-[#D5A83D] hover:border-[#D5A83D]/50 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D5A83D]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('home')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('school')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  Our School (ZBEM)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('facilities')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  Facilities
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('gallery')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('admissions')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  Admissions 2026
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="hover:text-[#D5A83D] transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* School & Courses */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D5A83D]">
              School & Courses
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    navigate('courses', { courseCategory: 'kindergarten' })
                  }
                  className="hover:text-[#D5A83D] transition-colors text-left"
                >
                  Kindergarten (Nursery, Jr. KG, Sr. KG)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('courses', { courseCategory: 'school' })}
                  className="hover:text-[#D5A83D] transition-colors text-left"
                >
                  Primary School (1st to 5th Standard)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('courses', { courseCategory: 'iti' })}
                  className="hover:text-[#D5A83D] transition-colors text-left"
                >
                  ITI & Technical (Electrician, RAC, Plumbing)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('courses', { courseCategory: 'diploma' })}
                  className="hover:text-[#D5A83D] transition-colors text-left"
                >
                  Diploma Courses
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    navigate('courses', { courseCategory: 'computer' })
                  }
                  className="hover:text-[#D5A83D] transition-colors text-left"
                >
                  Computer Courses (MS Office, Tally, CorelDRAW)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    navigate('courses', { courseCategory: 'paramedical' })
                  }
                  className="hover:text-[#D5A83D] transition-colors text-left"
                >
                  Paramedical (DMLT, Physiotherapy, Nutrition)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#D5A83D]">
              Contact Information
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D5A83D] shrink-0 mt-1" />
                <p className="leading-relaxed">{settings.address}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#D5A83D] shrink-0 mt-1" />
                <div className="space-y-1 tabular-nums">
                  <a
                    href={buildTelUrl(settings.phonePrimary)}
                    className="block hover:text-[#D5A83D] transition-colors"
                  >
                    {settings.phonePrimary}
                  </a>
                  {settings.phoneSecondary && (
                    <a
                      href={buildTelUrl(settings.phoneSecondary)}
                      className="block hover:text-[#D5A83D] transition-colors"
                    >
                      {settings.phoneSecondary}
                    </a>
                  )}
                </div>
              </div>
              {settings.officialEmail && (
                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#D5A83D] shrink-0 mt-1" />
                  <a
                    href={`mailto:${settings.officialEmail}`}
                    className="hover:text-[#D5A83D] transition-colors break-all"
                  >
                    {settings.officialEmail}
                  </a>
                </div>
              )}
              <p className="text-xs text-white/60 pt-1">{settings.businessHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/65">
          <p>© 2026 Zulekha Begam Educational Trust. All Rights Reserved.</p>
          <button
            type="button"
            onClick={() => navigate('admin')}
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-[#D5A83D] transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Administrator Portal</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
