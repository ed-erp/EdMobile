import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navigation/types';

// Import all JSON files (assuming they are Lottie animation JSONs)
import carousel1 from '../../Images/Carousel/Carousel1.json';
import carousel2 from '../../Images/Carousel/Carousel2.json';
import carousel3 from '../../Images/Carousel/Carousel3.json';
import { globalStyles } from '../../styles/globalStyles';
import { Button,Provider as PaperProvider, Text, useTheme } from "react-native-paper";


const { width } = Dimensions.get("window");

// Since the JSON files are Lottie objects (not arrays), collect them as an array of sources
const carouselData = [carousel1, carousel2, carousel3];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const isScrollingRef = useRef<boolean>(false);
const theme = {
  ...useTheme(),
  colors: {
    ...useTheme().colors,
    primary: "#714FFF", // Purple from Figma design
  },
};
  console.log('HomeScreen: Component rendered');

  // Auto scroll effect with improved timing and error handling
  useEffect(() => {
    console.log('HomeScreen: useEffect triggered');
    const interval = setInterval(() => {
      // Don't scroll if already scrolling
      if (isScrollingRef.current) return;

      const nextIndex = (currentIndex + 1) % carouselData.length;
      setCurrentIndex(nextIndex);
      
      // Safe scroll with better error handling
      if (flatListRef.current) {
        isScrollingRef.current = true;
        try {
          flatListRef.current.scrollToIndex({ 
            index: nextIndex, 
            animated: true,
            viewPosition: 0.5 // Center the item
          });
        } catch (error) {
          console.warn('Scroll failed:', error);
          // Fallback to scrollToOffset
          try {
            flatListRef.current.scrollToOffset({
              offset: nextIndex * width,
              animated: true
            });
          } catch (offsetError) {
            console.warn('Offset scroll also failed:', offsetError);
          }
        }
        
        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500); // Give time for scroll animation
      }
    }, 3000); // Increased to 3 seconds for better UX

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle manual scroll events
  const onScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
    isScrollingRef.current = false;
  };

  const handleGetStarted = () => {
    console.log('HomeScreen: Get Started button pressed, navigating to Login');
    navigation.navigate('Login');
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={globalStyles.carouselItem}>
      <LottieView
        source={item}
        autoPlay={true}
        loop={true}
        style={globalStyles.lottie}
        resizeMode="contain"
      />
    </View>
  );

  const keyExtractor = (_: any, index: number): string => index.toString();

  return (
    <View style={globalStyles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        
        onScrollToIndexFailed={(info) => {
          console.warn('ScrollToIndexFailed:', info);
          // Fallback strategy
          setTimeout(() => {
            if (flatListRef.current) {
              try {
                flatListRef.current.scrollToOffset({
                  offset: info.index * width,
                  animated: true
                });
              } catch (error) {
                console.warn('Fallback scroll failed:', error);
              }
            }
          }, 100);
        }}

        // Performance optimizations
        removeClippedSubviews={false} // Important for scroll reliability
        initialNumToRender={carouselData.length}
        maxToRenderPerBatch={carouselData.length}
        windowSize={carouselData.length}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
       <PaperProvider theme={theme} >
        <View style={styles.subcontainer}>
        {/* Title */}
        <Text style={styles.title}>Welcome to Viora</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Where learning meets connection</Text>

        {/* Spacer */}
        <View style={{ height: 40 }} />

        {/* Get Started Button */}
        <Button
          mode="contained"
          onPress={() => handleGetStarted()}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          style={styles.button}
        >
          Get Started
        </Button>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          By clicking ‘Get Started’ you acknowledge that you have read and understood, 
          and agree to Sikshamitra’s Terms & Conditions and Privacy Policy.
        </Text>
        </View>
    </PaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  getStartedButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 20,
    paddingVertical: 8,
    width:"100%"
  }, 
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  subcontainer: {
  marginTop: 80, // Increase this value as needed
  marginBottom: 30, // Optional: add some space from the bottom

  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "#1A1A1A",
    marginBottom: 8,
    fontFamily: "Calibri", // Add this line
  },
  subtitle: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    color: "#5A5A5A",
    fontFamily: "Calibri", // Add this line
  },
  button: {
    borderRadius: 12,
    width: "100%",
    // color:"#714FFF",
    fontFamily: "Calibri", // Add this line (for Button label, see note below)
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Calibri", // Add this line
  },
  disclaimer: {
    fontSize: 12,
    textAlign: "center",
    color: "#7A7A7A",
    marginTop: 16,
    lineHeight: 18,
    fontFamily: "Calibri", // Add this line
  },
});

export default HomeScreen;

 

