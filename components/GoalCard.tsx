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

const GoalCard: React.FC<GoalProps> = (props) => {
  const dbManager = new DatabaseManager();

  // State to track the milestones
  const [milestones, setMilestones] = React.useState<Milestone[]>(
    props.goal.milestones ?? []
  );

  const [goal, setgoal] = React.useState<Goal>(props.goal);

  const [goalStyle, setGoalStyle] = React.useState(styles.goalCard);

  React.useEffect(() => {
    console.log("goal has been updated, ", goal);
    dbManager.setGoal(goal);

    if (goal.completed) {
      setGoalStyle(styles.goalCardCompleted);
    } else if (isDateBeforeToday(goal.date)) {
      setGoalStyle(styles.goalCardBehind);
    } else {
      setGoalStyle(styles.goalCard);
    }
  }, [goal]);

  const completedMilestonesCount = milestones.filter(
    (milestone) => milestone.completed
  ).length;

  // Handler to mark a milestone as completed
  const handleCompleteMilestone = (index: number) => {
    console.log("gsgs", goal);
    // Clone the milestones array
    const updatedMilestones = [...milestones];

    // Update the 'completed' status of the specific milestone
    updatedMilestones[index].completed = !milestones[index].completed;

    // Update the state with the modified milestones
    let updatedGoal: Goal = { ...goal, milestones: updatedMilestones };
    setgoal(updatedGoal);
    setMilestones(updatedMilestones);
    checkGoalCompleted();
  };

  // Handler to mark a goal as completed
  const handleCompleteGoal = (completed: boolean) => {
    console.log("handle complete", props.goal, completed);
    let updatedGoal: Goal = { ...goal, completed: completed };
    setgoal(updatedGoal);
  };

  const checkGoalCompleted = () => {
    milestones.every((milestone) => milestone.completed)
      ? handleCompleteGoal(true)
      : handleCompleteGoal(false);
  };

  const isDateBeforeToday = (inputDate?: Date): boolean => {
    if (!inputDate) {
      // If no date is provided, return false (assumes a missing date is not after today)
      return false;
    }
    const today = new Date();
    // Reset today's time to 00:00:00 for comparison purposes
    today.setHours(0, 0, 0, 0);
    const normalizedInputDate = new Date(inputDate);
    // Reset inputDate's time to 00:00:00
    normalizedInputDate.setHours(0, 0, 0, 0);

    // Compare the two dates (ignoring time)
    return normalizedInputDate < today;
  };

  // const getGoalCardStyle = (): object => {
  //   if (goal.completed) {
  //     return styles.goalCardCompleted;
  //   }
  //   return isDateBeforeToday(goal.date)
  //     ? styles.goalCardBehind
  //     : styles.goalCard;
  // };

  return (
    <Card style={goalStyle}>
      <Card.Content>
        <Text variant="titleLarge">{props.goal.goal}</Text>
        <Divider />
      </Card.Content>
      {milestones.length > 0 && (
        <Card.Content>
          <Text>Progress</Text>
          <ProgressBar
            progress={completedMilestonesCount / milestones.length}
            color="blue"
          />
        </Card.Content>
      )}

      <Card.Content>
        {milestones.length > 0 && (
          <List.Section>
            <List.Accordion
              title="Milestones"
              style={goalStyle}
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
                    alignItems: "center",
                  }}
                >
                  <List.Item
                    title={milestone.milestone}
                    style={{
                      flex: 1,
                      paddingLeft: 0,
                      marginLeft: -50,
                    }}
                  />
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
        )}
        {milestones.length === 0 && (
          <Chip
            icon={goal.completed ? "check" : "information"}
            onPress={() => handleCompleteGoal(!goal.completed)}
            mode={goal.completed ? "flat" : "outlined"}
          >
            {goal.completed ? "Completed" : "Complete Goal"}
          </Chip>
        )}

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
  goalCardBehind: {
    marginBottom: 16,
    backgroundColor: "#fcbf7e",
  },
  milestonesCompleted: {
    backgroundColor: "#dcf5d7",
  },
  milestones: {},
});
