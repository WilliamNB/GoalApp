import * as React from "react";
import {
  Card,
  Divider,
  List,
  MD3Colors,
  ProgressBar,
  Text,
} from "react-native-paper";
import Grid from "@mui/material/Grid";
import { GoalProps } from "@/classes/Goal";
import { Item } from "react-native-paper/lib/typescript/components/List/List";
import { Paper, Typography } from "@mui/material";
import { View } from "react-native";

const GoalCard = (props: GoalProps) => (
  <Card>
    <Card.Content>
      <Text variant="titleLarge">{props.goal.goal}</Text>
      <Divider />
    </Card.Content>
    <Card.Content>
      <Text>Progress</Text>
      <ProgressBar progress={0.5} color={MD3Colors.primary50} />
    </Card.Content>

    <Card.Content>
      <List.Section>
        <List.Accordion
          title="Milestones"
          left={(props) => <List.Icon {...props} icon="equal" />}
        >
          {props.goal.milestones.map((milestone) => (
            <List.Item title={milestone.milestone} />
          ))}
        </List.Accordion>
      </List.Section>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{props.goal.date?.toDateString()}</Text>
        <Text>{props.goal.reward}</Text>
      </View>
    </Card.Content>

    <Divider />
  </Card>
);

export default GoalCard;
