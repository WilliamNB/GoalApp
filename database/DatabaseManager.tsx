import { Goal } from "@/classes/Goal";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class DatabaseManager {
  private static GOAL_KEY = "user_goal"; // Storage key for goal

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
  async getGoal(): Promise<Goal | null> {
    try {
      const goalString = await AsyncStorage.getItem(DatabaseManager.GOAL_KEY);
      if (goalString !== null) {
        return JSON.parse(goalString) as Goal; // Deserialize the goal object
      }
      return null; // Return null if no goal is set
    } catch (error) {
      console.error("Error retrieving goal from storage", error);
      throw new Error("Failed to retrieve goal");
    }
  }

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
}
