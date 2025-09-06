import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';

interface NewsCardProps {}

const NewsCard: React.FC<NewsCardProps> = () => {
  const schoolNews = {
    title: 'Winter Break Notice',
    description:
      'Classes will be suspended from Dec 20th to Jan 5th. Final exams schedule updated.',
    time: '2 hours ago',
  };
  return (
    <View style={styles.remarksContainer}>
      <Text style={styles.remarksTitle}>News and Announcements</Text>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.lineWrapper}>
            <View style={styles.verticalLine} />
          </View>

          <View style={styles.textContainer}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {schoolNews.title}
            </Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.description}
            >
              {schoolNews.description}
            </Text>

            <View style={styles.footerRow}>
              <Text style={styles.timeText}>{schoolNews.time}</Text>
              <Text style={styles.viewMoreText}>View more</Text>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  remarksContainer: {
    marginTop: 20,
  },
  remarksTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    shadowColor: 'transparent',
    borderRadius: 8,
    padding: 8,
    backgroundColor: 'rgba(251, 156, 139, 0.3)',
    borderWidth: 0.25,
    borderColor: '#EC221F',
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
    height: '100%',
    width: 2,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#EC221F',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#EC221F',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 10,
    color: '#858699',
  },
  viewMoreText: {
    fontSize: 10,
    color: '#6155F5',
  },
});

export default NewsCard;
