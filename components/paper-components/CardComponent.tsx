import * as React from "react";
import {
  Card,
  Divider,
  List,
  MD3Colors,
  ProgressBar,
  Text,
} from "react-native-paper";
import { GoalProps } from "@/classes/Goal";

const CardComponent = (props: GoalProps) => (
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
    </Card.Content>

    <Divider />
  </Card>
);

export default CardComponent;
