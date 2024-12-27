import HomePage from "@/app/(user)/homepage/home-page";
import UserLayout from "@/app/(user)/layout";

export default function Home() {
  return (
    <div>
      <UserLayout>
        <HomePage />
      </UserLayout>
    </div>
  );
}