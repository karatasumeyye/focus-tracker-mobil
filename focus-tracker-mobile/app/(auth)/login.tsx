import { useState } from "react";
import { View, TextInput, Button, Alert,Text,TouchableOpacity } from "react-native";
import { loginRequest } from "../../api/auth";
import { useAuthStore } from "../../store/auth.store";
import { router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function Login() {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await loginRequest({ email, password });
      const accessToken = response.access;

      await login(accessToken);

      router.replace("/(tabs)/timer");
    } catch (err: any) {
      Alert.alert("Login Failed", err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider >
      <View style={styles.container}>
        {/* icon */}
        <View style={styles.iconWrapper}>
          <Ionicons name ="person-circle-outline" size={80} color="#A6C8FF" />
        </View>

        {/* Title */}
        <Text style = {styles.title}>Giriş Yap</Text>

        {/* EMAIL INPUT */}
        <Text style={styles.label}>E-posta</Text>
      
        {/* EMAIL INPUT */}
        <TextInput
          placeholder="ornek@mail.com"
          placeholderTextColor= "#a5a5a5"
          value={email}      
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* PASSWORD INPUT */}
      <Text style={styles.label}>Şifre</Text>
      <View style= {styles.passwordWrapper}>
        <TextInput
          placeholder ="Şifrenizi girin"
          placeholderTextColor="#a5a5a5"
          secureTextEntry = {!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={22}
            color="#ccc"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgot}>Şifremi unuttum?</Text>
      </TouchableOpacity>

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? "Yükleniyor..." : "Giriş Yap"}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.or}>veya</Text>
        <View style={styles.divider} />
      </View>

      {/* SIGN UP LINK */}
      <Text style={styles.bottomText}>
        Hesabın yok mu?{" "}
        <Text
          style={styles.signupText}
          onPress={() => router.push("/(auth)/register")}
        >
          Kayıt Ol
        </Text>
      </Text>


      </View> 
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#0F172A",
    padding: 20,
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? 25 : 50,
  },
  iconWrapper:{
    alignItems: "center",
    marginBottom: 10,
  },
  title:{
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  label:{
    color:"d1d5db",
    marginBottom: 5,
    fontSize: 14,
  },

  input:{
    backgroundColor: "#1E293B",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: "#FFFFFF",
    fontSize: 16,
  },
  passwordWrapper:{
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 10,
    marginBottom: 10,
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  forgot: {
    color: "#A6C8FF",
    fontSize: 13,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: "#93C5FD",
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#475569",
  },
  or: {
    color: "#64748B",
    marginHorizontal: 8,
  },
  bottomText: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 10,
  },
  signupText: {
    color: "#A6C8FF",
    fontWeight: "600",
  },

});