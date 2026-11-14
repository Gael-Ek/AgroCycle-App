import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginFormData, RegisterFormData } from "@/schemas/auth-schema";
import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginFormData) =>
      AuthService.login(data.email, data.password),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterFormData) =>
      AuthService.register(data.email, data.password, data.name),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { setSession } = useAuthStore();
  return useMutation({
    mutationFn: () => AuthService.logout(),

    onSuccess: () => {
      setSession(null);
      queryClient.clear();
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => AuthService.resetPassword(email),
  });
}
