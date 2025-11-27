import { View, Text } from "react-native";
import { Button } from "react-native";
import { router } from "expo-router";

export default function Login() {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Go Tabs" onPress={() => router.replace("/(tabs)/timer")} />
    </View>
  );
}
