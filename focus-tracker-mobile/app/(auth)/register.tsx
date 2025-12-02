import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { registerRequest } from "../../api/auth";
import { router } from "expo-router";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      setLoading(true);

      await registerRequest({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      alert("Hesap oluşturuldu.");
      router.replace("/(auth)/login");
    } catch (err: any) {
      console.log(err.response?.data);
      alert("Kayıt başarısız.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.card}>

        {/* Back */}
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 10 }}>
          <Ionicons name="chevron-back" size={26} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>Hesap Oluştur</Text>

        <Text style={styles.title}>Aramıza Katıl</Text>
        <Text style={styles.subtitle}>
          Yeni bir hesap oluşturarak odaklanma yolculuğuna başla.
        </Text>

        {/* FIRST NAME */}
        <Text style={styles.label}>Ad</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Adınız"
            placeholderTextColor="#7C8696"
            onChangeText={setFirstName}
            value={firstName}
            style={styles.input}
          />
        </View>

        {/* LAST NAME */}
        <Text style={styles.label}>Soyad</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="people-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Soyadınız"
            placeholderTextColor="#7C8696"
            onChangeText={setLastName}
            value={lastName}
            style={styles.input}
          />
        </View>

        {/* EMAIL */}
        <Text style={styles.label}>E-posta</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="eposta@adresin.com"
            placeholderTextColor="#7C8696"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
        </View>

        {/* PASSWORD */}
        <Text style={styles.label}>Şifre</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Şifreni gir"
            placeholderTextColor="#7C8696"
            secureTextEntry={!showPass1}
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPass1(!showPass1)}>
            <Ionicons
              name={showPass1 ? "eye-off" : "eye"}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        {/* CONFIRM PASSWORD */}
        <Text style={styles.label}>Şifre Tekrarı</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Şifreni tekrar gir"
            placeholderTextColor="#7C8696"
            secureTextEntry={!showPass2}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPass2(!showPass2)}>
            <Ionicons
              name={showPass2 ? "eye-off" : "eye"}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        {/* SUBMIT */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.registerText}>
            {loading ? "Yükleniyor..." : "Kayıt Ol"}
          </Text>
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <Text style={styles.bottomText}>
          Zaten hesabın var mı?{" "}
          <Text
            style={styles.loginText}
            onPress={() => router.replace("/(auth)/login")}
          >
            Giriş Yap
          </Text>
        </Text>

        <Text style={styles.legal}>
          Kayıt olarak <Text style={styles.link}>Kullanım Koşulları</Text> ve{" "}
          <Text style={styles.link}>Gizlilik Politikası</Text>'nı kabul etmiş
          olursun.
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },

  card: {
    marginTop: 40,
    backgroundColor: "#1E293B",
    marginHorizontal: 15,
    padding: 25,
    borderRadius: 20,
  },

  header: {
    color: "#CBD5E1",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 6,
  },

  subtitle: {
    color: "#94A3B8",
    marginBottom: 20,
  },

  label: {
    color: "#e2e8f0",
    marginBottom: 6,
    fontWeight: "500",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0F172A",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 15,
    gap: 8,
  },

  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },

  registerBtn: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  registerText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  bottomText: {
    color: "#CBD5E1",
    textAlign: "center",
    marginTop: 16,
    fontSize: 14,
  },

  loginText: {
    color: "#60A5FA",
    fontWeight: "600",
  },

  legal: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 18,
    fontSize: 12,
  },

  link: {
    color: "#60A5FA",
    textDecorationLine: "underline",
  },
});
