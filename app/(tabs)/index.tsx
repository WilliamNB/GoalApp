import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import FabComponent from "@/components/paper-components/FabComponent";
import FullScreenView from "@/components/FullScreen";
import React from "react";
import AddGoal from "@/components/AddGoal";
import { Milestone } from "@/classes/Milestone";
import { Goal } from "@/classes/Goal";
import GoalList from "@/components/GoalList";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";

export default function HomeScreen() {
  //const username = await AsyncStorage.getItem("test");
  const [visible, setVisible] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [date, setDate] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate]
  );

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
      date: data.date,
      reward: data.reward,
    };

    console.log(goal);
    setGoals([...goals, goal]);

    // const milestones: Milestone = {
    //   milestone: "get to final",
    //   completed: false,
    // };
    // const goal: Goal = {
    //   goal: "win tennis tournamenet",
    //   milestones: [milestones],
    //   completed: false,
    //   date: new Date(),
    //   reward: "new racket",
    // };

    // console.log(goal);
    // setGoals([...goals, goal]);
  };

  //const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <FullScreenView>
      <GoalList goals={goals} />
      <AddGoal visible={visible} onDismiss={hideModal} onTest={createNewGoal} />
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
