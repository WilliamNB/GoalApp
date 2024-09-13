import { Tabs } from "expo-router";
import React from "react";

import {
  TabBarIconFeather,
  TabBarIconFA,
} from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        initialParams={{ title: "Goals" }}
        options={{
          title: "Goals",
          tabBarIcon: ({ color }) => (
            <TabBarIconFeather name="target" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habbits"
        initialParams={{ title: "Habbits" }}
        options={{
          title: "Habbits",
          tabBarIcon: ({ color }) => (
            <TabBarIconFA name="calendar-check-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        initialParams={{ title: "Goal & Habbits Stats" }}
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <TabBarIconFeather name="pie-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="partners"
        initialParams={{ title: "Accountability Partners" }}
        options={{
          title: "Partners",
          tabBarIcon: ({ color }) => (
            <TabBarIconFeather name="users" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
