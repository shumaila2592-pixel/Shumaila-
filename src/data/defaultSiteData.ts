import heroClassroomImg from '../assets/images/hero_classroom_students_1794651791571.jpg';
import schoolEarlyLearningImg from '../assets/images/school_early_learning_1794651792212.jpg';
import computerLabImg from '../assets/images/computer_lab_training_1794651791964.jpg';
import itiWorkshopImg from '../assets/images/iti_technical_workshop_1794651793459.jpg';
import paramedicalLabImg from '../assets/images/paramedical_lab_training_1794651793191.jpg';
import type {
  AnnouncementItem,
  CourseCategoryKey,
  CourseItem,
  GalleryCategory,
  GalleryItem,
  SiteSettings,
} from '../types/institution';

export const TRUST_LOGO_PATH = '/assets/aistudio/image_1acdc836.png';
export const ADMISSION_POSTER_PATH = '/assets/aistudio/image_81285077.png';

export const STOCK_MEDIA = {
  heroClassroom: heroClassroomImg,
  earlyLearning: schoolEarlyLearningImg,
  computerLab: computerLabImg,
  itiWorkshop: itiWorkshopImg,
  paramedicalLab: paramedicalLabImg,
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  trustName: 'Zulekha Begam Educational Trust',
  schoolName: 'Zulekha Begum English Medium School',
  shortName: 'ZBEM School',
  tagline: 'शिक्षा से सशक्त बनें, उज्ज्वल भविष्य चुनें।',
  heroBadge: 'ADMISSIONS OPEN – 2026',
  heroHeading: 'Welcome to Zulekha Begam Educational Trust',
  heroSubheading: 'Building Strong Foundations, Creating Brighter Futures.',
  heroDescription:
    'We believe that every child deserves quality education, practical skills and the right guidance to achieve success in life.',
  heroBannerUrl: heroClassroomImg,
  admissionsOpen: true,
  admissionHeading: 'ADMISSIONS OPEN 2026',
  admissionSubheading: 'Give Your Child the Right Start for a Bright Future!',
  admissionBannerNote:
    'Admissions are open for Kindergarten (Nursery, Jr. KG, Sr. KG) and Primary School (1st to 5th Standard) alongside Technical, Computer, Diploma, and Paramedical courses.',
  aboutOverview:
    'Zulekha Begam Educational Trust is dedicated to delivering accessible, principled, and career-oriented education in Bhiwandi. Through Zulekha Begum English Medium School (ZBEM School) and our vocational training divisions, we nurture young learners from early childhood through primary education while equipping youth and adults with practical technical, computer, and paramedical skills.',
  vision:
    'To provide accessible, quality education and skill-based learning opportunities that empower students to build a successful future.',
  mission:
    'To develop confident, knowledgeable and skilled individuals through quality education, practical training and career guidance.',
  philosophy:
    'We believe meaningful learning blends strong academic fundamentals with hands-on practice, ethical values, and attentive mentorship so every learner discovers confidence and purpose.',
  commitment:
    'Our institution is committed to transparent, donation-free admissions, supportive classrooms, experienced educators, and practical learning environments tailored to student growth.',
  futureGoals:
    'We continue to expand modern learning laboratories, practical workshops, student support initiatives, and structured career guidance pathways to serve families across Bhiwandi and neighbouring communities.',
  address: '105, Gani Compound, Opp. Rizwana Hotel, Bhiwandi, Maharashtra, India.',
  phonePrimary: '9322444499',
  phoneSecondary: '9322977776',
  whatsappNumber: '9322444499',
  officialEmail: '',
  businessHours: 'Monday – Saturday: 8:30 AM – 6:00 PM (Sunday Closed)',
  facebookUrl: '',
  instagramUrl: '',
  youtubeUrl: '',
};

