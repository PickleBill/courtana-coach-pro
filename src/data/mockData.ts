export interface Coach {
  id: string;
  name: string;
  tier: 'celebrity' | 'certified' | 'rising';
  sport: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  price: number;
  priceLabel: string;
  avatar: string;
  network?: string;
  bio: string;
  slotsRemaining?: number;
  studentsCoached: number;
  sessionsReviewed: number;
}

export interface Player {
  id: string;
  name: string;
  dupr: number;
  age: number;
  location: string;
  sport: string;
  seeking: string;
  highlights: string[];
  avatar: string;
}

export interface CurriculumItem {
  id: string;
  title: string;
  description: string;
  type: 'drill' | 'video' | 'analysis';
  completed: boolean;
  coachFeedback?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  tier: 'silver' | 'gold' | 'platinum';
  pointsRequired: number;
  spotsRemaining: number;
  image: string;
}

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Ben Johns',
    tier: 'celebrity',
    sport: 'Pickleball',
    specialties: ['Third Shot Drop', 'Dinking Strategy', 'Tournament Prep'],
    rating: 4.97,
    reviewCount: 842,
    price: 750,
    priceLabel: 'per review',
    avatar: 'BJ',
    bio: 'World #1 ranked professional pickleball player. 30+ Triple Crown titles. Known for unmatched court IQ and shot selection.',
    slotsRemaining: 3,
    studentsCoached: 1247,
    sessionsReviewed: 3891,
  },
  {
    id: '2',
    name: 'Annalee Waters',
    tier: 'celebrity',
    sport: 'Pickleball',
    specialties: ['Speed-ups', 'Net Play', 'Mixed Doubles'],
    rating: 4.94,
    reviewCount: 615,
    price: 600,
    priceLabel: 'per review',
    avatar: 'AW',
    bio: 'Youngest pro to win a Triple Crown. Dominant in women\'s and mixed doubles. Explosive at the net.',
    slotsRemaining: 5,
    studentsCoached: 893,
    sessionsReviewed: 2764,
  },
  {
    id: '3',
    name: 'Marcus "The Wall" Chen',
    tier: 'certified',
    sport: 'Pickleball',
    specialties: ['Defensive Strategy', 'Reset Mechanics', 'Footwork'],
    rating: 4.88,
    reviewCount: 234,
    price: 120,
    priceLabel: 'per review',
    avatar: 'MC',
    network: 'Ben Johns',
    bio: 'Former D1 tennis player turned pickleball coach. Certified through Ben Johns\' coaching network. Specializes in transforming tennis players.',
    studentsCoached: 312,
    sessionsReviewed: 1456,
  },
  {
    id: '4',
    name: 'Sarah Kingsley',
    tier: 'certified',
    sport: 'Pickleball',
    specialties: ['Serve Strategy', 'Court Positioning', 'Mental Game'],
    rating: 4.82,
    reviewCount: 189,
    price: 95,
    priceLabel: 'per review',
    avatar: 'SK',
    network: 'Annalee Waters',
    bio: 'Sports psychologist and certified pickleball coach. Part of Annalee Waters\' coaching network. Focus on the mental side of competition.',
    studentsCoached: 267,
    sessionsReviewed: 1123,
  },
  {
    id: '5',
    name: 'Diego Ramirez',
    tier: 'certified',
    sport: 'Pickleball',
    specialties: ['Power Game', 'Singles Strategy', 'Athletic Training'],
    rating: 4.79,
    reviewCount: 156,
    price: 85,
    priceLabel: 'per review',
    avatar: 'DR',
    network: 'Ben Johns',
    bio: 'Former professional tennis player from Colombia. 15 years coaching experience across racquet sports. Part of the Ben Johns network.',
    studentsCoached: 198,
    sessionsReviewed: 876,
  },
  {
    id: '6',
    name: 'Jordan Park',
    tier: 'rising',
    sport: 'Pickleball',
    specialties: ['Transition Zone', 'Volleys', 'Game Analysis'],
    rating: 4.71,
    reviewCount: 67,
    price: 45,
    priceLabel: 'per review',
    avatar: 'JP',
    bio: 'DUPR 5.2, rising through the amateur ranks. 2 years competitive experience. Passionate about helping beginners find their game.',
    studentsCoached: 84,
    sessionsReviewed: 312,
  },
  {
    id: '7',
    name: 'Priya Desai',
    tier: 'rising',
    sport: 'Pickleball',
    specialties: ['Soft Game', 'Partner Communication', 'Rec to Competitive'],
    rating: 4.65,
    reviewCount: 43,
    price: 35,
    priceLabel: 'per review',
    avatar: 'PD',
    bio: 'DUPR 4.8. Former college badminton player. Brings racquet sport fundamentals to pickleball coaching with an emphasis on finesse.',
    studentsCoached: 56,
    sessionsReviewed: 198,
  },
  {
    id: '8',
    name: 'Anna Leigh Waters',
    tier: 'celebrity',
    sport: 'Pickleball',
    specialties: ['Power Game', 'Tournament Prep', 'Doubles Strategy'],
    rating: 5.0,
    reviewCount: 892,
    price: 500,
    priceLabel: 'per review',
    avatar: 'AW',
    bio: 'Multi-time Triple Crown champion. Youngest player to reach #1 world ranking. Known for explosive power and competitive fire.',
    slotsRemaining: 2,
    studentsCoached: 892,
    sessionsReviewed: 2891,
  },
  {
    id: '9',
    name: 'Tyson McGuffin',
    tier: 'celebrity',
    sport: 'Pickleball',
    specialties: ['Singles Strategy', 'Speed Training', 'Shot Selection'],
    rating: 4.9,
    reviewCount: 634,
    price: 400,
    priceLabel: 'per review',
    avatar: 'TM',
    bio: 'Former #1 singles player. Renowned for explosive athleticism and relentless competitiveness on court.',
    slotsRemaining: 5,
    studentsCoached: 634,
    sessionsReviewed: 2100,
  },
  {
    id: '10',
    name: 'Catherine Parenteau',
    tier: 'celebrity',
    sport: 'Pickleball',
    specialties: ['Finesse Play', 'Court Positioning', 'Mixed Doubles'],
    rating: 4.9,
    reviewCount: 521,
    price: 450,
    priceLabel: 'per review',
    avatar: 'CP',
    bio: 'Top-5 ranked pro with elite court IQ. Former Division I tennis player who transitioned to dominate pickleball.',
    slotsRemaining: 3,
    studentsCoached: 521,
    sessionsReviewed: 1890,
  },
  {
    id: '11',
    name: 'Jade Kawamoto',
    tier: 'certified',
    sport: 'Pickleball',
    specialties: ['Youth Development', 'Fundamentals', 'Footwork'],
    rating: 4.8,
    reviewCount: 187,
    price: 95,
    priceLabel: 'per review',
    avatar: 'JK',
    network: 'Anna Leigh Waters',
    bio: 'Certified youth coach specializing in developing the next generation of pickleball talent. Part of the Waters coaching network.',
    studentsCoached: 187,
    sessionsReviewed: 720,
  },
  {
    id: '12',
    name: 'Dekel Bar',
    tier: 'certified',
    sport: 'Pickleball',
    specialties: ['Power Serves', 'Transition Game', 'Video Analysis'],
    rating: 4.7,
    reviewCount: 156,
    price: 110,
    priceLabel: 'per review',
    avatar: 'DB',
    network: 'Tyson McGuffin',
    bio: 'Former Israeli national tennis team member. Combines power tennis background with detailed video analysis methodology.',
    studentsCoached: 156,
    sessionsReviewed: 580,
  },
  {
    id: '13',
    name: 'Rachel Rettger',
    tier: 'rising',
    sport: 'Pickleball',
    specialties: ['Beginner Coaching', 'Kitchen Play', 'Recreational Players'],
    rating: 4.6,
    reviewCount: 89,
    price: 45,
    priceLabel: 'per review',
    avatar: 'RR',
    bio: 'DUPR 5.0. Passionate about making pickleball accessible. Specializes in helping recreational players build confidence and consistency.',
    studentsCoached: 89,
    sessionsReviewed: 340,
  },
  {
    id: '14',
    name: 'Dylan Frazier',
    tier: 'rising',
    sport: 'Pickleball',
    specialties: ['Athletic Development', 'Cross-Training', 'Young Pros'],
    rating: 4.7,
    reviewCount: 67,
    price: 55,
    priceLabel: 'per review',
    avatar: 'DF',
    bio: 'DUPR 5.5. One of the youngest pros on tour. Brings high-energy coaching style focused on athletic development and competitive mindset.',
    studentsCoached: 67,
    sessionsReviewed: 245,
  },
  {
    id: '15',
    name: 'Lea Jansen',
    tier: 'certified',
    sport: 'Pickleball',
    specialties: ['Defensive Strategy', 'Rally Building', 'Mental Game'],
    rating: 4.8,
    reviewCount: 203,
    price: 120,
    priceLabel: 'per review',
    avatar: 'LJ',
    network: 'Ben Johns',
    bio: 'Known for her incredible defensive game and rally-building ability. Part of the Ben Johns coaching network. Focus on strategic play.',
    studentsCoached: 203,
    sessionsReviewed: 810,
  },
];

