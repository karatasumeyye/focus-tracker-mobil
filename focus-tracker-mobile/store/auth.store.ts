import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
    token : string | null;
    initialized : boolean;
    loadToken: () => Promise<void>;
    login: (token:string) => Promise<void>;
    logout: ()=> Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    initialized: false,

    loadToken: async () => {
        try{
            const storedToken = await AsyncStorage.getItem("access_token");
            set({token: storedToken, initialized: true});
        }catch(error){
            console.error("Failed to load token:", error);
            set({initialized: true});
        }
    },
    login: async (token:string) => {
        try{
            await AsyncStorage.setItem("access_token", token);
            set({token});
        }catch(error){
            console.error("Failed to save token:", error);
        }
    },
    logout: async () => {
        try{
            await AsyncStorage.removeItem("access_token");
            set({token: null});
        }catch(error){
            console.error("Failed to remove token:", error);
        }
    },
}));