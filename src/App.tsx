/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { InstitutionProvider, useInstitution } from './context/InstitutionContext';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CourseModal } from './components/CourseModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SchoolPage } from './pages/SchoolPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { CoursesPage } from './pages/CoursesPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

const AppShell: React.FC = () => {
  const { currentRoute } = useInstitution();

  const renderPage = () => {
    switch (currentRoute) {
      case 'about':
        return <AboutPage />;
      case 'school':
        return <SchoolPage />;
      case 'academics':
        return <AcademicsPage />;
      case 'courses':
        return <CoursesPage />;
      case 'facilities':
        return <FacilitiesPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#252525]">
      <SiteHeader />
      <main className="flex-1">{renderPage()}</main>
      <SiteFooter />
      <FloatingWhatsApp />
      <CourseModal />
    </div>
  );
};

export default function App() {
  return (
    <InstitutionProvider>
      <AppShell />
    </InstitutionProvider>
  );
}