export const risingStars: Player[] = [
  {
    id: '1',
    name: 'Tyler Russo',
    dupr: 5.4,
    age: 22,
    location: 'Austin, TX',
    sport: 'Pickleball',
    seeking: 'Pro mentorship & coaching network placement',
    highlights: ['Texas State Open Finalist', '3x Local Tournament Champion', 'Former D2 Tennis'],
    avatar: 'TR',
  },
  {
    id: '2',
    name: 'Maya Okafor',
    dupr: 5.1,
    age: 19,
    location: 'Nashville, TN',
    sport: 'Pickleball',
    seeking: 'Sponsorship & coaching certification',
    highlights: ['Youngest TN State Qualifier', 'College Nationals MVP', 'Viral TikTok Coach'],
    avatar: 'MO',
  },
  {
    id: '3',
    name: 'Jake Morrison',
    dupr: 5.6,
    age: 26,
    location: 'San Diego, CA',
    sport: 'Pickleball',
    seeking: 'PPA Tour qualification & revenue opportunities',
    highlights: ['SoCal Open Champion', '4.0 → 5.5 in 18 months', 'CrossFit Athlete'],
    avatar: 'JM',
  },
  {
    id: '4',
    name: 'Kira Tanaka',
    dupr: 5.3,
    age: 21,
    location: 'Portland, OR',
    sport: 'Pickleball',
    seeking: 'Coaching certification & brand partnerships',
    highlights: ['Pacific NW Open Semifinalist', 'D1 Badminton Convert', 'Instagram 45K followers'],
    avatar: 'KT',
  },
  {
    id: '5',
    name: 'Darius Cole',
    dupr: 5.5,
    age: 24,
    location: 'Miami, FL',
    sport: 'Pickleball',
    seeking: 'Pro tour pathway & coaching network placement',
    highlights: ['Florida State Champion', 'Former ATP Challenger Tennis', 'Bilingual Coach (EN/ES)'],
    avatar: 'DC',
  },
  {
    id: '6',
    name: 'Anya Petrova',
    dupr: 5.0,
    age: 20,
    location: 'Denver, CO',
    sport: 'Pickleball',
    seeking: 'Rising star sponsorship & mentorship',
    highlights: ['Rocky Mountain Junior Champion', 'Fastest 3.0→5.0 in Colorado', 'Studying Sports Science'],
    avatar: 'AP',
  },
];

