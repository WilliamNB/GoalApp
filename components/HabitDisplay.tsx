import React from "react";
import { Cadence, Habit, HabitHistory } from "@/classes/Habit";
import HabitCard from "./HabitCard";
import { StyleSheet, View, Image, Text } from "react-native";
import Swiper from "react-native-swiper";
import { Chip } from "react-native-paper";
import { DatabaseManager } from "@/database/DatabaseManager";

interface HabitListProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

const HabitDisplay: React.FC<HabitListProps> = ({ habits, setHabits }) => {
  const dbManager = new DatabaseManager();

  const dailyHabits = habits.filter((habit) => habit.cadence == Cadence.Daily);
  console.log("daily habits", dailyHabits);
  const weeklyHabits = habits.filter(
    (habit) => habit.cadence == Cadence.Weekly
  );
  const monthlyHabits = habits.filter(
    (habit) => habit.cadence == Cadence.Monthly
  );

  const handleCompleteHabit = async (habitId: string) => {
    console.log("complete habit", habitId);
    await dbManager.markHabitComplete(habitId);

    // Update the local habits state with the completed habit
    const updatedHabits = habits.map((habit) =>
      habit.habit === habitId
        ? {
            ...habit,
            habitHistory: [
              ...habit.habitHistory,
              { date: new Date(), completed: true },
            ],
          }
        : habit
    );

    // Update the habits state
    setHabits(updatedHabits);
  };

  return (
    <Swiper style={styles.wrapper} showsButtons={true}>
      <View style={styles.slide1}>
        <Text style={styles.text}>Daily Habits</Text>
        {dailyHabits.map((habit) => (
          <View>
            <Text key={habit.habit}>{habit.habit}</Text>
            <Chip
              icon={
                habit.habitHistory.pop()?.completed ? "check" : "information"
              }
              onPress={() => handleCompleteHabit(habit.habit)}
              mode={habit.habitHistory.pop()?.completed ? "flat" : "outlined"}
            >
              {habit.habitHistory.pop()?.completed ? "Completed" : "Complete"}
            </Chip>
          </View>
        ))}
      </View>
      <View style={styles.slide2}>
        <Text style={styles.text}>Weekly Habits</Text>
        {weeklyHabits.map((habit) => (
          <Text key={habit.habit}>{habit.habit}</Text>
        ))}
      </View>
      <View style={styles.slide3}>
        <Text style={styles.text}>Monthly Habits</Text>
        {monthlyHabits.map((habit) => (
          <Text key={habit.habit}>{habit.habit}</Text>
        ))}
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default HabitDisplay;
