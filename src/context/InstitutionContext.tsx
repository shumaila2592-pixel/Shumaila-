import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  isFirebaseConfigured,
} from '../lib/firebase';
import {
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_COURSES,
  DEFAULT_GALLERY,
  DEFAULT_SITE_SETTINGS,
} from '../data/defaultSiteData';
import {
  subscribeAnnouncements,
  subscribeCourses,
  subscribeGallery,
  subscribeSiteSettings,
} from '../services/institutionService';
import type {
  AnnouncementItem,
  CourseCategoryKey,
  CourseItem,
  EnquiryType,
  GalleryItem,
  PageRoute,
  SiteSettings,
} from '../types/institution';

const VALID_ROUTES: PageRoute[] = [
  'home',
  'about',
  'school',
  'academics',
  'courses',
  'facilities',
  'gallery',
  'admissions',
  'contact',
  'admin',
];

const ROUTE_META: Record<PageRoute, { title: string; description: string }> = {
  home: {
    title: 'Zulekha Begam Educational Trust | ZBEM School — Admissions Open 2026',
    description:
      'Building Strong Foundations, Creating Brighter Futures. Explore Zulekha Begum English Medium School (Nursery to 5th Std), ITI, Diploma, Computer & Paramedical courses in Bhiwandi.',
  },
  about: {
    title: 'About Us | Zulekha Begam Educational Trust',
    description:
      'Learn about the vision, mission, educational philosophy, and commitment of Zulekha Begam Educational Trust in Bhiwandi, Maharashtra.',
  },
  school: {
    title: 'Our School — ZBEM School | Zulekha Begam Educational Trust',
    description:
      'Zulekha Begum English Medium School (ZBEM School) offering Nursery, Junior KG, Senior KG, and Standard 1 to Standard 5 with activity-based learning.',
  },
  academics: {
    title: 'Academics & Pedagogy | ZBEM School — Zulekha Begam Educational Trust',
    description:
      'Discover our structured English medium curriculum, early childhood framework, computer literacy, and holistic student development.',
  },
  courses: {
    title: 'Educational & Vocational Courses | Zulekha Begam Educational Trust',
    description:
      'Explore Kindergarten, Primary School, ITI Technical, Diploma, Computer, and Paramedical courses offered by Zulekha Begam Educational Trust.',
  },
  facilities: {
    title: 'Campus Facilities | Zulekha Begam Educational Trust',
    description:
      'Explore spacious classrooms, computer workstations, practical workshops, learning resources, and our student-friendly environment in Bhiwandi.',
  },
  gallery: {
    title: 'Photo Gallery | Zulekha Begam Educational Trust',
    description:
      'View photographs of classroom activities, kindergarten learning, computer labs, technical workshops, and institutional events.',
  },
  admissions: {
    title: 'Admissions Open 2026 | Zulekha Begam Educational Trust & ZBEM School',
    description:
      'Apply online for 2026 admissions to Nursery–Senior KG, 1st–5th Standard, and ITI, Diploma, Computer & Paramedical courses.',
  },
  contact: {
    title: 'Contact Us | Zulekha Begam Educational Trust, Bhiwandi',
    description:
      'Visit Zulekha Begam Educational Trust at 105, Gani Compound, Opp. Rizwana Hotel, Bhiwandi, Maharashtra or call 9322444499 / 9322977776.',
  },
  admin: {
    title: 'Administrator Portal | Zulekha Begam Educational Trust',
    description: 'Secure content, courses, gallery, and admissions management dashboard.',
  },
};

function parseRouteFromLocation(): PageRoute {
  const pathSeg = window.location.pathname
    .replace(/^\/+|\/+$/g, '')
    .toLowerCase();
  if (VALID_ROUTES.includes(pathSeg as PageRoute)) {
    return pathSeg as PageRoute;
  }
  const hash = window.location.hash.replace('#', '').trim().toLowerCase();
  if (VALID_ROUTES.includes(hash as PageRoute)) {
    return hash as PageRoute;
  }
  return 'home';
}

