import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
  type Unsubscribe,
} from 'firebase/firestore';
import {
  db,
  handleFirestoreError,
  isFirebaseConfigured,
  OperationType,
} from '../lib/firebase';
import {
  DEFAULT_ANNOUNCEMENTS,
  DEFAULT_COURSES,
  DEFAULT_GALLERY,
  DEFAULT_SITE_SETTINGS,
} from '../data/defaultSiteData';
import type {
  AnnouncementItem,
  CourseItem,
  EnquiryItem,
  EnquiryPayload,
  EnquiryStatus,
  GalleryItem,
  SiteSettings,
} from '../types/institution';

function clampStr(val: string | undefined, max: number): string {
  if (!val) return '';
  return val.trim().slice(0, max);
}

export function subscribeSiteSettings(
  onData: (settings: SiteSettings, existsInDb: boolean) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData(DEFAULT_SITE_SETTINGS, false);
    return () => {};
  }

  const ref = doc(db, 'siteSettings', 'main');
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Partial<SiteSettings>;
        onData({ ...DEFAULT_SITE_SETTINGS, ...data }, true);
      } else {
        onData(DEFAULT_SITE_SETTINGS, false);
      }
    },
    (error) => {
      console.warn('SiteSettings listener fallback:', error.message);
      onError?.(error);
    }
  );
}

export function subscribeCourses(
  onData: (courses: CourseItem[], existsInDb: boolean) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData(DEFAULT_COURSES, false);
    return () => {};
  }

  const q = query(collection(db, 'courses'), orderBy('displayOrder', 'asc'));
  return onSnapshot(
    q,
    (snap) => {
      if (snap.empty) {
        onData(DEFAULT_COURSES, false);
      } else {
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<CourseItem, 'id'>),
        }));
        onData(items, true);
      }
    },
    (error) => {
      console.warn('Courses listener fallback:', error.message);
      onError?.(error);
    }
  );
}

export function subscribeGallery(
  onData: (items: GalleryItem[], existsInDb: boolean) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData(DEFAULT_GALLERY, false);
    return () => {};
  }

  const q = query(collection(db, 'gallery'), orderBy('displayOrder', 'asc'));
  return onSnapshot(
    q,
    (snap) => {
      if (snap.empty) {
        onData(DEFAULT_GALLERY, false);
      } else {
        const items = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<GalleryItem, 'id'>),
        }));
        onData(items, true);
      }
    },
    (error) => {
      console.warn('Gallery listener fallback:', error.message);
      onError?.(error);
    }
  );
}

export function subscribeAnnouncements(
  onData: (items: AnnouncementItem[], existsInDb: boolean) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData(DEFAULT_ANNOUNCEMENTS, false);
    return () => {};
  }

  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      if (snap.empty) {
        onData(DEFAULT_ANNOUNCEMENTS, false);
      } else {
        const items = snap.docs.map((d) => {
          const raw = d.data() as {
            title: string;
            body: string;
            isActive: boolean;
            createdAt?: { toDate?: () => Date };
          };
          return {
            id: d.id,
            title: raw.title,
            body: raw.body,
            isActive: raw.isActive,
            createdAt: raw.createdAt?.toDate ? raw.createdAt.toDate().toISOString() : undefined,
          };
        });
        onData(items, true);
      }
    },
    (error) => {
      console.warn('Announcements listener fallback:', error.message);
      onError?.(error);
    }
  );
}

export function subscribeEnquiries(
  onData: (items: EnquiryItem[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  if (!db) {
    onData([]);
    return () => {};
  }

  const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => {
        const raw = d.data() as Omit<EnquiryItem, 'id' | 'createdAt'> & {
          createdAt?: { toDate?: () => Date };
        };
        return {
          id: d.id,
          enquiryType: raw.enquiryType,
          studentName: raw.studentName,
          parentName: raw.parentName,
          dateOfBirth: raw.dateOfBirth,
          applyingFor: raw.applyingFor,
          mobileNumber: raw.mobileNumber,
          email: raw.email,
          address: raw.address,
          previousSchool: raw.previousSchool,
          message: raw.message,
          status: raw.status,
          createdAt: raw.createdAt?.toDate ? raw.createdAt.toDate().toLocaleString() : 'Just now',
        };
      });
      onData(items);
    },
    (error) => {
      onError?.(error);
      try {
        handleFirestoreError(error, OperationType.LIST, 'enquiries');
      } catch {
        // Error already logged cleanly
      }
    }
  );
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<string> {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      'Database backend is not configured. Please contact the school directly on 9322444499 or 9322977776.'
    );
  }

  const cleanData = {
    enquiryType: payload.enquiryType,
    studentName: clampStr(payload.studentName, 120),
    parentName: clampStr(payload.parentName, 120),
    dateOfBirth: clampStr(payload.dateOfBirth, 30),
    applyingFor: clampStr(payload.applyingFor, 140),
    mobileNumber: clampStr(payload.mobileNumber, 25),
    email: clampStr(payload.email, 140),
    address: clampStr(payload.address, 350),
    previousSchool: clampStr(payload.previousSchool, 160),
    message: clampStr(payload.message, 1200),
    status: 'new' as const,
    createdAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(collection(db, 'enquiries'), cleanData);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'enquiries');
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  const payload = {
    trustName: clampStr(settings.trustName, 140),
    schoolName: clampStr(settings.schoolName, 160),
    shortName: clampStr(settings.shortName, 40),
    tagline: clampStr(settings.tagline, 200),
    heroBadge: clampStr(settings.heroBadge, 80),
    heroHeading: clampStr(settings.heroHeading, 160),
    heroSubheading: clampStr(settings.heroSubheading, 200),
    heroDescription: clampStr(settings.heroDescription, 500),
    heroBannerUrl: clampStr(settings.heroBannerUrl, 500),
    admissionsOpen: Boolean(settings.admissionsOpen),
    admissionHeading: clampStr(settings.admissionHeading, 140),
    admissionSubheading: clampStr(settings.admissionSubheading, 220),
    admissionBannerNote: clampStr(settings.admissionBannerNote, 400),
    aboutOverview: clampStr(settings.aboutOverview, 2000),
    vision: clampStr(settings.vision, 800),
    mission: clampStr(settings.mission, 800),
    philosophy: clampStr(settings.philosophy, 1200),
    commitment: clampStr(settings.commitment, 1200),
    futureGoals: clampStr(settings.futureGoals, 1200),
    address: clampStr(settings.address, 300),
    phonePrimary: clampStr(settings.phonePrimary, 25),
    phoneSecondary: clampStr(settings.phoneSecondary, 25),
    whatsappNumber: clampStr(settings.whatsappNumber, 25),
    officialEmail: clampStr(settings.officialEmail, 140),
    businessHours: clampStr(settings.businessHours, 250),
    facebookUrl: clampStr(settings.facebookUrl, 300),
    instagramUrl: clampStr(settings.instagramUrl, 300),
    youtubeUrl: clampStr(settings.youtubeUrl, 300),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'siteSettings', 'main'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'siteSettings/main');
  }
}

