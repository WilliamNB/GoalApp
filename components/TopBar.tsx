import * as React from "react";

import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";

type TopBarProps = {
  title: string;
};

const TopBar = (props: TopBarProps) => (
  <Appbar.Header elevated>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title={props.title} style={styles.title} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
  },
});

export default TopBar;
