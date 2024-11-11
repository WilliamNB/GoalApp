import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FullScreenView from "@/components/FullScreen";
import HabitList from "@/components/HabitList";
import { Cadence, Habit, HabitHistory } from "@/classes/Habit";
import FabComponent from "@/components/paper-components/FabComponent";
import React, { useEffect } from "react";
import AddHabit from "@/components/AddHabit";
import { DatabaseManager } from "@/database/DatabaseManager";
import HabitDisplay from "@/components/HabitDisplay";

export default function TabTwoScreen() {
  const [visible, setVisible] = React.useState(false);
  const [habits, setHabits] = React.useState<Habit[]>([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    //dbManager.clearStorage();
    getHabitsFromStorage(); // Fetch and load the habits when the component is mounted
  }, []);

  useEffect(() => {
    console.log("Habiits have changed ", habits);
  }, [habits]);

  const dbManager = new DatabaseManager();

  const createNewHabit = async (data: any) => {
    console.log("habbits ", habits);
    console.log("create habit data ", data);

    const habit: Habit = {
      habit: data.habit,
      cadence: data.cadence,
      isContinuous: data.isContinuous,
      frequency: data.frequency,
      endDate: data.endDate,
      habitHistory: [
        {
          date: new Date(), // Set to current date or any specific date
          completed: false,
        },
      ],
    };

    console.log("habit ", habit);
    //setHabits([...habits, habit]);
    setHabits((prevHabits) => [
      ...prevHabits,
      {
        ...habit,
        habitHistory: [
          ...habit.habitHistory, // If habit already has a history, preserve it
          {
            date: new Date(),
            completed: false,
          },
        ],
      },
    ]);

    console.log("habbits ", habits);

    try {
      await dbManager.setHabit(habit); // Save the new goal to AsyncStorage
      console.log("Habit successfully saved to AsyncStorage.", habit);
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const getHabitsFromStorage = async () => {
    let habits: Habit[] | null;
    try {
      habits = await dbManager.getAllHabits(); // Save the new goal to AsyncStorage
      if (habits) {
        setHabits(habits);
        console.log("habits successfully loaded and state updated.");
      } else {
        console.log("No habits found in storage.");
      }
    } catch (error) {
      console.error("Failed to retrieve habit:", error);
    }
  };

  return (
    <FullScreenView>
      <HabitDisplay habits={habits} setHabits={setHabits}></HabitDisplay>
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
