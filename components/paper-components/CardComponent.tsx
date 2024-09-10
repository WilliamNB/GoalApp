import * as React from "react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Icon,
  List,
  MD3Colors,
  ProgressBar,
  Text,
} from "react-native-paper";
import { Goal, GoalProps } from "@/classes/Goal";
import Stack from "@mui/material/Stack";
import { styled, Paper } from "@mui/material";
import { Feather } from "@expo/vector-icons";

//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const CardComponent = (props: GoalProps) => (
  <Card>
    {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
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
    {/* <Card.Content>
      <Stack direction="row" spacing={4}>
        <Stack direction="row" spacing={1}>
          <Feather name="gift" size={24} color="black" />
          <Text variant="titleSmall">{props.goal.reward}</Text>
        </Stack>
        <Text variant="titleSmall">{props.goal.date?.toDateString()}</Text>
      </Stack>
    </Card.Content> */}
    {/* <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions> */}
  </Card>
);

export default CardComponent;
