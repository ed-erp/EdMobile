import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

interface RemarkCardProps {}

const RemarkCard: React.FC<RemarkCardProps> = () => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const studentRemarks = {
    title: 'Excellent Performance',
    description:
      'Emma showed excellent performance in interhouse debate competition.',
  };

  return (
    <View style={styles.remarksContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.remarksTitle}>Recent Remarks</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.lineWrapper}>
            <View style={styles.verticalLine} />
          </View>

          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {studentRemarks.title}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.description}
            >
              {studentRemarks.description}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    remarksContainer: {
      marginTop: 20,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    remarksTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    viewAll: {
      fontSize: 10,
      color: '#6155F5',
    },
    card: {
      shadowColor: 'transparent',
      borderRadius: 8,
      padding: 8,
      backgroundColor: '#ECFFF4',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    lineWrapper: {
      justifyContent: 'center',
      marginVertical: 4,
      marginRight: 8,
    },
    verticalLine: {
      width: 2,
      flex: 1,
      borderRadius: 2,
      backgroundColor: '#00FF26',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#000',
      marginBottom: 4,
    },
    description: {
      fontSize: 12,
      color: '#6B7280',
    },
  });

export default RemarkCard;