export const curriculumItems: CurriculumItem[] = [
  { id: '1', title: 'Third Shot Drop Fundamentals', description: 'Master the soft drop from the baseline to the kitchen line', type: 'drill', completed: true, coachFeedback: 'Great paddle angle. Work on follow-through consistency.' },
  { id: '2', title: 'Dink Pattern Recognition', description: 'Learn to read and exploit dinking patterns', type: 'video', completed: true, coachFeedback: 'You\'re reading cross-court dinks well. Add more inside-out variation.' },
  { id: '3', title: 'Transition Zone Movement', description: 'Footwork drills for the no-man\'s land area', type: 'drill', completed: false },
  { id: '4', title: 'Session Analysis: Serve & Return', description: 'Upload a match for AI + coach analysis of your serve game', type: 'analysis', completed: false },
  { id: '5', title: 'Speed-up Decision Making', description: 'When to attack vs reset — live drill scenarios', type: 'drill', completed: false },
  { id: '6', title: 'Final Assessment: Full Match Review', description: 'Complete match uploaded for comprehensive coach feedback', type: 'analysis', completed: false },
];

export const rewards: Reward[] = [
  {
    id: '1',
    title: 'Signed Pro Paddle',
    description: 'A paddle signed by your coaching pro — personalized with a message.',
    tier: 'silver',
    pointsRequired: 500,
    spotsRemaining: 47,
    image: '🏓',
  },
  {
    id: '2',
    title: 'Custom Courtana Gear Pack',
    description: 'Exclusive Courtana x Court Kings branded apparel set.',
    tier: 'silver',
    pointsRequired: 750,
    spotsRemaining: 120,
    image: '👕',
  },
  {
    id: '3',
    title: 'VIP PPA Championship Seats',
    description: 'Front row at the next PPA Championship event. Includes backstage meet & greet.',
    tier: 'gold',
    pointsRequired: 2000,
    spotsRemaining: 12,
    image: '🎟️',
  },
  {
    id: '4',
    title: 'Play With a Pro Event',
    description: 'Join a curated session where you play alongside a top-50 pro at a Courtana-powered court.',
    tier: 'gold',
    pointsRequired: 3000,
    spotsRemaining: 8,
    image: '🏟️',
  },
  {
    id: '5',
    title: 'Private Clinic with Ben Johns',
    description: '90-minute private clinic. Video recorded on Courtana for instant analysis and replay.',
    tier: 'platinum',
    pointsRequired: 10000,
    spotsRemaining: 2,
    image: '👑',
  },
  {
    id: '6',
    title: 'Courtside at Wimbledon',
    description: 'Two courtside tickets to Wimbledon. Travel and accommodation included.',
    tier: 'platinum',
    pointsRequired: 15000,
    spotsRemaining: 1,
    image: '🌍',
  },
];

