import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import getPushToken from "../lib/getPushToken";

const Login = ({ navigation }) => {
  const theme = useTheme(); // Access the theme for colors and styles
  const [item, setItem] = useState({});

  const handleLogin = () => {
    const pushToken = getPushToken();
    // Handle login logic here
    navigation.replace("Main"); // Navigate to the main tabs after login
  };

  return (
    <View style={styles.container}>
      {/* Logo or Image */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/5087/5087579.png",
        }}
        style={styles.logo}
      />

      {/* Welcome Text */}
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Welcome Back
      </Text>
      <Text style={styles.subtitle}>Please login to your account</Text>

      {/* Email Input */}
      <TextInput
        label="Email"
        value={item.email}
        onChangeText={(email) => setItem({ ...item, email })}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        left={<TextInput.Icon icon="email" />}
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={item.password}
        onChangeText={(password) => setItem({ ...item, password })}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon="lock" />}
      />

      {/* Login Button */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Login
      </Button>

      {/* Signup Redirect */}
      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Text
          style={{ color: theme.colors.primary }}
          onPress={() => navigation.navigate("register")}
        >
          Sign up
        </Text>
      </Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888888",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    width: "100%",
    paddingVertical: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
  },
  signupText: {
    fontSize: 14,
    color: "#888888",
  },
});

export default Login;
