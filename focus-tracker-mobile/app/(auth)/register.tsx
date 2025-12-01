import { useState,useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { registerRequest } from "../../api/auth";
import { router } from "expo-router";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  fetch("http://10.0.2.2:8000")
    .then(r => console.log("OK", r.status))
    .catch(e => console.log("FAIL", e.message));
}, []);
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerRequest({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      });

      Alert.alert("Success", "Account created. You can now log in.");

      router.replace("/(auth)/login");

    } catch (err: any) {
      console.log(err.response?.data);
      Alert.alert(
        "Registration Failed",
        err.response?.data?.detail || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
        style={styles.input}
      />
       <TextInput
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry
        value={password}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        onChangeText={setConfirmPassword}
        secureTextEntry
        value={confirmPassword}
        style={styles.input}
      />

      <Button
        title={loading ? "Loading..." : "Register"}
        onPress={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