export const ecosystemStats = {
  sessionsAnalyzed: 127843,
  coachesOnPlatform: 342,
  revenueGenerated: 2400000,
  facilitiesConnected: 48,
  playerSatisfaction: 94.7,
  avgCoachEarnings: 4200,
};

export const aiAnalysisResult = {
  overallGrade: 'B+',
  shotBreakdown: [
    { shot: 'Third Shot Drop', grade: 'A-', score: 87 },
    { shot: 'Dinking', grade: 'B+', score: 82 },
    { shot: 'Serve', grade: 'B', score: 78 },
    { shot: 'Return of Serve', grade: 'A', score: 91 },
    { shot: 'Volley', grade: 'B-', score: 74 },
    { shot: 'Overhead', grade: 'C+', score: 68 },
  ],
  strengths: ['Consistent baseline positioning', 'Strong return game', 'Good court awareness'],
  weaknesses: ['Overhead timing needs work', 'Transition zone footwork', 'Speed-up selection in neutral rallies'],
  drills: [
    'Wall drill: 100 overhead feeds at varying heights',
    'Split-step timing drill with partner feeds',
    'Speed-up / reset decision tree practice',
  ],
};

export const dashboardMetrics = {
  totalEarnings: 12750,
  monthlyEarnings: 3200,
  pendingReviews: 7,
  completedThisWeek: 23,
  avgReviewTime: '4.2 min',
  studentRetention: 89,
  totalStudents: 47,
  activeStudents: 34,
};
