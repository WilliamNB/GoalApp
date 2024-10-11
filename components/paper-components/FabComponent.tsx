import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

interface FabComponentProps {
  onPress: () => void;
}

const FabComponent: React.FC<FabComponentProps> = ({ onPress }) => (
  <FAB icon="plus" style={styles.fab1} onPress={onPress} />
);

const styles = StyleSheet.create({
  fab1: {
    position: "relative", // No absolute positioning to keep it in flow
    alignSelf: "flex-end", // Align to the right side
    marginVertical: 16, // Add vertical spacing
    marginRight: 16, // Spacing from the right screen edge
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default FabComponent;
