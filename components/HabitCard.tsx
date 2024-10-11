import * as React from "react";
import { StyleSheet } from "react-native";
import {
  Card,
  Chip,
  Divider,
  List,
  MD3Colors,
  ProgressBar,
  Text,
} from "react-native-paper";
import { Goal, GoalProps } from "@/classes/Goal";
import { View } from "react-native";
import { Milestone } from "@/classes/Milestone";
import { formatGoalDate } from "@/functions/FormatGoalDate";
import { DatabaseManager } from "@/database/DatabaseManager";
import { Cadence, HabitProps } from "@/classes/Habit";

const HabitCard: React.FC<HabitProps> = (props) => {
  return (
    <Card style={styles.goalCard}>
      <Card.Content>
        <Text variant="titleLarge">{props.habit.habit}</Text>
        <Divider />
      </Card.Content>

      <Card.Content>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Cadence: {Cadence[props.habit.cadence]}</Text>
          <Text>Frequency: {props.habit.frequency}x </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Duration type {props.habit.isContinuous}</Text>
          <Text>End Date {formatGoalDate(props.habit.endDate)}</Text>
        </View>
      </Card.Content>

      <Divider />
    </Card>
  );
};

export default HabitCard;

const styles = StyleSheet.create({
  goalCard: {
    marginBottom: 16,
  },
  goalCardCompleted: {
    marginBottom: 16,
    backgroundColor: "#dcf5d7",
  },
  goalCardBehind: {
    marginBottom: 16,
    backgroundColor: "#fcbf7e",
  },
  milestonesCompleted: {
    backgroundColor: "#dcf5d7",
  },
  milestones: {},
});
