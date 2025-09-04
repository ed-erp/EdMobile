// Mock data for Dashboard screen - exactly matching the reference UI
export const DASHBOARD_MOCK_DATA = {
  school: {
    name: 'Guru Gobind Singh Public School',
    location: 'Sector - V/B, B.S.City',
    logo: '🎓', // Replace with actual image URL
  },
  student: {
    name: 'John Doe',
    class: 'Class 11-A',
    stream: 'Computer Science',
    profileImage: '👨‍💼', // Replace with actual image URL
    attendance: {
      percentage: 95.2,
      absentCount: 6,
      totalClasses: 121,
    },
    rank: {
      position: 1,
      totalStudents: 45,
    },
  },
  quickActions: [
    { id: 1, title: 'Timetable', icon: '📅', color: '#4A90E2', route: 'Timetable' },
    { id: 2, title: 'Marks', icon: '📊', color: '#7ED321', route: 'Marks' },
    { id: 3, title: 'Fees', icon: '💳', color: '#9B59B6', route: 'Fees' },
    { id: 4, title: 'Study', icon: '📚', color: '#F39C12', route: 'Study' },
    { id: 5, title: 'Attendance', icon: '✅', color: '#4A90E2', route: 'Attendance' },
    { id: 6, title: 'Syllabus', icon: '📋', color: '#7ED321', route: 'Syllabus' },
    { id: 7, title: 'My Teachers', icon: '👥', color: '#9B59B6', route: 'Teachers' },
    { id: 8, title: 'Appointment', icon: '📅👤', color: '#F39C12', route: 'Appointment' },
  ],
  announcements: [
    {
      id: 1,
      title: 'Winter Break Notice',
      description: 'Classes will be suspended from Dec 20th to Jan 5th. Final exams schedule updated.',
      timestamp: '2 hours ago',
      isUrgent: true,
      isNew: true,
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for next Friday. Please check your email for details.',
      timestamp: '1 day ago',
      isUrgent: false,
      isNew: true,
    },
    {
      id: 3,
      title: 'Sports Day Event',
      description: 'Annual sports day will be held on 15th December. Registration open.',
      timestamp: '3 days ago',
      isUrgent: false,
      isNew: true,
    },
  ],
  bottomTabs: [
    { id: 1, title: 'Home', icon: '🏠', route: 'Home', isActive: true },
    { id: 2, title: 'Schedule', icon: '📅', route: 'Schedule', isActive: false },
    { id: 3, title: 'Analytics', icon: '📈', route: 'Analytics', isActive: false },
    { id: 4, title: 'Study', icon: '📚', route: 'Study', isActive: false },
    { id: 5, title: 'Profile', icon: '👤', route: 'Profile', isActive: false },
  ],
};

// Types for the mock data
export interface SchoolInfo {
  name: string;
  location: string;
  logo: string;
}

export interface StudentInfo {
  name: string;
  class: string;
  stream: string;
  profileImage: string;
  attendance: {
    percentage: number;
    absentCount: number;
    totalClasses: number;
  };
  rank: {
    position: number;
    totalStudents: number;
  };
}

export interface QuickAction {
  id: number;
  title: string;
  icon: string;
  color: string;
  route: string;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  isUrgent: boolean;
  isNew: boolean;
}

export interface BottomTab {
  id: number;
  title: string;
  icon: string;
  route: string;
  isActive: boolean;
}

export interface DashboardData {
  school: SchoolInfo;
  student: StudentInfo;
  quickActions: QuickAction[];
  announcements: Announcement[];
  bottomTabs: BottomTab[];
}
