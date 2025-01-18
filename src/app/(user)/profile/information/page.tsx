import React from "react";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import ProfileComponent from "@/app/(user)/profile/information/components/profile-component";

export const metadata: Metadata = {
  title: "Profile User Page",
  description: "Profile User Pages for EduSource",
};

export default function UserInformationPage() {
  return (
    <div>
      <ProfileComponent />
    </div>
  );
}
