import { Slot } from "expo-router";
import { useEffect }  from "react";
import { useAuthStore } from "../store/auth.store";


export default function RootLayout() {
  const loadToken = useAuthStore(((state)=>state.loadToken));  // Load token on mount
  const initialized = useAuthStore((state) => state.initialized);

  useEffect(() => {
    loadToken();   // Uygulama açıldığında token'ı yükle
  }, []);

  if (!initialized) {
    return null; //token yüklenene kadar bir şey gösterme veya bir yükleme göstergesi döndürebilirsiniz
  }

  return <Slot />;
}

