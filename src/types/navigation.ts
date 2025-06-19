export const SCREEN_NAMES = {
  // Stack screens
  MAIN_TABS: "MainTabs" as const,
  CRISIS: "Crisis" as const,
  EXERCISE: "Exercise" as const,
  EXERCISE_DETAIL: "ExerciseDetail" as const,
  PROFILE: "Profile" as const,

  // Tab screens
  HOME: "Home" as const,
  EXERCISES: "Exercises" as const,
  HISTORY: "History" as const,
  SETTINGS: "Settings" as const,
} as const;

export type ScreenName = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
