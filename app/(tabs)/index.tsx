import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FabComponent from "@/components/paper-components/FabComponent";
import FullScreenView from "@/components/FullScreen";
import React, { useEffect } from "react";
import AddGoal from "@/components/AddGoal";
import { Milestone } from "@/classes/Milestone";
import { Goal } from "@/classes/Goal";
import GoalList from "@/components/GoalList";
import { DatabaseManager } from "@/database/DatabaseManager";

export default function HomeScreen() {
  //const username = await AsyncStorage.getItem("test");
  const [visible, setVisible] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    getGoalsFromStorage(); // Fetch and load the goal when the component is mounted
  }, []);

  const dbManager = new DatabaseManager();

  const createNewGoal = async (data: any) => {
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

    try {
      await dbManager.setGoal(goal); // Save the new goal to AsyncStorage
      console.log("Goal successfully saved to AsyncStorage.");
    } catch (error) {
      console.error("Failed to save goal:", error);
    }
  };

  const getGoalsFromStorage = async () => {
    let goals: Goal[] | null;
    try {
      goals = await dbManager.getAllGoals(); // Save the new goal to AsyncStorage
      if (goals) {
        setGoals(goals);
        console.log("Goal successfully loaded and state updated.");
      } else {
        console.log("No goal found in storage.");
      }
    } catch (error) {
      console.error("Failed to retrieve goal:", error);
    }
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
