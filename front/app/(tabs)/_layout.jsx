import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Platform, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#558e60ff",
        tabBarInactiveTintColor: "#000000ff",
        tabBarStyle: {
          backgroundColor: "#ffffffff",
          borderTopWidth: 0,
          height: 80,
          paddingLeft: Platform.OS === "ios" ? 10 : 10,
          paddingRight: Platform.OS === "ios" ? 10 : 10,
          paddingTop: Platform.OS === "ios" ? 10 : 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ fontSize: 12, fontWeight: "600", color: "#3E5F44" }}>Dashboard</Text> : null,
        }}
      />

      <Tabs.Screen
        name="tests"
        options={{
          title: "Tests",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ fontSize: 12, fontWeight: "600", color: "#3E5F44" }}>Tests</Text> : null,
        }}
      />
     
      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ fontSize: 12, fontWeight: "600", color: "#3E5F44" }}>Progress</Text> : null,
        }}
      />
      

       <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
          tabBarLabel: ({ focused }) =>
            focused ? <Text style={{ fontSize: 12, fontWeight: "600", color: "#3E5F44" }}>Profile</Text> : null,
        }}
      />

    </Tabs>
  );
}