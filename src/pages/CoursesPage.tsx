import React, { useMemo, useState } from 'react';
import { Info, Search } from 'lucide-react';
import { COURSE_CATEGORIES } from '../data/defaultSiteData';
import { useInstitution } from '../context/InstitutionContext';
import { CourseCard } from '../components/CourseCard';

export const CoursesPage: React.FC = () => {
  const { courses, courseFilter, setCourseFilter } = useInstitution();
  const [searchTerm, setSearchTerm] = useState('');

  const activeCourses = useMemo(
    () => courses.filter((c) => c.isActive),
    [courses]
  );

  const visibleCategories = useMemo(() => {
    const cats =
      courseFilter === 'all'
        ? COURSE_CATEGORIES
        : COURSE_CATEGORIES.filter((c) => c.key === courseFilter);

    return cats
      .map((cat) => {
        const items = activeCourses.filter((course) => {
          if (course.category !== cat.key) return false;
          if (!searchTerm.trim()) return true;
          const q = searchTerm.toLowerCase();
          return (
            course.title.toLowerCase().includes(q) ||
            course.shortDescription.toLowerCase().includes(q)
          );
        });
        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [activeCourses, courseFilter, searchTerm]);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-[#102D55] text-white py-14 lg:py-20 border-b border-[#D5A83D]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D5A83D]">
            Academic & Skill Catalog
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold mt-2">
            Our Educational Courses
          </h1>
          <p className="text-base text-white/85 mt-4 max-w-2xl leading-relaxed">
            Browse Kindergarten, Primary School, ITI & Technical, Diploma,
            Computer, and Paramedical programs offered by Zulekha Begam
            Educational Trust.
          </p>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="bg-[#F8F6EF] border-b border-[#102D55]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCourseFilter('all')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                courseFilter === 'all'
                  ? 'bg-[#102D55] text-white'
                  : 'bg-white text-[#102D55] border border-[#102D55]/15 hover:bg-white/80'
              }`}
            >
              All Categories
            </button>
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setCourseFilter(cat.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  courseFilter === cat.key
                    ? 'bg-[#102D55] text-white'
                    : 'bg-white text-[#102D55] border border-[#102D55]/15 hover:bg-white/80'
                }`}
              >
                {cat.shortLabel}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#102D55]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search courses..."
              aria-label="Search courses"
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-[#102D55]/15 text-sm text-[#252525] focus:outline-none focus:border-[#102D55]"
            />
          </div>
        </div>
      </section>

      {/* Course Sections */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#F8F6EF] border border-[#102D55]/10 text-sm text-[#252525]/80">
            <Info className="w-5 h-5 text-[#8A6816] shrink-0 mt-0.5" />
            <p>
              Individual course eligibility, duration, batch schedules, and fee
              details are published only when verified by the institution
              administration. Please click <strong>Learn More</strong> or{' '}
              <strong>Enquiry Now</strong> on any course to request current
              2026 admission details.
            </p>
          </div>

          {visibleCategories.length === 0 ? (
            <div className="text-center py-16 bg-[#F8F6EF] rounded-2xl border border-[#102D55]/10">
              <p className="font-serif text-xl text-[#102D55] font-semibold">
                No courses matched your search
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setCourseFilter('all');
                }}
                className="mt-4 px-5 py-2.5 rounded-lg bg-[#102D55] text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            visibleCategories.map((cat) => (
              <div key={cat.key} className="space-y-6">
                <div className="border-b border-[#102D55]/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#8A6816]">
                      {cat.code}
                    </p>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#102D55] mt-1">
                      {cat.label}
                    </h2>
                  </div>
                  <p className="text-sm text-[#252525]/75 max-w-xl">
                    {cat.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {cat.items.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
