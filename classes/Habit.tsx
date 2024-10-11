export enum Cadence {
  Daily,
  Weekly,
  Monthly,
}

export enum Duration {
  // M = MONTH, Y = YEAR
  M1,
  M3,
  M6,
  Y1,
}

export type Habit = {
  habit: string;
  cadence: Cadence;
  isContinuous?: boolean;
  frequency?: number;
  endDate?: Date;
};

export interface HabitProps {
  habit: Habit;
}
