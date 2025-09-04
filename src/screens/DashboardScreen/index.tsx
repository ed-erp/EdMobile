
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DashboardScreenNavigationProp } from '../../navigation/types';
import { navigateToLogin } from '../../navigation/navigationUtils';
import { DASHBOARD_MOCK_DATA } from './mockData';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const handleLogout = () => {
    navigateToLogin(navigation);
  };

  const handleQuickAction = (route: string) => {
    // TODO: Navigate to respective screens
    console.log(`Navigate to ${route}`);
  };

  const handleBottomTab = (route: string) => {
    // TODO: Navigate to respective screens
    console.log(`Navigate to ${route}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header Section */}
      <HeaderSection 
        school={DASHBOARD_MOCK_DATA.school}
        profileImage={DASHBOARD_MOCK_DATA.student.profileImage}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Student Profile Card */}
        <StudentProfileCard student={DASHBOARD_MOCK_DATA.student} />

        {/* Quick Actions Section */}
        <QuickActionsSection 
          actions={DASHBOARD_MOCK_DATA.quickActions}
          onActionPress={handleQuickAction}
        />

        {/* Announcements Section */}
        <AnnouncementsSection announcements={DASHBOARD_MOCK_DATA.announcements} />
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <BottomTabNavigation 
        tabs={DASHBOARD_MOCK_DATA.bottomTabs}
        onTabPress={handleBottomTab}
      />
    </SafeAreaView>
  );
};

// Header Component - Top section with school info and profile
const HeaderSection: React.FC<{
  school: { name: string; location: string; logo: string };
  profileImage: string;
  onLogout: () => void;
}> = ({ school, profileImage, onLogout }) => (
  <View style={styles.header}>
    <View style={styles.schoolInfo}>
      <View style={styles.schoolLogo}>
        <Text style={styles.schoolLogoText}>{school.logo}</Text>
      </View>
      <View style={styles.schoolText}>
        <Text style={styles.schoolName}>{school.name}</Text>
        <Text style={styles.schoolLocation}>{school.location}</Text>
      </View>
    </View>
    
    <View style={styles.headerActions}>
      <TouchableOpacity style={styles.notificationButton}>
        <Text style={styles.notificationIcon}>🔔</Text>
        <View style={styles.notificationDot} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.profileButton} onPress={onLogout}>
        <Text style={styles.profileImage}>{profileImage}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// Student Profile Card Component - Main student information with metrics
const StudentProfileCard: React.FC<{
  student: {
    name: string;
    class: string;
    stream: string;
    attendance: { percentage: number; absentCount: number; totalClasses: number };
    rank: { position: number; totalStudents: number };
  };
}> = ({ student }) => (
  <View style={styles.studentCard}>
    <View style={styles.studentInfo}>
      <Text style={styles.studentName}>{student.name}</Text>
      <Text style={styles.studentClass}>
        {student.class} | {student.stream}
      </Text>
    </View>
    
    <View style={styles.metricsContainer}>
      <MetricCard
        title="Attendance"
        icon="🕐"
        value={`${student.attendance.percentage}%`}
        subtitle={`Absent count ${student.attendance.absentCount}`}
        detail={`Total classes ${student.attendance.totalClasses}`}
        color="#9B59B6"
      />
      
      <MetricCard
        title="Rank"
        icon="📊"
        value={`#${student.rank.position}`}
        subtitle={`Out of ${student.rank.totalStudents} students`}
        detail="Class topper"
        color="#4A90E2"
      />
    </View>
  </View>
);

// Metric Card Component - Individual metric display
const MetricCard: React.FC<{
  title: string;
  icon: string;
  value: string;
  subtitle: string;
  detail: string;
  color: string;
}> = ({ title, icon, value, subtitle, detail, color }) => (
  <View style={[styles.metricCard, { backgroundColor: color }]}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricIcon}>{icon}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricSubtitle}>{subtitle}</Text>
    <Text style={styles.metricDetail}>{detail}</Text>
  </View>
);

