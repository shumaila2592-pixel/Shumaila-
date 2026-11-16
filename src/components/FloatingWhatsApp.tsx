import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useInstitution } from '../context/InstitutionContext';
import { buildWhatsAppUrl } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { settings, currentRoute } = useInstitution();

  if (currentRoute === 'admin') return null;

  return (
    <a
      href={buildWhatsAppUrl(settings.whatsappNumber)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp for 2026 Admission Details"
      title="WhatsApp Enquiry — Zulekha Begam Educational Trust"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-[#1E8E4E] hover:bg-[#17743F] text-white shadow-lg border border-white/20 transition-transform duration-150 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5A83D]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
        WhatsApp Enquiry
      </span>
    </a>
  );
};
