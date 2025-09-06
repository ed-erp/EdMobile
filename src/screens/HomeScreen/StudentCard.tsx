import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

interface StudentCardProps {}

const StudentCard: React.FC<StudentCardProps> = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const studentData = {
    name: 'Rahul Kumar Singh',
    grade: 'Grade 10 - A',
    message: 'Today is a great day to learn something new',
    imagePath: require('../../../assets/profile-photo.png'),
  };

  return (
    <Card style={styles.studentCard}>
      <View style={styles.cardContainer}>
        <View style={styles.nameAndGradeContainer}>
          <Text style={styles.studentName}>{studentData.name}</Text>
          <Text style={styles.studentGrade}>{studentData.grade}</Text>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.message}>
            {studentData.message}
          </Text>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={studentData.imagePath} style={styles.image} />
        </View>
      </View>
    </Card>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    studentCard: {
      borderRadius: 8,
      backgroundColor: '#C39FED',
      paddingBottom: 12,
      paddingStart: 12,
      paddingEnd: 12,
      paddingTop: 8,
      marginVertical: 12,
      overflow: 'hidden',
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    nameAndGradeContainer: {
      flex: 1,
      paddingRight: 12,
    },
    studentName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.customTextPrimary,
    },
    studentGrade: {
      fontSize: 14,
      color: '#FFFFFF',
      marginTop: 2,
      marginBottom: theme.spacing?.xl ?? 12,
    },
    message: {
      fontSize: 12,
      color: '#000000',
    },
    imageWrapper: {
      width: 68,
      height: 85,
      overflow: 'hidden',
    },
    image: {
      borderRadius: theme.spacing?.md ?? 8,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });

export default StudentCard;
