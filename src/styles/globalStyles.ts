import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({

  splashContainer: {
    flex: 1,
    backgroundColor: "#a570ff",
    padding: 16,
    justifyContent: "center",
    alignItems:"center"
  }
  ,
  container: {
    flex: 1,
    backgroundColor: "#e4dfedff",
    padding: 16,
    justifyContent: "center",
    alignItems:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
     carouselItem: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  lottie: {
    width: 300,
    height: 300,
  },
  homeScreenButton:{
    marginBottom:"15%",
    width:"45%",
    height:"5%"
  }
});
