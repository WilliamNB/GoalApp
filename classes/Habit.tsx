export enum Cadence {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export enum Duration {
  // M = MONTH, Y = YEAR
  M1 = "M1",
  M3 = "M3",
  M6 = "M6",
  Y1 = "Y1",
}

export interface HabitHistory {
  date: Date;
  completed: boolean;
}

export type Habit = {
  habit: string;
  cadence: Cadence;
  isContinuous?: boolean;
  frequency?: number;
  endDate?: Date;
  habitHistory: HabitHistory[];
};

export interface HabitProps {
  habit: Habit;
}

// export interface CustomDataType {
//   date: Date;
//   isCompleted: boolean;
//   isActive: boolean;
// }

// export interface MyObject {
//   id: number;
//   name: string;
//   dataArray: HabitHistory[];
// }
