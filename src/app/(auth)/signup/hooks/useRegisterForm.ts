"use client";

import {
  RegisterBody,
  RegisterBodyType,
} from "@/utils/schema-validations/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useServiceRegister } from "@/services/auth/services";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/use-toast";

export function useRegisterForm() {
  const router = useRouter();
  const [typePassword, setTypePassword] = useState<boolean>(false);
  const [typeConfirmPassword, setTypeConfirmPassword] =
    useState<boolean>(false);
  const { mutate, isPending } = useServiceRegister();
  const { addToast } = useToast();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: RegisterBodyType) => {
    try {
      mutate(data, {
        onSuccess: async (data) => {
          if (data) {
            if (data.value.code.includes("auth_noti")) {
              addToast({
                description: data.value.message,
                type: "success",
                duration: 5000,
              });
              reset();
              router.push("/login");
            }
          }
        },
        onError: (error: any) => {
          console.log("error: ", error);
          const data = error?.response?.data || error;
          if (data?.error?.code === "400") {
            setError("email", {
              type: "manual",
              message: data.error.message,
            });

            addToast({
              type: "error",
              description: data.error.message,
              duration: 5000,
            });
          }
        },
      });
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const valuePassword = watch("password");
  const valueConfirmPassword = watch("confirmPassword");

  const handleToggleTypePassword = () => {
    setTypePassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setTypeConfirmPassword((prev) => !prev);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isPending,
    valuePassword,
    typePassword,
    valueConfirmPassword,
    typeConfirmPassword,
    handleToggleTypePassword,
    handleToggleConfirmPassword,
  };
}
