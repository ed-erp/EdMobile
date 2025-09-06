import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StudentCard from './StudentCard';
import AttendanceCard from './AttendanceCard';
import QuickActions from './QuickActions';
import RemarkCard from './RemarkCard';
import NewsCard from './NewsCard';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <StudentCard />
      <AttendanceCard />
      <QuickActions />
      <RemarkCard />
      <NewsCard />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
});

export default HomeScreen;
