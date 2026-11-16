import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TRUST_LOGO_PATH } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import type { PageRoute } from '../types/institution';

const NAV_ITEMS: { route: PageRoute; label: string }[] = [
  { route: 'home', label: 'Home' },
  { route: 'about', label: 'About Us' },
  { route: 'school', label: 'Our School' },
  { route: 'academics', label: 'Academics' },
  { route: 'courses', label: 'Courses' },
  { route: 'facilities', label: 'Facilities' },
  { route: 'gallery', label: 'Gallery' },
  { route: 'admissions', label: 'Admissions' },
  { route: 'contact', label: 'Contact Us' },
];

export const SiteHeader: React.FC = () => {
  const { settings, currentRoute, navigate } = useInstitution();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (route: PageRoute) => {
    setMobileMenuOpen(false);
    navigate(route);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#102D55]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-[76px] flex items-center justify-between gap-4 xl:gap-6">
        {/* Left: Official Trust Logo + Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5A83D] rounded-lg"
        >
          <img
            src={TRUST_LOGO_PATH}
            alt="Zulekha Begam Educational Trust Official Logo"
            className="h-10 w-10 lg:h-12 lg:w-12 object-contain shrink-0"
          />
          <div className="min-w-0">
            <span className="block font-serif text-sm sm:text-base lg:text-[17px] font-bold tracking-tight text-[#102D55] whitespace-nowrap">
              {settings.trustName}
            </span>
            <span className="block text-[11px] font-semibold tracking-wide text-[#8A6816] whitespace-nowrap">
              {settings.shortName}
            </span>
          </div>
        </button>

        {/* Center/Right Navigation Links (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-5 text-[13.5px] font-medium text-[#252525]"
        >
          {NAV_ITEMS.map((item) => {
            const active = currentRoute === item.route;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => handleNav(item.route)}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D5A83D] ${
                  active
                    ? 'text-[#102D55] font-semibold'
                    : 'text-[#252525]/80 hover:text-[#102D55]'
                }`}
              >
                {item.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#D5A83D] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Primary Action + Mobile Hamburger */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('admissions')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 text-xs lg:text-[13px] font-semibold text-[#102D55] bg-[#D5A83D] hover:bg-[#C6982D] rounded-lg shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#102D55]"
          >
            Apply for Admission
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="xl:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#102D55]/15 text-[#102D55] hover:bg-[#F8F6EF] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#102D55]/10 bg-white">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const active = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  type="button"
                  onClick={() => handleNav(item.route)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                    active
                      ? 'bg-[#102D55] text-white font-semibold'
                      : 'text-[#252525] hover:bg-[#F8F6EF]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="text-[11px] text-[#D5A83D] font-semibold">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => handleNav('admissions')}
              className="sm:hidden mt-2 w-full py-3 px-4 rounded-lg bg-[#D5A83D] text-[#102D55] font-semibold text-sm text-center"
            >
              Apply for Admission
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
