import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import TopBar from "./TopBar";

type RootStackParamList = {
  index: { title: string };
  habbits: { title: string };
  statistics: { title: string };
  partners: { title: string };
};

type GenericScreenRouteProp = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

// Define a type for the props
interface FullScreenViewProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

// Create the functional component
const FullScreenView: React.FC<FullScreenViewProps> = ({
  children,
  backgroundColor = "#fff",
}) => {
  const route = useRoute<GenericScreenRouteProp>();
  const { title } = route.params;
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <TopBar title={title}></TopBar>
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});

export default FullScreenView;
