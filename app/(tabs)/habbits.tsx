import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FullScreenView from "@/components/FullScreen";

export default function TabTwoScreen() {
  return (
    <FullScreenView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Coming Soon !!!</ThemedText>
      </ThemedView>
    </FullScreenView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
