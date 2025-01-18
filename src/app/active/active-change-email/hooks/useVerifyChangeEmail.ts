"use client";
import { useServiceVerifyChangeEmail } from "@/services/account/services";

export default function useVerifyChangeEmail() {
  const { mutate, isPending } = useServiceVerifyChangeEmail();

  const verifyChangeEmail = (body: REQUEST.TVerifyChangeEmail) => {
    try {
      mutate(body);
    } catch (err) {
      console.log(err);
    }
  };

  return { isPending, verifyChangeEmail };
}