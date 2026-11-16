export type PageRoute =
  | 'home'
  | 'about'
  | 'school'
  | 'academics'
  | 'courses'
  | 'facilities'
  | 'gallery'
  | 'admissions'
  | 'contact'
  | 'admin';

export type CourseCategoryKey =
  | 'kindergarten'
  | 'school'
  | 'iti'
  | 'diploma'
  | 'computer'
  | 'paramedical';

export type GalleryCategory =
  | 'School Activities'
  | 'Classroom Activities'
  | 'Kindergarten'
  | 'Computer Courses'
  | 'Technical Training'
  | 'Paramedical Courses'
  | 'Events & Celebrations';

export interface SiteSettings {
  trustName: string;
  schoolName: string;
  shortName: string;
  tagline: string;
  heroBadge: string;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  heroBannerUrl: string;
  admissionsOpen: boolean;
  admissionHeading: string;
  admissionSubheading: string;
  admissionBannerNote: string;
  aboutOverview: string;
  vision: string;
  mission: string;
  philosophy: string;
  commitment: string;
  futureGoals: string;
  address: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  officialEmail: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface CourseItem {
  id: string;
  title: string;
  category: CourseCategoryKey;
  shortDescription: string;
  imageUrl: string;
  eligibility?: string;
  duration?: string;
  fees?: string;
  verifiedDetails?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  caption?: string;
  imageUrl: string;
  displayOrder: number;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  body: string;
  isActive: boolean;
  createdAt?: string;
}

export type EnquiryType = 'school_admission' | 'course_enquiry' | 'general_contact';
export type EnquiryStatus = 'new' | 'reviewed' | 'contacted';

export interface EnquiryItem {
  id: string;
  enquiryType: EnquiryType;
  studentName: string;
  parentName?: string;
  dateOfBirth?: string;
  applyingFor: string;
  mobileNumber: string;
  email?: string;
  address?: string;
  previousSchool?: string;
  message?: string;
  status: EnquiryStatus;
  createdAt?: string;
}

export interface EnquiryPayload {
  enquiryType: EnquiryType;
  studentName: string;
  parentName?: string;
  dateOfBirth?: string;
  applyingFor: string;
  mobileNumber: string;
  email?: string;
  address?: string;
  previousSchool?: string;
  message?: string;
}