export const COURSE_CATEGORIES: {
  key: CourseCategoryKey;
  code: string;
  label: string;
  shortLabel: string;
  description: string;
  image: string;
}[] = [
  {
    key: 'kindergarten',
    code: 'Category A',
    label: 'Kindergarten',
    shortLabel: 'Kindergarten',
    description:
      'Warm, joyful early childhood foundations in Nursery, Junior KG, and Senior KG through play-way and guided discovery.',
    image: schoolEarlyLearningImg,
  },
  {
    key: 'school',
    code: 'Category B',
    label: 'School Education',
    shortLabel: '1st to 5th Std',
    description:
      'English medium primary education from Standard 1 to Standard 5 focused on literacy, numeracy, curiosity, and character.',
    image: heroClassroomImg,
  },
  {
    key: 'iti',
    code: 'Category C',
    label: 'ITI & Technical Courses',
    shortLabel: 'ITI & Technical',
    description:
      'Hands-on technical trades building real-world skills in electrical systems, refrigeration & AC, plumbing, and motor mechanics.',
    image: itiWorkshopImg,
  },
  {
    key: 'diploma',
    code: 'Category D',
    label: 'Diploma Courses',
    shortLabel: 'Diploma',
    description:
      'Structured engineering and non-engineering diploma pathways. Contact our admission office for verified program details.',
    image: itiWorkshopImg,
  },
  {
    key: 'computer',
    code: 'Category E',
    label: 'Computer Courses',
    shortLabel: 'Computer & IT',
    description:
      'Practical digital literacy, office productivity, accounting, graphic design, digital marketing, typing, and programming practice.',
    image: computerLabImg,
  },
  {
    key: 'paramedical',
    code: 'Category F',
    label: 'Paramedical Courses',
    shortLabel: 'Paramedical',
    description:
      'Career-focused healthcare and wellness training in medical lab technology, physiotherapy, diet & nutrition, and acupuncture.',
    image: paramedicalLabImg,
  },
];

