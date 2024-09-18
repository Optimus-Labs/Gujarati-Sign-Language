import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="write"
        options={{
          title: "Write",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="create-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="text2sign"
        options={{
          title: "Text to Sign",
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon
              name="document-text-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

