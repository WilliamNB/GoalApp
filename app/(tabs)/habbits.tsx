import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FullScreenView from "@/components/FullScreen";
import HabitList from "@/components/HabitList";
import { Cadence, Habit } from "@/classes/Habit";
import FabComponent from "@/components/paper-components/FabComponent";
import React from "react";
import AddHabit from "@/components/AddHabit";
import { DatabaseManager } from "@/database/DatabaseManager";

export default function TabTwoScreen() {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const habit1: Habit = {
    habit: "test habit",
    cadence: Cadence.Weekly,
    isContinuous: false,
    frequency: 4,
    endDate: new Date(),
  };

  const [habits, setHabits] = React.useState<Habit[]>([habit1]);

  const dbManager = new DatabaseManager();

  const createNewHabit = async (data: any) => {
    console.log("create habit", data);
    const habit: Habit = {
      habit: data.habit,
      cadence: data.cadence,
      isContinuous: data.isContinuous,
      frequency: data.frequency,
      endDate: data.endDate,
    };
    setHabits([...habits, habit]);
  };

  return (
    <FullScreenView>
      <View style={styles.container}>
        <HabitList habits={habits}></HabitList>
        <FabComponent onPress={showModal} />
      </View>
      <AddHabit
        visible={visible}
        onDismiss={hideModal}
        addHabit={createNewHabit}
      />
    </FullScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures container fills available space
    justifyContent: "flex-end", // Push the FabComponent to the bottom
    paddingBottom: 16, // Optional: Adds padding to avoid screen edge
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
