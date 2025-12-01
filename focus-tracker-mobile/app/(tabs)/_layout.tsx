import { Tabs, Redirect } from "expo-router";
import { useAuthStore } from "../../store/auth.store";

export default function TabsLayout() {
  const token = useAuthStore((state) => state.token);
  const initialized = useAuthStore((state) => state.initialized);

  // Token yüklenene kadar UI gösterme (çok kısa sürer)
  if (!initialized) return null;

  // Kullanıcı giriş yapmadıysa tablara giremesin
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="timer" options={{ title: "Timer" }} />
      <Tabs.Screen name="reports" options={{ title: "Reports" }} />
    </Tabs>
  );
}
