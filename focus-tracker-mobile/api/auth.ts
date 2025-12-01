import {api} from "./client";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export async function loginRequest(data: LoginPayload){
    const response = await api.post("api/auth/login/", data);
    return response.data;   // { access: "token", refresh: "token" }
}

export async function registerRequest(data: RegisterPayload){
    const response = await api.post("api/auth/register/", data);
    return response.data;   // { message: "User registered successfully" }
}