export async function saveCourse(
  course: Omit<CourseItem, 'id'> & { id?: string }
): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  const payload = {
    title: clampStr(course.title, 120),
    category: course.category,
    shortDescription: clampStr(course.shortDescription, 400),
    imageUrl: clampStr(course.imageUrl, 500),
    eligibility: clampStr(course.eligibility, 250),
    duration: clampStr(course.duration, 120),
    fees: clampStr(course.fees, 120),
    verifiedDetails: clampStr(course.verifiedDetails, 1000),
    displayOrder: Math.max(0, Math.min(1000, Math.round(course.displayOrder || 0))),
    isActive: Boolean(course.isActive),
    updatedAt: serverTimestamp(),
  };

  try {
    if (course.id) {
      await setDoc(doc(db, 'courses', course.id), payload);
    } else {
      await addDoc(collection(db, 'courses'), payload);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'courses');
  }
}

export async function deleteCourse(courseId: string): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await deleteDoc(doc(db, 'courses', courseId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `courses/${courseId}`);
  }
}

export async function addGalleryItem(
  item: Omit<GalleryItem, 'id'>
): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  const payload = {
    title: clampStr(item.title, 140),
    category: item.category,
    caption: clampStr(item.caption, 350),
    imageUrl: clampStr(item.imageUrl, 800000),
    displayOrder: Math.max(0, Math.min(1000, Math.round(item.displayOrder || 0))),
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(collection(db, 'gallery'), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'gallery');
  }
}

export async function updateGalleryItem(
  id: string,
  updates: Partial<Omit<GalleryItem, 'id'>>
): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await updateDoc(doc(db, 'gallery', id), {
      ...(updates.title !== undefined ? { title: clampStr(updates.title, 140) } : {}),
      ...(updates.category !== undefined ? { category: updates.category } : {}),
      ...(updates.caption !== undefined ? { caption: clampStr(updates.caption, 350) } : {}),
      ...(updates.imageUrl !== undefined ? { imageUrl: clampStr(updates.imageUrl, 800000) } : {}),
      ...(updates.displayOrder !== undefined
        ? { displayOrder: Math.max(0, Math.min(1000, Math.round(updates.displayOrder))) }
        : {}),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `gallery/${id}`);
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `gallery/${id}`);
  }
}

export async function createAnnouncement(
  item: Omit<AnnouncementItem, 'id' | 'createdAt'>
): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await addDoc(collection(db, 'announcements'), {
      title: clampStr(item.title, 160),
      body: clampStr(item.body, 600),
      isActive: Boolean(item.isActive),
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'announcements');
  }
}

export async function toggleAnnouncement(id: string, isActive: boolean): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await updateDoc(doc(db, 'announcements', id), { isActive });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `announcements/${id}`);
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await deleteDoc(doc(db, 'announcements', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `announcements/${id}`);
  }
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await updateDoc(doc(db, 'enquiries', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `enquiries/${id}`);
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  try {
    await deleteDoc(doc(db, 'enquiries', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `enquiries/${id}`);
  }
}

export async function seedDatabaseDefaults(): Promise<void> {
  if (!db) throw new Error('Database is not connected.');
  const batch = writeBatch(db);

  batch.set(doc(db, 'siteSettings', 'main'), {
    ...DEFAULT_SITE_SETTINGS,
    updatedAt: serverTimestamp(),
  });

  for (const course of DEFAULT_COURSES) {
    const { id, ...rest } = course;
    batch.set(doc(db, 'courses', id), {
      ...rest,
      eligibility: rest.eligibility ?? '',
      duration: rest.duration ?? '',
      fees: rest.fees ?? '',
      verifiedDetails: rest.verifiedDetails ?? '',
      updatedAt: serverTimestamp(),
    });
  }

  for (const item of DEFAULT_GALLERY) {
    const { id, ...rest } = item;
    batch.set(doc(db, 'gallery', id), {
      ...rest,
      createdAt: serverTimestamp(),
    });
  }

  for (const ann of DEFAULT_ANNOUNCEMENTS) {
    const { id, ...rest } = ann;
    batch.set(doc(db, 'announcements', id), {
      ...rest,
      createdAt: serverTimestamp(),
    });
  }

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'batch_seed');
  }
}