interface InstitutionContextValue {
  settings: SiteSettings;
  courses: CourseItem[];
  gallery: GalleryItem[];
  announcements: AnnouncementItem[];
  dbSynced: {
    settings: boolean;
    courses: boolean;
    gallery: boolean;
    announcements: boolean;
  };
  currentRoute: PageRoute;
  navigate: (route: PageRoute, opts?: { courseCategory?: CourseCategoryKey | 'all' }) => void;
  courseFilter: CourseCategoryKey | 'all';
  setCourseFilter: (cat: CourseCategoryKey | 'all') => void;
  preselectedSubject: string;
  preselectedEnquiryType: EnquiryType;
  openEnquiryFor: (subject: string, type?: EnquiryType) => void;
  selectedCourseModal: CourseItem | null;
  setSelectedCourseModal: (course: CourseItem | null) => void;
  user: User | null;
  authReady: boolean;
  isAdmin: boolean;
  adminCheckLoading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const InstitutionContext = createContext<InstitutionContextValue | null>(null);

export const InstitutionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [courses, setCourses] = useState<CourseItem[]>(DEFAULT_COURSES);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [announcements, setAnnouncements] =
    useState<AnnouncementItem[]>(DEFAULT_ANNOUNCEMENTS);
  const [dbSynced, setDbSynced] = useState({
    settings: false,
    courses: false,
    gallery: false,
    announcements: false,
  });

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(
    parseRouteFromLocation
  );
  const [courseFilter, setCourseFilter] = useState<CourseCategoryKey | 'all'>('all');
  const [preselectedSubject, setPreselectedSubject] = useState<string>('');
  const [preselectedEnquiryType, setPreselectedEnquiryType] =
    useState<EnquiryType>('school_admission');
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseItem | null>(
    null
  );

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(!isFirebaseConfigured);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Public Firestore subscriptions
  useEffect(() => {
    const unsubSettings = subscribeSiteSettings((data, exists) => {
      setSettings(data);
      setDbSynced((prev) => ({ ...prev, settings: exists }));
    });
    const unsubCourses = subscribeCourses((data, exists) => {
      setCourses(data);
      setDbSynced((prev) => ({ ...prev, courses: exists }));
    });
    const unsubGallery = subscribeGallery((data, exists) => {
      setGallery(data);
      setDbSynced((prev) => ({ ...prev, gallery: exists }));
    });
    const unsubAnnouncements = subscribeAnnouncements((data, exists) => {
      setAnnouncements(data);
      setDbSynced((prev) => ({ ...prev, announcements: exists }));
    });

    return () => {
      unsubSettings();
      unsubCourses();
      unsubGallery();
      unsubAnnouncements();
    };
  }, []);

  // Auth listener & admin verification
  useEffect(() => {
    if (!auth) {
      setAuthReady(true);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthError(null);

      if (!firebaseUser) {
        setIsAdmin(false);
        setAuthReady(true);
        return;
      }

      setAdminCheckLoading(true);
      try {
        let verifiedAdmin = false;
        if (db) {
          const adminDoc = await getDoc(doc(db, 'admins', firebaseUser.uid));
          if (adminDoc.exists()) {
            verifiedAdmin = true;
          }
        }
        if (
          !verifiedAdmin &&
          firebaseUser.emailVerified &&
          firebaseUser.email === 'shumaila2592@gmail.com'
        ) {
          verifiedAdmin = true;
        }
        setIsAdmin(verifiedAdmin);
      } catch (err) {
        // Fallback check for verified bootstrapped institutional email when admins doc isn't created yet
        if (
          firebaseUser.emailVerified &&
          firebaseUser.email === 'shumaila2592@gmail.com'
        ) {
          setIsAdmin(true);
        } else {
          console.warn('Admin status check error:', err);
          setIsAdmin(false);
        }
      } finally {
        setAdminCheckLoading(false);
        setAuthReady(true);
      }
    });

    return () => unsub();
  }, []);

  // Sync browser path & hash navigation
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentRoute(parseRouteFromLocation());
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  // Update document title and SEO meta description per active page
  useEffect(() => {
    const meta = ROUTE_META[currentRoute] ?? ROUTE_META.home;
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
  }, [currentRoute]);

  const navigate = useCallback(
    (route: PageRoute, opts?: { courseCategory?: CourseCategoryKey | 'all' }) => {
      if (opts?.courseCategory) {
        setCourseFilter(opts.courseCategory);
      }
      setCurrentRoute(route);
      const targetPath = route === 'home' ? '/' : `/${route}`;
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState(null, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const openEnquiryFor = useCallback(
    (subject: string, type: EnquiryType = 'course_enquiry') => {
      setPreselectedSubject(subject);
      setPreselectedEnquiryType(type);
      navigate('admissions');
    },
    [navigate]
  );

  const signInWithGoogle = useCallback(async () => {
    if (!auth) {
      setAuthError('Firebase Authentication is not configured.');
      return;
    }
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Unable to complete sign-in.';
      if (msg.includes('auth/unauthorized-domain')) {
        setAuthError(
          `This domain (${window.location.hostname}) is not yet authorized in Firebase Authentication. Add it under Firebase Console → Authentication → Settings → Authorized domains.`
        );
      } else {
        setAuthError(msg);
      }
    }
  }, []);

  const logout = useCallback(async () => {
    if (!auth) return;
    await signOut(auth);
  }, []);

  const value = useMemo<InstitutionContextValue>(
    () => ({
      settings,
      courses,
      gallery,
      announcements,
      dbSynced,
      currentRoute,
      navigate,
      courseFilter,
      setCourseFilter,
      preselectedSubject,
      preselectedEnquiryType,
      openEnquiryFor,
      selectedCourseModal,
      setSelectedCourseModal,
      user,
      authReady,
      isAdmin,
      adminCheckLoading,
      authError,
      signInWithGoogle,
      logout,
    }),
    [
      settings,
      courses,
      gallery,
      announcements,
      dbSynced,
      currentRoute,
      navigate,
      courseFilter,
      preselectedSubject,
      preselectedEnquiryType,
      openEnquiryFor,
      selectedCourseModal,
      user,
      authReady,
      isAdmin,
      adminCheckLoading,
      authError,
      signInWithGoogle,
      logout,
    ]
  );

  return (
    <InstitutionContext.Provider value={value}>
      {children}
    </InstitutionContext.Provider>
  );
};

export function useInstitution(): InstitutionContextValue {
  const ctx = useContext(InstitutionContext);
  if (!ctx) {
    throw new Error('useInstitution must be used inside InstitutionProvider');
  }
  return ctx;
}
