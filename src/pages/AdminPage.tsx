import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Database,
  Image as ImageIcon,
  Inbox,
  Loader2,
  LogOut,
  Megaphone,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  COURSE_CATEGORIES,
  GALLERY_CATEGORIES,
  STOCK_MEDIA,
  TRUST_LOGO_PATH,
} from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import {
  addGalleryItem,
  createAnnouncement,
  deleteAnnouncement,
  deleteCourse,
  deleteEnquiry,
  deleteGalleryItem,
  saveCourse,
  saveSiteSettings,
  seedDatabaseDefaults,
  subscribeEnquiries,
  toggleAnnouncement,
  updateEnquiryStatus,
  updateGalleryItem,
} from '../services/institutionService';
import type {
  CourseCategoryKey,
  CourseItem,
  EnquiryItem,
  EnquiryStatus,
  GalleryCategory,
  GalleryItem,
  SiteSettings,
} from '../types/institution';
import { ResilientImage } from '../components/ResilientImage';

type AdminTab = 'enquiries' | 'settings' | 'courses' | 'gallery' | 'announcements';

async function compressImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file.'));
      img.onload = () => {
        const maxDim = 1000;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context unavailable.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export const AdminPage: React.FC = () => {
  const {
    settings,
    courses,
    gallery,
    announcements,
    dbSynced,
    user,
    authReady,
    isAdmin,
    adminCheckLoading,
    authError,
    signInWithGoogle,
    logout,
  } = useInstitution();

  const [activeTab, setActiveTab] = useState<AdminTab>('enquiries');
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [enquiryFilter, setEnquiryFilter] = useState<'all' | EnquiryStatus>('all');
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);

  // Settings form state
  const [draftSettings, setDraftSettings] = useState<SiteSettings>(settings);
  useEffect(() => {
    setDraftSettings(settings);
  }, [settings]);

  // Course form state
  const [editingCourse, setEditingCourse] = useState<
    Omit<CourseItem, 'id'> & { id?: string }
  >({
    title: '',
    category: 'computer',
    shortDescription: '',
    imageUrl: STOCK_MEDIA.computerLab,
    eligibility: '',
    duration: '',
    fees: '',
    verifiedDetails: '',
    displayOrder: 25,
    isActive: true,
  });

  // Gallery form state
  const [newPhoto, setNewPhoto] = useState<{
    title: string;
    category: GalleryCategory;
    caption: string;
    imageUrl: string;
  }>({
    title: '',
    category: 'School Activities',
    caption: '',
    imageUrl: '',
  });
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingGalleryDraft, setEditingGalleryDraft] = useState<{
    title: string;
    category: GalleryCategory;
    caption: string;
  }>({ title: '', category: 'School Activities', caption: '' });

  // Announcement form state
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');

  // Subscribe to private enquiries only when verified admin
  useEffect(() => {
    if (!isAdmin) {
      setEnquiries([]);
      return;
    }
    const unsub = subscribeEnquiries(
      (items) => setEnquiries(items),
      (err) => {
        setFeedback({
          type: 'error',
          text: `Could not load enquiries: ${err.message}`,
        });
      }
    );
    return () => unsub();
  }, [isAdmin]);

  const showToast = (type: 'success' | 'error', text: string) => {
    setFeedback({ type, text });
    window.setTimeout(() => {
      setFeedback((prev) => (prev?.text === text ? null : prev));
    }, 5000);
  };

  if (!authReady || adminCheckLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#F8F6EF] p-6">
        <div className="flex items-center gap-3 text-[#102D55] text-sm font-medium">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Verifying administrator session...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F6EF] px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#102D55]/15 shadow-sm text-center space-y-6">
          <img
            src={TRUST_LOGO_PATH}
            alt="Zulekha Begam Educational Trust"
            className="w-20 h-20 object-contain mx-auto"
          />
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
              Restricted Institutional Portal
            </p>
            <h1 className="font-serif text-2xl font-semibold text-[#102D55]">
              Administrator Sign In
            </h1>
            <p className="text-sm text-[#252525]/75 leading-relaxed">
              Sign in with your authorized Google account to manage website
              content, courses, gallery photos, announcements, and admission
              enquiries.
            </p>
          </div>

          {authError && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-900 text-xs text-left"
            >
              {authError}
            </div>
          )}

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            className="w-full py-3.5 px-5 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Sign In with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F6EF] px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-red-200 shadow-sm text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-700 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-semibold text-[#102D55]">
              Administrator Access Required
            </h1>
            <p className="text-sm text-[#252525]/75">
              Signed in as <span className="font-semibold">{user.email}</span>.
              This account does not have administrator permissions for{' '}
              {settings.trustName}.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-[#102D55]/20 text-sm font-semibold text-[#102D55] hover:bg-[#F8F6EF]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  const needsInitialSeed =
    !dbSynced.settings ||
    !dbSynced.courses ||
    !dbSynced.gallery ||
    !dbSynced.announcements;

  const filteredEnquiries =
    enquiryFilter === 'all'
      ? enquiries
      : enquiries.filter((e) => e.status === enquiryFilter);

  const handleSeedDatabase = async () => {
    setBusyAction('seed');
    try {
      await seedDatabaseDefaults();
      showToast(
        'success',
        'Default institutional content, courses, gallery, and announcements synced to Firestore.'
      );
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Failed to sync default records.'
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusyAction('settings');
    try {
      await saveSiteSettings(draftSettings);
      showToast('success', 'Website settings and content updated.');
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Failed to save settings.'
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse.title.trim() || !editingCourse.shortDescription.trim()) {
      showToast('error', 'Course title and description are required.');
      return;
    }
    setBusyAction('course');
    try {
      await saveCourse(editingCourse);
      showToast(
        'success',
        editingCourse.id ? 'Course updated.' : 'New course added.'
      );
      setEditingCourse({
        title: '',
        category: 'computer',
        shortDescription: '',
        imageUrl: STOCK_MEDIA.computerLab,
        eligibility: '',
        duration: '',
        fees: '',
        verifiedDetails: '',
        displayOrder: courses.length + 1,
        isActive: true,
      });
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Failed to save course.'
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setNewPhoto((prev) => ({
        ...prev,
        imageUrl: dataUrl,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
      }));
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Unable to process image file.'
      );
    }
  };

  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.imageUrl.trim()) {
      showToast('error', 'Provide both a photo title and image URL or upload.');
      return;
    }
    setBusyAction('gallery');
    try {
      await addGalleryItem({
        title: newPhoto.title,
        category: newPhoto.category,
        caption: newPhoto.caption,
        imageUrl: newPhoto.imageUrl,
        displayOrder: gallery.length + 1,
      });
      setNewPhoto({
        title: '',
        category: 'School Activities',
        caption: '',
        imageUrl: '',
      });
      showToast('success', 'Photograph added to gallery.');
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Failed to add photograph.'
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleSaveGalleryEdit = async (item: GalleryItem) => {
    setBusyAction(`gal-${item.id}`);
    try {
      await updateGalleryItem(item.id, editingGalleryDraft);
      setEditingGalleryId(null);
      showToast('success', 'Gallery photograph updated.');
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Failed to update photograph.'
      );
    } finally {
      setBusyAction(null);
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnBody.trim()) {
      showToast('error', 'Title and announcement body are required.');
      return;
    }
    setBusyAction('announcement');
    try {
      await createAnnouncement({
        title: newAnnTitle,
        body: newAnnBody,
        isActive: true,
      });
      setNewAnnTitle('');
      setNewAnnBody('');
      showToast('success', 'Announcement published.');
    } catch (err) {
      showToast(
        'error',
        err instanceof Error ? err.message : 'Failed to publish announcement.'
      );
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6EF]">
      {/* Top Admin Header */}
      <section className="bg-[#102D55] text-white py-8 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5A83D]">
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticated Administrator</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold">
              Institution Management Dashboard
            </h1>
            <p className="text-xs text-white/75">Signed in as {user.email}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {needsInitialSeed && (
              <button
                type="button"
                disabled={busyAction === 'seed'}
                onClick={handleSeedDatabase}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D5A83D] hover:bg-[#C6982D] text-[#102D55] text-xs font-bold transition-colors"
              >
                {busyAction === 'seed' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Database className="w-4 h-4" />
                )}
                <span>Initialize Database Defaults</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/25 hover:bg-white/10 text-white text-xs font-semibold transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {feedback && (
          <div
            role="status"
            className={`flex items-center gap-3 p-4 rounded-xl border text-sm ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-[#102D55]/10 shadow-xs">
          {(
            [
              { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Inbox },
              { id: 'settings', label: 'Content & Contact', icon: Settings },
              { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
              { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
              {
                id: 'announcements',
                label: `Announcements (${announcements.length})`,
                icon: Megaphone,
              },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#102D55] text-white'
                    : 'text-[#102D55]/80 hover:bg-[#F8F6EF]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                  Admission & Contact Enquiries
                </h2>
                <p className="text-xs text-[#252525]/70 mt-0.5">
                  Live submissions saved to Firestore.
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(['all', 'new', 'reviewed', 'contacted'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setEnquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                      enquiryFilter === st
                        ? 'bg-[#102D55] text-white'
                        : 'bg-[#F8F6EF] text-[#102D55]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {filteredEnquiries.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#252525]/70 bg-[#F8F6EF]/60 rounded-xl">
                No enquiries recorded in this filter yet.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-xl border border-[#102D55]/10 bg-[#F8F6EF]/40 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="text-xs font-medium text-[#8A6816]">
                          {enq.enquiryType.replace('_', ' ').toUpperCase()} ·{' '}
                          {enq.applyingFor}
                        </p>
                        <h3 className="font-serif text-lg font-semibold text-[#102D55]">
                          {enq.studentName}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          aria-label={`Status for ${enq.studentName}`}
                          value={enq.status}
                          onChange={(e) =>
                            void updateEnquiryStatus(
                              enq.id,
                              e.target.value as EnquiryStatus
                            )
                          }
                          className="px-3 py-1.5 rounded-lg border border-[#102D55]/20 bg-white text-xs font-semibold text-[#102D55]"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => void deleteEnquiry(enq.id)}
                          aria-label="Delete enquiry"
                          className="p-2 rounded-lg text-red-700 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#252525]/80 tabular-nums">
                      <div>
                        <strong>Mobile:</strong> {enq.mobileNumber}
                      </div>
                      {enq.parentName && (
                        <div>
                          <strong>Parent:</strong> {enq.parentName}
                        </div>
                      )}
                      {enq.dateOfBirth && (
                        <div>
                          <strong>DOB:</strong> {enq.dateOfBirth}
                        </div>
                      )}
                      {enq.email && (
                        <div>
                          <strong>Email:</strong> {enq.email}
                        </div>
                      )}
                      {enq.previousSchool && (
                        <div>
                          <strong>Prev. School:</strong> {enq.previousSchool}
                        </div>
                      )}
                      {enq.address && (
                        <div>
                          <strong>Address:</strong> {enq.address}
                        </div>
                      )}
                    </div>

                    {enq.message && (
                      <p className="text-sm text-[#252525]/85 bg-white p-3 rounded-lg border border-[#102D55]/10">
                        {enq.message}
                      </p>
                    )}

                    <p className="text-[11px] text-[#252525]/55 tabular-nums">
                      Submitted: {enq.createdAt || 'Recently'} · ID: {enq.id}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WEBSITE & CONTACT SETTINGS */}
        {activeTab === 'settings' && (
          <form
            onSubmit={handleSaveSettings}
            className="bg-white rounded-2xl border border-[#102D55]/10 p-6 sm:p-8 space-y-6 shadow-xs"
          >
            <div className="flex items-center justify-between border-b border-[#102D55]/10 pb-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                  Website Content, Banners & Contact Details
                </h2>
                <p className="text-xs text-[#252525]/70 mt-0.5">
                  Updates take effect immediately across the public website.
                </p>
              </div>
              <button
                type="submit"
                disabled={busyAction === 'settings'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102D55] hover:bg-[#0A1E3B] text-white text-xs font-semibold"
              >
                {busyAction === 'settings' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>Save All Changes</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Trust Name
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.trustName}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, trustName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.schoolName}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      schoolName: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Short Name
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.shortName}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, shortName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.tagline}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, tagline: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Hero Badge Text
                </label>
                <input
                  type="text"
                  value={draftSettings.heroBadge}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, heroBadge: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Hero Banner Image URL
                </label>
                <input
                  type="text"
                  value={draftSettings.heroBannerUrl}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      heroBannerUrl: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Hero Heading
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.heroHeading}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      heroHeading: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Hero Subheading
                </label>
                <input
                  type="text"
                  value={draftSettings.heroSubheading}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      heroSubheading: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102D55] mb-1">
                Hero Supporting Description
              </label>
              <textarea
                rows={2}
                value={draftSettings.heroDescription}
                onChange={(e) =>
                  setDraftSettings({
                    ...draftSettings,
                    heroDescription: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
              />
            </div>

            <div className="border-t border-[#102D55]/10 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Admission Heading
                </label>
                <input
                  type="text"
                  value={draftSettings.admissionHeading}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      admissionHeading: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Admission Subheading
                </label>
                <input
                  type="text"
                  value={draftSettings.admissionSubheading}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      admissionSubheading: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Admission Banner Note
                </label>
                <textarea
                  rows={2}
                  value={draftSettings.admissionBannerNote}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      admissionBannerNote: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
            </div>

            <div className="border-t border-[#102D55]/10 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  About Us Overview
                </label>
                <textarea
                  rows={3}
                  value={draftSettings.aboutOverview}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      aboutOverview: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Our Vision
                </label>
                <textarea
                  rows={3}
                  required
                  value={draftSettings.vision}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, vision: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Our Mission
                </label>
                <textarea
                  rows={3}
                  required
                  value={draftSettings.mission}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, mission: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
            </div>

            <div className="border-t border-[#102D55]/10 pt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Campus Address
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.address}
                  onChange={(e) =>
                    setDraftSettings({ ...draftSettings, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Primary Contact Number
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.phonePrimary}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      phonePrimary: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Secondary Contact Number
                </label>
                <input
                  type="text"
                  value={draftSettings.phoneSecondary}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      phoneSecondary: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.whatsappNumber}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      whatsappNumber: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Official Email Address (optional)
                </label>
                <input
                  type="email"
                  value={draftSettings.officialEmail}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      officialEmail: e.target.value,
                    })
                  }
                  placeholder="Add official email when ready"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Business / Office Hours
                </label>
                <input
                  type="text"
                  required
                  value={draftSettings.businessHours}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      businessHours: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Facebook URL (optional)
                </label>
                <input
                  type="url"
                  value={draftSettings.facebookUrl}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      facebookUrl: e.target.value,
                    })
                  }
                  placeholder="https://facebook.com/..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Instagram URL (optional)
                </label>
                <input
                  type="url"
                  value={draftSettings.instagramUrl}
                  onChange={(e) =>
                    setDraftSettings({
                      ...draftSettings,
                      instagramUrl: e.target.value,
                    })
                  }
                  placeholder="https://instagram.com/..."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: COURSES MANAGER */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleSaveCourse}
              className="lg:col-span-5 bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-4 shadow-xs"
            >
              <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                {editingCourse.id ? 'Edit Course' : 'Add New Course'}
              </h2>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Course Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCourse.title}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Category *
                </label>
                <select
                  value={editingCourse.category}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      category: e.target.value as CourseCategoryKey,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm bg-white"
                >
                  {COURSE_CATEGORIES.map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.code}: {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingCourse.shortDescription}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      shortDescription: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#102D55] mb-1">
                    Verified Eligibility
                  </label>
                  <input
                    type="text"
                    value={editingCourse.eligibility || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        eligibility: e.target.value,
                      })
                    }
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#102D55] mb-1">
                    Verified Duration
                  </label>
                  <input
                    type="text"
                    value={editingCourse.duration || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        duration: e.target.value,
                      })
                    }
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#102D55] mb-1">
                    Verified Fees
                  </label>
                  <input
                    type="text"
                    value={editingCourse.fees || ''}
                    onChange={(e) =>
                      setEditingCourse({ ...editingCourse, fees: e.target.value })
                    }
                    placeholder="Optional"
                    className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-xs"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingCourse.imageUrl}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      imageUrl: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="course-active-toggle"
                  type="checkbox"
                  checked={editingCourse.isActive}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      isActive: e.target.checked,
                    })
                  }
                />
                <label
                  htmlFor="course-active-toggle"
                  className="text-xs font-medium text-[#102D55]"
                >
                  Visible on public Courses page
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={busyAction === 'course'}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#102D55] text-white text-xs font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  <span>{editingCourse.id ? 'Update Course' : 'Add Course'}</span>
                </button>
                {editingCourse.id && (
                  <button
                    type="button"
                    onClick={() =>
                      setEditingCourse({
                        title: '',
                        category: 'computer',
                        shortDescription: '',
                        imageUrl: STOCK_MEDIA.computerLab,
                        eligibility: '',
                        duration: '',
                        fees: '',
                        verifiedDetails: '',
                        displayOrder: courses.length + 1,
                        isActive: true,
                      })
                    }
                    className="px-4 py-2.5 rounded-lg border border-[#102D55]/20 text-xs font-semibold text-[#102D55]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-4 shadow-xs">
              <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                Existing Courses ({courses.length})
              </h2>
              <div className="divide-y divide-[#102D55]/10">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase text-[#8A6816]">
                        {course.category} {!course.isActive ? '· Hidden' : ''}
                      </p>
                      <p className="font-semibold text-sm text-[#102D55] truncate">
                        {course.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setEditingCourse(course)}
                        className="px-3 py-1.5 rounded-lg border border-[#102D55]/15 text-xs font-semibold text-[#102D55] hover:bg-[#F8F6EF]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteCourse(course.id)}
                        aria-label={`Delete ${course.title}`}
                        className="p-1.5 rounded-lg text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleAddGalleryItem}
              className="lg:col-span-5 bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-4 shadow-xs"
            >
              <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                Upload Gallery Photograph
              </h2>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={newPhoto.title}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, title: e.target.value })
                  }
                  placeholder="e.g. Science Classroom Activity"
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Category *
                </label>
                <select
                  value={newPhoto.category}
                  onChange={(e) =>
                    setNewPhoto({
                      ...newPhoto,
                      category: e.target.value as GalleryCategory,
                    })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm bg-white"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Caption (optional)
                </label>
                <textarea
                  rows={2}
                  value={newPhoto.caption}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, caption: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Upload Image File or Paste URL *
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-[#102D55]/30 hover:bg-[#F8F6EF] cursor-pointer text-xs font-semibold text-[#102D55] mb-2">
                  <Upload className="w-4 h-4" />
                  <span>Choose Photo From Device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="sr-only"
                  />
                </label>
                <input
                  type="text"
                  value={newPhoto.imageUrl}
                  onChange={(e) =>
                    setNewPhoto({ ...newPhoto, imageUrl: e.target.value })
                  }
                  placeholder="Or paste image URL"
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-xs"
                />
              </div>
              <button
                type="submit"
                disabled={busyAction === 'gallery'}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#102D55] text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Gallery</span>
              </button>
            </form>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-4 shadow-xs">
              <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                Gallery Photos ({gallery.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl overflow-hidden border border-[#102D55]/10 bg-[#F8F6EF]/40 flex flex-col"
                  >
                    <div className="aspect-[16/10]">
                      <ResilientImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col">
                      {editingGalleryId === item.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editingGalleryDraft.title}
                            onChange={(e) =>
                              setEditingGalleryDraft({
                                ...editingGalleryDraft,
                                title: e.target.value,
                              })
                            }
                            className="w-full px-2.5 py-1.5 rounded border border-[#102D55]/20 text-xs bg-white"
                          />
                          <select
                            value={editingGalleryDraft.category}
                            onChange={(e) =>
                              setEditingGalleryDraft({
                                ...editingGalleryDraft,
                                category: e.target.value as GalleryCategory,
                              })
                            }
                            className="w-full px-2.5 py-1.5 rounded border border-[#102D55]/20 text-xs bg-white"
                          >
                            {GALLERY_CATEGORIES.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={editingGalleryDraft.caption}
                            onChange={(e) =>
                              setEditingGalleryDraft({
                                ...editingGalleryDraft,
                                caption: e.target.value,
                              })
                            }
                            placeholder="Caption"
                            className="w-full px-2.5 py-1.5 rounded border border-[#102D55]/20 text-xs bg-white"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => void handleSaveGalleryEdit(item)}
                              className="px-3 py-1 rounded bg-[#102D55] text-white text-xs font-semibold"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingGalleryId(null)}
                              className="px-3 py-1 rounded border border-[#102D55]/20 text-xs"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-[11px] font-semibold text-[#8A6816]">
                            {item.category}
                          </p>
                          <p className="font-semibold text-sm text-[#102D55] flex-1">
                            {item.title}
                          </p>
                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingGalleryId(item.id);
                                setEditingGalleryDraft({
                                  title: item.title,
                                  category: item.category,
                                  caption: item.caption || '',
                                });
                              }}
                              className="px-2.5 py-1 rounded border border-[#102D55]/20 text-xs font-semibold text-[#102D55]"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => void deleteGalleryItem(item.id)}
                              aria-label={`Delete ${item.title}`}
                              className="p-1.5 rounded text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <form
              onSubmit={handleAddAnnouncement}
              className="lg:col-span-5 bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-4 shadow-xs"
            >
              <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                Publish Announcement
              </h2>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Notice Title *
                </label>
                <input
                  type="text"
                  required
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  placeholder="e.g. Admissions Open 2026"
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#102D55] mb-1">
                  Notice Details *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newAnnBody}
                  onChange={(e) => setNewAnnBody(e.target.value)}
                  placeholder="Enter announcement text..."
                  className="w-full px-3 py-2 rounded-lg border border-[#102D55]/20 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={busyAction === 'announcement'}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#102D55] text-white text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Notice</span>
              </button>
            </form>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#102D55]/10 p-6 space-y-4 shadow-xs">
              <h2 className="font-serif text-xl font-semibold text-[#102D55]">
                Current Announcements
              </h2>
              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 rounded-xl border border-[#102D55]/10 bg-[#F8F6EF]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="font-semibold text-sm text-[#102D55]">
                        {ann.title}
                      </p>
                      <p className="text-xs text-[#252525]/80">{ann.body}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          void toggleAnnouncement(ann.id, !ann.isActive)
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          ann.isActive
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {ann.isActive ? 'Active' : 'Hidden'}
                      </button>
                      <button
                        type="button"
                        onClick={() => void deleteAnnouncement(ann.id)}
                        aria-label="Delete announcement"
                        className="p-1.5 rounded-lg text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
