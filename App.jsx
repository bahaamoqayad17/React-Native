import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme } from "./theme";
import { store } from "./store";
import ReceivingNotifications from "./components/ReceivingNotifications";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens";
import Settings from "./screens/settings";
import Profile from "./screens/profile";
import Login from "./screens/login";
import Register from "./screens/register";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./screens/test";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabsItems = [
  {
    name: "home",
    title: "Home",
    icon: "home",
    component: Home,
  },
  {
    name: "profile",
    title: "Profile",
    icon: "person",
    component: Profile,
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings",
    component: Settings,
  },
];

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.surface,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {/* Tab Screens */}
      {TabsItems.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={item.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ReduxProvider store={store}>
        <ReceivingNotifications />
        <NavigationContainer>
          <Stack.Navigator>
            {/* Login Screen */}
            <Stack.Screen
              name="test"
              component={Main}
              options={{ headerShown: false }} // Hide the header for the login screen
            />
            <Stack.Screen
              name="register"
              component={Register}
              options={{ headerShown: false }} // Hide the header for the login screen
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }} // Hide the header for the login screen
            />
            {/* Main App (Tab Navigator) */}
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }} // Hide the header for tabs
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </PaperProvider>
  );
}
