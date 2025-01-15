import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme, // Start with the default theme
  roundness: 8, // Customize component roundness
  colors: {
    ...DefaultTheme.colors, // Use existing default colors as a base
    primary: "#00DB8C",
    accent: "#03dac4",
    background: "#f6f6f6",
    surface: "#ffffff",
    text: "#000000",
    disabled: "#c7c7c7",
    placeholder: "#6c6c6c",
    error: "#B00020",
  },
};