export const DEFAULT_COURSES: CourseItem[] = [
  // Category A: Kindergarten
  {
    id: 'course-nursery',
    title: 'Nursery',
    category: 'kindergarten',
    shortDescription:
      'Gentle introduction to school life with sensory play, rhymes, storytelling, motor skills, and joyful social interaction.',
    imageUrl: schoolEarlyLearningImg,
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'course-junior-kg',
    title: 'Junior KG',
    category: 'kindergarten',
    shortDescription:
      'Foundational phonics, early number recognition, creative art, and guided classroom activities in a nurturing setting.',
    imageUrl: schoolEarlyLearningImg,
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'course-senior-kg',
    title: 'Senior KG',
    category: 'kindergarten',
    shortDescription:
      'Primary school readiness covering reading fluency, basic arithmetic, observation skills, and confident communication.',
    imageUrl: schoolEarlyLearningImg,
    displayOrder: 3,
    isActive: true,
  },

  // Category B: School Education
  {
    id: 'course-std-1',
    title: '1st Standard',
    category: 'school',
    shortDescription:
      'English medium foundational curriculum building reading comprehension, writing clarity, arithmetic, and curiosity.',
    imageUrl: heroClassroomImg,
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'course-std-2',
    title: '2nd Standard',
    category: 'school',
    shortDescription:
      'Strengthening language expression, mental math, environmental awareness, and collaborative classroom participation.',
    imageUrl: heroClassroomImg,
    displayOrder: 5,
    isActive: true,
  },
  {
    id: 'course-std-3',
    title: '3rd Standard',
    category: 'school',
    shortDescription:
      'Balanced primary academics introducing structured science concepts, computer basics, and analytical thinking.',
    imageUrl: heroClassroomImg,
    displayOrder: 6,
    isActive: true,
  },
  {
    id: 'course-std-4',
    title: '4th Standard',
    category: 'school',
    shortDescription:
      'Deepening core English, mathematics, social studies, and practical project-based learning with personal attention.',
    imageUrl: heroClassroomImg,
    displayOrder: 7,
    isActive: true,
  },
  {
    id: 'course-std-5',
    title: '5th Standard',
    category: 'school',
    shortDescription:
      'Upper primary readiness preparing students with confident communication, problem-solving, and computer literacy.',
    imageUrl: heroClassroomImg,
    displayOrder: 8,
    isActive: true,
  },

  // Category C: ITI & Technical Courses
  {
    id: 'course-electrician',
    title: 'Electrician',
    category: 'iti',
    shortDescription:
      'Practical training in domestic and commercial electrical wiring, circuit testing, safety standards, and fault diagnostics.',
    imageUrl: itiWorkshopImg,
    displayOrder: 9,
    isActive: true,
  },
  {
    id: 'course-rac',
    title: 'RAC (Refrigeration & Air Conditioning)',
    category: 'iti',
    shortDescription:
      'Hands-on installation, maintenance, and troubleshooting of residential and commercial refrigeration and AC units.',
    imageUrl: itiWorkshopImg,
    displayOrder: 10,
    isActive: true,
  },
  {
    id: 'course-plumbing',
    title: 'Plumbing',
    category: 'iti',
    shortDescription:
      'Practical pipe fitting, sanitary installation, water supply systems, and maintenance techniques for residential and site work.',
    imageUrl: itiWorkshopImg,
    displayOrder: 11,
    isActive: true,
  },
  {
    id: 'course-motor-mechanic',
    title: 'Motor Mechanic',
    category: 'iti',
    shortDescription:
      'Workshop-based training in engine inspection, vehicle servicing, mechanical repair, and diagnostic tool handling.',
    imageUrl: itiWorkshopImg,
    displayOrder: 12,
    isActive: true,
  },

  // Category D: Diploma Courses
  {
    id: 'course-diploma-programs',
    title: 'Diploma Courses (Engineering & Non-Engineering)',
    category: 'diploma',
    shortDescription:
      'Various career-focused diploma programs across engineering and non-engineering tracks. Please contact our office for current verified syllabus and batch details.',
    imageUrl: itiWorkshopImg,
    displayOrder: 13,
    isActive: true,
  },

  // Category E: Computer Courses
  {
    id: 'course-ms-office',
    title: 'MS Office',
    category: 'computer',
    shortDescription:
      'Complete practical mastery of Word, Excel spreadsheets, PowerPoint presentations, and essential office documentation.',
    imageUrl: computerLabImg,
    displayOrder: 14,
    isActive: true,
  },
  {
    id: 'course-tally',
    title: 'Tally (All Versions)',
    category: 'computer',
    shortDescription:
      'Practical accounting, GST billing, inventory management, and business bookkeeping across Tally versions.',
    imageUrl: computerLabImg,
    displayOrder: 15,
    isActive: true,
  },
  {
    id: 'course-graphic-designing',
    title: 'Graphic Designing',
    category: 'computer',
    shortDescription:
      'Visual layout, typography, branding graphics, and print-ready creative design workflows taught through studio exercises.',
    imageUrl: computerLabImg,
    displayOrder: 16,
    isActive: true,
  },
  {
    id: 'course-coreldraw',
    title: 'CorelDRAW',
    category: 'computer',
    shortDescription:
      'Vector illustration, signage, packaging, brochure layout, and commercial print preparation using CorelDRAW.',
    imageUrl: computerLabImg,
    displayOrder: 17,
    isActive: true,
  },
  {
    id: 'course-digital-marketing',
    title: 'Digital Marketing',
    category: 'computer',
    shortDescription:
      'Practical foundations in social media strategy, search visibility, content planning, and online campaign tools.',
    imageUrl: computerLabImg,
    displayOrder: 18,
    isActive: true,
  },
  {
    id: 'course-computer-language',
    title: 'Computer Language Practice',
    category: 'computer',
    shortDescription:
      'Guided hands-on coding exercises to build logic, syntax fluency, and confidence in programming languages.',
    imageUrl: computerLabImg,
    displayOrder: 19,
    isActive: true,
  },
  {
    id: 'course-english-typing',
    title: 'English Typing',
    category: 'computer',
    shortDescription:
      'Structured keyboard speed, accuracy drills, and formatting practice for academic and office readiness.',
    imageUrl: computerLabImg,
    displayOrder: 20,
    isActive: true,
  },

  // Category F: Paramedical Courses
  {
    id: 'course-dmlt',
    title: 'DMLT',
    category: 'paramedical',
    shortDescription:
      'Practical diagnostic laboratory training covering sample handling, microscopy, and foundational clinical testing procedures.',
    imageUrl: paramedicalLabImg,
    displayOrder: 21,
    isActive: true,
  },
  {
    id: 'course-physiotherapy',
    title: 'Physiotherapy',
    category: 'paramedical',
    shortDescription:
      'Supportive training in physical rehabilitation techniques, mobility assistance, and therapeutic exercise basics.',
    imageUrl: paramedicalLabImg,
    displayOrder: 22,
    isActive: true,
  },
  {
    id: 'course-diet-nutrition',
    title: 'Diet & Nutrition',
    category: 'paramedical',
    shortDescription:
      'Practical understanding of balanced nutrition, meal planning principles, and community wellness guidance.',
    imageUrl: paramedicalLabImg,
    displayOrder: 23,
    isActive: true,
  },
  {
    id: 'course-acupuncture',
    title: 'Acupuncture Therapy',
    category: 'paramedical',
    shortDescription:
      'Introductory and practical study of holistic pressure-point and traditional wellness therapy methods.',
    imageUrl: paramedicalLabImg,
    displayOrder: 24,
    isActive: true,
  },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'School Activities',
  'Classroom Activities',
  'Kindergarten',
  'Computer Courses',
  'Technical Training',
  'Paramedical Courses',
  'Events & Celebrations',
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-classroom-1',
    title: 'Interactive English Medium Classroom',
    category: 'Classroom Activities',
    caption: 'Students participating attentively in daily primary classroom sessions at ZBEM School.',
    imageUrl: heroClassroomImg,
    displayOrder: 1,
  },
  {
    id: 'gal-kindergarten-1',
    title: 'Activity-Based Kindergarten Corner',
    category: 'Kindergarten',
    caption: 'Early learners developing motor and social skills through wooden blocks, reading, and art.',
    imageUrl: schoolEarlyLearningImg,
    displayOrder: 2,
  },
  {
    id: 'gal-computer-1',
    title: 'Modern Computer Training Lab',
    category: 'Computer Courses',
    caption: 'Practical sessions in MS Office, Tally, CorelDRAW, Graphic Designing, and Digital Marketing.',
    imageUrl: computerLabImg,
    displayOrder: 3,
  },
  {
    id: 'gal-iti-1',
    title: 'ITI Electrical & RAC Workshop',
    category: 'Technical Training',
    caption: 'Supervised hands-on technical training with real electrical boards and RAC diagnostic tools.',
    imageUrl: itiWorkshopImg,
    displayOrder: 4,
  },
  {
    id: 'gal-paramedical-1',
    title: 'Paramedical Practical Laboratory',
    category: 'Paramedical Courses',
    caption: 'Guided laboratory training for DMLT and healthcare support learners.',
    imageUrl: paramedicalLabImg,
    displayOrder: 5,
  },
  {
    id: 'gal-admissions-2026',
    title: 'Admissions Open 2026 Official Notice',
    category: 'Events & Celebrations',
    caption: 'Official 2026 admission information poster for Zulekha Begam Educational Trust.',
    imageUrl: ADMISSION_POSTER_PATH,
    displayOrder: 6,
  },
];

