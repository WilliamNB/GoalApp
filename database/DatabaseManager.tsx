import { Goal } from "@/classes/Goal";
import { Habit } from "@/classes/Habit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class DatabaseManager {
  private static GOAL_KEY = "user_goal"; // Storage key for goal
  private static HABIT_KEY = "user_habit";

  // Method to save a Goal to AsyncStorage
  async setGoal(goal: Goal): Promise<void> {
    try {
      const goalString = JSON.stringify(goal); // Serialize the goal object
      await AsyncStorage.setItem(
        DatabaseManager.GOAL_KEY + goal.goal,
        goalString
      );
    } catch (error) {
      console.error("Error saving goal to storage", error);
      throw new Error("Failed to save goal");
    }
  }

  // Method to retrieve a Goal from AsyncStorage
  // async getGoal(): Promise<Goal | null> {
  //   try {
  //     const goalString = await AsyncStorage.getItem(DatabaseManager.GOAL_KEY);
  //     if (goalString !== null) {
  //       return JSON.parse(goalString) as Goal; // Deserialize the goal object
  //     }
  //     return null; // Return null if no goal is set
  //   } catch (error) {
  //     console.error("Error retrieving goal from storage", error);
  //     throw new Error("Failed to retrieve goal");
  //   }
  // }

  // Method to retrieve a Goal from AsyncStorage
  async getAllGoals(): Promise<Goal[] | null> {
    let goalKeys: readonly string[] = [];
    let goals: Goal[] = [];
    try {
      goalKeys = await AsyncStorage.getAllKeys();
      if (goalKeys !== null) {
        const goalsJson = await AsyncStorage.multiGet(goalKeys);
        goalsJson.forEach(([key, value]) => {
          if (value !== null && key.includes(DatabaseManager.GOAL_KEY)) {
            console.log(`Key: ${key}, Value: ${value}`);
            goals.push(JSON.parse(value) as Goal);
          } else {
            console.log(`Key: ${key} has no value (null).`);
          }
        });
        return goals;
      }
    } catch (error) {
      console.error("Error retrieving goals from storage", error);
      throw new Error("Failed to retrieve goals");
    }
    return null;
  }

  async setHabit(habit: Habit): Promise<void> {
    try {
      const habitString = JSON.stringify(habit); // Serialize the habit object
      await AsyncStorage.setItem(
        DatabaseManager.HABIT_KEY + habit.habit,
        habitString
      );
    } catch (error) {
      console.error("Error saving habit to storage", error);
      throw new Error("Failed to save habit");
    }
  }

  async getHabit(habitId: String): Promise<Habit | null> {
    try {
      const habitString = await AsyncStorage.getItem(
        DatabaseManager.HABIT_KEY + habitId
      );
      if (habitString !== null) {
        return JSON.parse(habitString) as Habit; // Deserialize the habit object
      }
      return null; // Return null if no habit is set
    } catch (error) {
      console.error("Error retrieving habit from storage", error);
      throw new Error("Failed to retrieve habit");
    }
  }

  async getAllHabits(): Promise<Habit[] | null> {
    let habitKeys: readonly string[] = [];
    let habits: Habit[] = [];
    try {
      habitKeys = await AsyncStorage.getAllKeys();
      if (habitKeys !== null) {
        const habitsJson = await AsyncStorage.multiGet(habitKeys);
        habitsJson.forEach(([key, value]) => {
          if (value !== null && key.includes(DatabaseManager.HABIT_KEY)) {
            console.log(`Key: ${key}, Value: ${value}`);
            habits.push(JSON.parse(value) as Habit);
          } else {
            console.log(`Key: ${key} has no value (null).`);
          }
        });
        return habits;
      }
    } catch (error) {
      console.error("Error retrieving habits from storage", error);
      throw new Error("Failed to retrieve habits");
    }
    return null;
  }

  // Method to mark a habit as complete for today
  async markHabitComplete(habitId: string): Promise<void> {
    try {
      const habit = await this.getHabit(habitId);
      if (habit) {
        const today = new Date();
        const todayStr = today.toDateString();

        // Check if there's already an entry for today
        const historyIndex = habit.habitHistory.findIndex(
          (h: any) => new Date(h.date).toDateString() === todayStr
        );

        if (historyIndex === -1) {
          // Add a new completion entry for today
          habit.habitHistory.push({ date: today, completed: true });
        } else {
          // Update existing entry for today to completed
          habit.habitHistory[historyIndex].completed = true;
        }

        // Save the updated habit
        await this.setHabit(habit);
      } else {
        console.warn(`Habit with ID ${habitId} not found.`);
      }
    } catch (error) {
      console.error("Error updating habit completion", error);
    }
  }

  // Clear all entries from AsyncStorage
  async clearStorage(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared from AsyncStorage.");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  }
}
