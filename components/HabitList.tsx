import React from "react";
import { View } from "react-native";
import { Habit } from "@/classes/Habit";
import HabitCard from "./HabitCard";

interface HabitListProps {
  habits: Habit[];
}

const HabitList: React.FC<HabitListProps> = ({ habits }) => {
  return (
    <View>
      {habits.map((habit, index) => (
        <HabitCard key={index} habit={habit} />
      ))}
    </View>
  );
};

export default HabitList;
