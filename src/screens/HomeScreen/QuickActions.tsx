import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import TimeTableIcon from '../../icons/TimeTableIcon';
import MarksIcon from '../../icons/MarksIcon';
import FeesIcon from '../../icons/FeesIcon';
import StudyIcon from '../../icons/StudyIcon';
import AttendanceIcon from '../../icons/AttendanceIcon';
import SyllabusIcon from '../../icons/SyllabusIcon';
import TeacherIcon from '../../icons/TeacherIcon';
import VisitsIcon from '../../icons/VisitsIcon';

interface Action {
  label: string;
  icon: React.FC<{ width: string; height: string; color: string }>; 
  color: string;
  width: string;
  height: string;
}

interface QuickActionsProps {}

const QuickActions: React.FC<QuickActionsProps> = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const actions: Action[] = [
  {
    label: 'Timetable',
    icon: TimeTableIcon,
    color: '#3b82f6', // blue
    width: '24px',
    height: '24px',
  },
  {
    label: 'Marks',
    icon: MarksIcon,
    color: '#22c55e', // green
    width: '24px',
    height: '24px',
  },
  {
    label: 'Fees',
    icon: FeesIcon,
    color: '#d946ef', // fuchsia
    width: '24px',
    height: '24px',
  },
  {
    label: 'Study',
    icon: StudyIcon,
    color: '#f97316', // orange
    width: '21px',
    height: '21px',
  },
  {
    label: 'Attendance',
    icon: AttendanceIcon,
    color: '#14b8a6', // teal
    width: '22px',
    height: '22px',
  },
  {
    label: 'Syllabus',
    icon: SyllabusIcon,
    color: '#eab308', // amber/gold
    width: '24px',
    height: '24px',
  },
  {
    label: 'Teachers',
    icon: TeacherIcon,
    color: '#6366f1', // indigo
    width: '24px',
    height: '24px',
  },
  {
    label: 'Visits',
    icon: VisitsIcon,
    color: '#ef4444', // red
    width: '24px',
    height: '24px',
  },
];


  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map(action => {
          const IconComponent = action.icon;
          return (
            <View style={[styles.action, { borderColor: action.color }]}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: action.color },
                ]}
              >
                <IconComponent
                  width={action.width}
                  height={action.height}
                  color="#ffffff"
                />
              </View>
              <Text style={[styles.label, { color: action.color }]}>
                {action.label}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    quickActionsContainer: {
      marginTop: 20,
    },
    quickActionsTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 8,
    },
    action: {
      width: 70,
      height: 90,
      borderRadius: 16,
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 6,
    },
    label: {
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
    },
  });

export default QuickActions;
