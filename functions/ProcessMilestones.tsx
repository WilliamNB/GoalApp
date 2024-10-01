import { Milestone } from "@/classes/Milestone";

// Helper function to act as a type guard
const isDefined = (
  milestone: Milestone | undefined
): milestone is Milestone => {
  return milestone !== undefined;
};

// Arrow function that returns undefined for the entire milestone if title is ""
export const processMilestones = (
  milestones: Milestone[]
): Milestone[] | undefined => {
  // Step 1: Remove milestones where the title is an empty string
  const updatedMilestones = milestones
    .map((milestone) => {
      if (milestone.milestone === "") {
        return undefined; // Return undefined for the entire milestone
      }
      return milestone; // Keep the milestone if the title is not ""
    })
    .filter(isDefined); // Use type guard to filter out undefined

  // Step 2: If all milestones are removed (empty array), return undefined
  if (updatedMilestones.length === 0) {
    return undefined; // If all milestones were undefined, return undefined
  }

  return updatedMilestones; // Return the updated milestones array
};
