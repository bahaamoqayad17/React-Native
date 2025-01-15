import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";

const Profile = ({ navigation }) => {
  const theme = useTheme(); // Access the theme for colors and styles

  const handleLogout = () => {
    // Handle logout logic here
    console.log("User logged out");
    navigation.replace("Login"); // Navigate to the login screen after logout
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        }}
        style={styles.profilePicture}
      />

      {/* User Information */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>

      {/* Edit Profile Button */}
      <Button
        mode="contained"
        onPress={() => console.log("Edit Profile Pressed")}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Edit Profile
      </Button>

      {/* Logout Button */}
      <Button
        mode="outlined"
        onPress={handleLogout}
        style={styles.logoutButton}
        labelStyle={styles.logoutButtonText}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
  },
  email: {
    fontSize: 16,
    color: "#777777",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  logoutButton: {
    width: "80%",
    borderColor: "#ff0000",
    borderWidth: 1,
    marginVertical: 10,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#ff0000",
  },
});

export default Profile;
