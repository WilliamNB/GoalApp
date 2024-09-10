import { Goal } from "@/classes/Goal";
import React from "react";
import GoalCard from "./GoalCard";
import CardComponent from "./paper-components/CardComponent";
import { View } from "react-native";

interface GoalListProps {
  goals: Goal[];
}

const GoalList: React.FC<GoalListProps> = ({ goals }) => {
  return (
    <View>
      {goals.map((goal, index) => (
        <GoalCard key={index} goal={goal} />
      ))}
    </View>
  );
};

export default GoalList;
