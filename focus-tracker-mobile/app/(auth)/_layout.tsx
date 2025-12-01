import { Stack , Redirect} from "expo-router";
import { useAuthStore } from "../../store/auth.store";

export default function AuthLayout() {
  const token = useAuthStore((state) => state.token);
  const initialized = useAuthStore((state) => state.initialized);

  // Token henüz AsyncStorage’den yüklenmediyse hiçbir şey gösterme
  if (!initialized) return null;

  // Kullanıcı zaten giriş yaptıysa auth ekranlarını görmesin → tabs'a yönlendir
  if (token) {
    return <Redirect href="/(tabs)/timer" />;
  }



  return <Stack screenOptions={{ headerShown: false }} />;
}
