import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ProgressBar, useTheme } from 'react-native-paper';
import CheckBoxIcon from '../../icons/CheckBoxIcon';
import CircleIcon from '../../icons/CircleIcon';
import CheckBoxCrossIcon from '../../icons/CheckboxCrossIcon';

interface AttendanceCardProps {}

const AttendanceCard: React.FC<AttendanceCardProps> = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const attendanceDays = [
    { label: 'Mon', present: true },
    { label: 'Tue', present: true },
    { label: 'Wed', present: true },
    { label: 'Thu', present: false },
    { label: 'Fri', present: true },
    { label: 'Sat', present: null },
    { label: 'Sun', present: null },
  ];

  const getIcon = (present: boolean | null) => {
    if (present === true)
      return <CheckBoxIcon height="16px" width="16px" color="#34C759" />;
    if (present === false)
      return <CheckBoxCrossIcon height="15px" width="15px" color="#EC221F" />;
    return <CircleIcon height="16px" width="16px" color="#758CA3" />;
  };

  return (
    <Card style={styles.attendanceCard}>
      <View style={styles.attendanceContainer}>
        <View style={styles.attendanceDataContainer}>
          <View style={styles.headerRow}>
            <View style={styles.attendanceTitleContainer}>
              <Text style={styles.attendanceTitle}>Attendance</Text>
            </View>
            <View style={styles.daysRow}>
              {attendanceDays.map((d, idx) => (
                <View key={idx} style={styles.dayContainer}>
                  {getIcon(d.present)}
                  <Text style={styles.dayLabel}>{d.label}</Text>
                </View>
              ))}
            </View>
          </View>

          <ProgressBar
            progress={95 / 100}
            color="#34C759"
            style={styles.progressBar}
          />
        </View>
        <View style={styles.attendancePercentContainer}>
          <Text style={styles.attendancePercentText}>{95}%</Text>
        </View>
      </View>
    </Card>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    attendanceCard: {
      shadowColor: 'transparent',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      borderColor: '#D9D9D9',
        borderWidth: 0.5,
    },
    attendanceContainer: {
      borderRadius: 8,
      flexDirection: 'row',
      borderColor: '#D9D9D9',
    },
    attendanceDataContainer: {
      paddingTop: theme.spacing.xs,
      paddingBottom: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      flex: 8,
    },
    attendancePercentContainer: {
      justifyContent: 'center',
      backgroundColor: 'rgba(97, 85, 245, 0.2)',
      flex: 2,
      alignItems: 'center',
      borderRadius: 8,
      overflow: 'hidden',
    },
    headerRow: {
      flexDirection: 'row',
      marginBottom: theme.spacing.sm,
    },
    attendanceTitleContainer: {
      flex: 4,
    },
    daysRow: {
      marginTop: 4,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 0,
      flex: 6,
    },
    attendanceTitle: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    attendancePercentText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#27C840',
    },
    dayContainer: {
      alignItems: 'center',
    },
    dayLabel: {
      fontSize: 10,
      color: '#444',
    },
    progressBar: {
      height: 6,
      borderRadius: 8,
    },
  });

export default AttendanceCard;