// Quick Actions Section Component - Grid of action buttons
const QuickActionsSection: React.FC<{
  actions: Array<{ id: number; title: string; icon: string; color: string; route: string }>;
  onActionPress: (route: string) => void;
}> = ({ actions, onActionPress }) => (
  <View style={styles.quickActionsSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <TouchableOpacity>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
    
    <View style={styles.quickActionsGrid}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={[styles.actionButton, { backgroundColor: action.color }]}
          onPress={() => onActionPress(action.route)}
          activeOpacity={0.8}
        >
          <Text style={styles.actionIcon}>{action.icon}</Text>
          <Text style={styles.actionTitle}>{action.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// Announcements Section Component - List of announcements
const AnnouncementsSection: React.FC<{
  announcements: Array<{
    id: number;
    title: string;
    description: string;
    timestamp: string;
    isUrgent: boolean;
    isNew: boolean;
  }>;
}> = ({ announcements }) => (
  <View style={styles.announcementsSection}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Announcements</Text>
      <View style={styles.newIndicator}>
        <Text style={styles.newCount}>3 New</Text>
        <View style={styles.newDot} />
      </View>
    </View>
    
    {announcements.map((announcement) => (
      <AnnouncementCard key={announcement.id} announcement={announcement} />
    ))}
  </View>
);

// Announcement Card Component - Individual announcement display
const AnnouncementCard: React.FC<{
  announcement: {
    title: string;
    description: string;
    timestamp: string;
    isUrgent: boolean;
    isNew: boolean;
  };
}> = ({ announcement }) => (
  <View style={styles.announcementCard}>
    <View style={styles.announcementHeader}>
      <View style={styles.announcementTitleRow}>
        <Text style={styles.announcementIcon}>ℹ️</Text>
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
      </View>
      {announcement.isUrgent && (
        <View style={styles.urgentTag}>
          <Text style={styles.urgentText}>URGENT</Text>
        </View>
      )}
    </View>
    
    <Text style={styles.announcementDescription}>{announcement.description}</Text>
    <Text style={styles.announcementTimestamp}>{announcement.timestamp}</Text>
  </View>
);

// Bottom Tab Navigation Component - Fixed bottom navigation
const BottomTabNavigation: React.FC<{
  tabs: Array<{ id: number; title: string; icon: string; route: string; isActive: boolean }>;
  onTabPress: (route: string) => void;
}> = ({ tabs, onTabPress }) => (
  <View style={styles.bottomTabContainer}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.id}
        style={styles.bottomTab}
        onPress={() => onTabPress(tab.route)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.bottomTabIcon,
          tab.isActive && styles.bottomTabIconActive
        ]}>
          {tab.icon}
        </Text>
        <Text style={[
          styles.bottomTabTitle,
          tab.isActive && styles.bottomTabTitleActive
        ]}>
          {tab.title}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

// Styles - Pixel-perfect matching to the reference design
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  schoolInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  schoolLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9B59B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#9B59B6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  schoolLogoText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  schoolText: {
    flex: 1,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101114',
    marginBottom: 2,
    lineHeight: 20,
  },
  schoolLocation: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    position: 'relative',
    marginRight: 16,
    padding: 4,
  },
  notificationIcon: {
    fontSize: 20,
    color: '#666666',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E74C3C',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  profileImage: {
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  studentInfo: {
    marginBottom: 20,
  },
  studentName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#101114',
    marginBottom: 4,
    lineHeight: 28,
  },
  studentClass: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 20,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 120,
    justifyContent: 'space-between',
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  metricIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 2,
    textAlign: 'center',
    lineHeight: 14,
  },
  metricDetail: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 14,
  },
  quickActionsSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#101114',
    lineHeight: 24,
  },
  viewAllText: {
    fontSize: 14,
    color: '#9B59B6',
    fontWeight: '500',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 80,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 14,
  },
  announcementsSection: {
    marginBottom: 32,
  },
  newIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newCount: {
    fontSize: 14,
    color: '#7ED321',
    fontWeight: '500',
    marginRight: 8,
  },
  newDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#7ED321',
  },
  announcementCard: {
    backgroundColor: '#F8FFE8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#7ED321',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  announcementTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  announcementIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E74C3C',
    flex: 1,
    lineHeight: 20,
  },
  urgentTag: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  urgentText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 12,
  },
  announcementDescription: {
    fontSize: 14,
    color: '#101114',
    lineHeight: 20,
    marginBottom: 8,
  },
  announcementTimestamp: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 14,
  },
  bottomTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  bottomTabIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#999999',
  },
  bottomTabIconActive: {
    color: '#9B59B6',
  },
  bottomTabTitle: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    lineHeight: 14,
  },
  bottomTabTitleActive: {
    color: '#9B59B6',
    fontWeight: '600',
  },
});

export default DashboardScreen;