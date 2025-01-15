import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import getPushToken from "../lib/getPushToken";

const Register = ({ navigation }) => {
  const theme = useTheme(); // Access the theme for colors and styles
  const [item, setItem] = useState({});

  const handleRegister = () => {
    // Handle registration logic here
    const pushToken = getPushToken();

    navigation.replace("Main"); // Navigate to main tabs after successful registration
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
        Create an Account
      </Text>
      <Text style={styles.subtitle}>Please fill the details to register</Text>

      {/* Name Input */}
      <TextInput
        label="Full Name"
        value={item.name}
        onChangeText={(name) => setItem({ ...item, name })}
        style={styles.input}
        mode="outlined"
        autoCapitalize="words"
        left={<TextInput.Icon icon="account" />}
      />

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

      {/* Confirm Password Input */}
      <TextInput
        label="Confirm Password"
        value={item.confirmedPassword}
        onChangeText={(confirmedPassword) =>
          setItem({ ...item, confirmedPassword })
        }
        style={styles.input}
        mode="outlined"
        secureTextEntry
        left={<TextInput.Icon icon="lock-check" />}
      />

      {/* Register Button */}
      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Register
      </Button>

      {/* Login Redirect */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={{ color: theme.colors.primary }}
          onPress={() => navigation.navigate("login")}
        >
          Log in
        </Text>
      </Text>
      <Text style={[styles.loginText, { marginTop: 8 }]}>
        <Text
          style={{ color: theme.colors.primary }}
          onPress={() => navigation.navigate("Main")}
        >
          Enter as a Guest
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
  loginText: {
    fontSize: 14,
    color: "#888888",
  },
});

export default Register;
