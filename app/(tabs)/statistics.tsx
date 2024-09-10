import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FullScreenView from "@/components/FullScreen";
import CardComponent from "@/components/paper-components/CardComponent";
import { Goal } from "@/classes/Goal";
import { Milestone } from "@/classes/Milestone";

export default function TabTwoScreen() {
  // const milestone1: Milestone = {
  //   milestone: "decide tech stack",
  //   completed: false,
  // };
  // const milestone2: Milestone = { milestone: "create mvp", completed: false };

  // const goal1: Goal = {
  //   goal: "Create this app",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };

  // const goal2: Goal = {
  //   goal: "Win a tennis tournament",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };

  // const goal3: Goal = {
  //   goal: "Pass driving test",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };
  // const goal6: Goal = {
  //   goal: "Create this app",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };

  // const goal4: Goal = {
  //   goal: "Win a tennis tournament",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };

  // const goal5: Goal = {
  //   goal: "Pass driving test",
  //   milestones: [milestone1, milestone2],
  //   date: new Date(2024, 6, 6),
  //   reward: "Launch Party",
  //   completed: false,
  // };

  // const goals: Goal[] = [goal1, goal2, goal3, goal4, goal5, goal6];

  return (
    <FullScreenView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Coming Soon!!!!</ThemedText>
      </ThemedView>
      {/* {goals.map((goal, index) => (
        <CardComponent key={index} goal={goal} />
      ))} */}
    </FullScreenView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
