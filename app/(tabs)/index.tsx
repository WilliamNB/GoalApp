import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FabComponent from "@/components/paper-components/FabComponent";
import FullScreenView from "@/components/FullScreen";
import React from "react";
import AddGoal from "@/components/AddGoal";
import { Milestone } from "@/classes/Milestone";
import { Goal } from "@/classes/Goal";
import GoalList from "@/components/GoalList";

export default function HomeScreen() {
  //const username = await AsyncStorage.getItem("test");
  const [visible, setVisible] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const createNewGoal = (data: any) => {
    console.log("create goal", data);
    const milestones: Milestone = {
      milestone: data.milestone,
      completed: false,
    };
    const goal: Goal = {
      goal: data.goal,
      milestones: data.milestones,
      completed: false,
      date: data.goalDate,
      reward: data.reward,
    };

    console.log(goal);
    setGoals([...goals, goal]);
  };

  return (
    <FullScreenView>
      <GoalList goals={goals} />
      <AddGoal
        visible={visible}
        onDismiss={hideModal}
        addGoal={createNewGoal}
      />
      <FabComponent onPress={showModal} />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">In Dev !!!</ThemedText>
      </ThemedView>
    </FullScreenView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