export const DEFAULT_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-2026-admissions',
    title: 'Admissions Open for Academic Session 2026',
    body: 'Enquiries are open for Nursery, Jr. KG, Sr. KG, 1st to 5th Standard (ZBEM School) as well as ITI, Diploma, Computer, and Paramedical courses. Limited seats available.',
    isActive: true,
  },
  {
    id: 'ann-no-donation',
    title: 'Transparent & Accessible Admissions',
    body: 'Zulekha Begam Educational Trust follows a transparent admission process with no donation policy and personal guidance for parents and students.',
    isActive: true,
  },
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    title: 'Experienced Teachers',
    description: 'Dedicated, attentive faculty guiding school learners and vocational trainees step by step.',
    iconKey: 'GraduationCap',
  },
  {
    title: 'Practical Training',
    description: 'Hands-on labs and workshop exercises designed to build real-world confidence beyond textbooks.',
    iconKey: 'Wrench',
  },
  {
    title: 'Modern Learning',
    description: 'Structured classrooms, computer workstations, and contemporary teaching aids for clearer understanding.',
    iconKey: 'Monitor',
  },
  {
    title: 'Student Support',
    description: 'Individual attention, doubt clearing, and parent-teacher coordination for steady progress.',
    iconKey: 'HeartHandshake',
  },
  {
    title: 'Quality Education',
    description: 'Strong focus on English medium literacy, numeracy, discipline, and foundational clarity.',
    iconKey: 'BookOpenCheck',
  },
  {
    title: 'Skill Development',
    description: 'Job-ready technical, digital, accounting, design, and paramedical competencies.',
    iconKey: 'Award',
  },
  {
    title: 'Career Guidance',
    description: 'Mentorship helping students choose suitable learning tracks and prepare for employment opportunities.',
    iconKey: 'Compass',
  },
  {
    title: 'Affordable Learning Opportunities',
    description: 'Accessible, transparent education with zero donation policy so families can plan with confidence.',
    iconKey: 'ShieldCheck',
  },
] as const;

