import { Milestone } from "./Milestone";

export type Goal = {
  goal: string;
  milestones?: Milestone[];
  date?: Date;
  reward?: string;
  completed: boolean;
};

export interface GoalProps {
  goal: Goal;
}
