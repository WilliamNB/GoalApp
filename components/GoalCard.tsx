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
import { GoalProps } from "@/classes/Goal";
import { View } from "react-native";
import { Milestone } from "@/classes/Milestone";
import { formatGoalDate } from "@/functions/FormatGoalDate";

const GoalCard: React.FC<GoalProps> = (props) => {
  // State to track the milestones
  const [milestones, setMilestones] = React.useState<Milestone[]>(
    props.goal.milestones
  );

  const completedMilestonesCount = milestones.filter(
    (milestone) => milestone.completed
  ).length;

  // Handler to mark a milestone as completed
  const handleCompleteMilestone = (index: number) => {
    // Clone the milestones array
    const updatedMilestones = [...milestones];

    // Update the 'completed' status of the specific milestone
    updatedMilestones[index].completed = !milestones[index].completed;

    // Update the state with the modified milestones
    setMilestones(updatedMilestones);
    checkGoalCompleted();
  };

  const checkGoalCompleted = () => {
    milestones.every((milestone) => milestone.completed)
      ? (props.goal.completed = true)
      : (props.goal.completed = false);
  };

  return (
    <Card
      style={props.goal.completed ? styles.goalCardCompleted : styles.goalCard}
    >
      <Card.Content>
        <Text variant="titleLarge">{props.goal.goal}</Text>
        <Divider />
      </Card.Content>

      <Card.Content>
        <Text>Progress</Text>
        <ProgressBar
          progress={completedMilestonesCount / milestones.length}
          color="blue"
        />
      </Card.Content>

      <Card.Content>
        <List.Section>
          <List.Accordion
            title="Milestones"
            style={
              props.goal.completed
                ? styles.milestonesCompleted
                : styles.milestones
            }
            left={(accordionProps) => (
              <List.Icon {...accordionProps} icon="equal" />
            )}
          >
            {milestones.map((milestone, index) => (
              <View
                key={index} // Use the index as a key, or a unique identifier if available
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <List.Item title={milestone.milestone} />
                <Chip
                  icon={milestone.completed ? "check" : "information"}
                  onPress={() => handleCompleteMilestone(index)}
                  mode={milestone.completed ? "flat" : "outlined"}
                >
                  {milestone.completed ? "Completed" : "Complete"}
                </Chip>
              </View>
            ))}
          </List.Accordion>
        </List.Section>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{formatGoalDate(props.goal.date)}</Text>
          <Text>{props.goal.reward}</Text>
        </View>
      </Card.Content>

      <Divider />
    </Card>
  );
};

export default GoalCard;

const styles = StyleSheet.create({
  goalCard: {
    marginBottom: 16,
  },
  goalCardCompleted: {
    marginBottom: 16,
    backgroundColor: "#dcf5d7",
  },
  milestonesCompleted: {
    backgroundColor: "#dcf5d7",
  },
  milestones: {},
});
