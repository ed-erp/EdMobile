import React from 'react';
import { BottomNavigation } from 'react-native-paper';

const routes = [
  { key: 'home', title: 'Home', focusedIcon: 'home-variant-outline' },
  { key: 'schedule', title: 'Schedule', focusedIcon: 'calendar-outline' },
  { key: 'analytics', title: 'Analytics', focusedIcon: 'chart-line' },
  { key: 'study', title: 'Study', focusedIcon: 'book-open-page-variant' },
  { key: 'profile', title: 'Profile', focusedIcon: 'account-circle-outline' },
];

const Scene = () => null;

const BottomTabs = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={BottomNavigation.SceneMap({
        home: Scene, schedule: Scene, analytics: Scene, study: Scene, profile: Scene,
      })}
      barStyle={{ backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#EAECF3' }}
      compact
      shifting={false}
    />
  );
};
export default BottomTabs;