export const FACILITIES_ITEMS = [
  {
    title: 'Spacious Classrooms',
    description:
      'Bright, well-ventilated learning spaces arranged for comfortable seating, clear board visibility, and attentive group interaction.',
    image: heroClassroomImg,
  },
  {
    title: 'Computer Learning',
    description:
      'Dedicated workstations where students practice MS Office, Tally, CorelDRAW, Graphic Designing, typing, and coding hands-on.',
    image: computerLabImg,
  },
  {
    title: 'Practical Training',
    description:
      'Supervised technical and paramedical training setups equipped for electrical, RAC, mechanical, and laboratory practice.',
    image: itiWorkshopImg,
  },
  {
    title: 'Educational Activities',
    description:
      'Structured storytelling, drawing, phonics games, and activity tables that make kindergarten and primary learning engaging.',
    image: schoolEarlyLearningImg,
  },
  {
    title: 'Learning Resources',
    description:
      'Age-appropriate textbooks, visual charts, reference materials, and guided practice modules supporting every grade.',
    image: paramedicalLabImg,
  },
  {
    title: 'Student-Friendly Environment',
    description:
      'A safe, respectful, and encouraging campus atmosphere where every child and trainee feels supported to ask questions and grow.',
    image: schoolEarlyLearningImg,
  },
] as const;

export const SCHOOL_PILLARS = [
  {
    title: 'Early Childhood Education',
    description:
      'Nurturing curiosity, fine motor coordination, social comfort, and joyful curiosity in Nursery, Junior KG, and Senior KG.',
  },
  {
    title: 'English Medium Learning',
    description:
      'Clear English reading, writing, vocabulary, and everyday spoken confidence developed steadily from Kindergarten through Standard 5.',
  },
  {
    title: 'Activity-Based Learning',
    description:
      'Interactive classroom exercises, educational blocks, visual aids, and hands-on projects that turn abstract ideas into understanding.',
  },
  {
    title: 'Creative Development',
    description:
      'Drawing, storytelling, crafts, and expressive activities that build imagination alongside core academic discipline.',
  },
  {
    title: 'Basic Computer Education',
    description:
      'Age-appropriate introduction to computers and digital literacy so primary school students grow comfortable with technology early.',
  },
  {
    title: 'Student Development',
    description:
      'Balanced focus on manners, teamwork, personal hygiene, confidence, and regular communication with parents.',
  },
] as const;
