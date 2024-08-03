import getUserSession from "@/lib/get-user-session";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserResponseData = {
  avatar_url: string;
  email: string;
  full_name: string;
  user_name: string;
};

export default async function Home() {
  const {
    data: { session },
  } = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  const user = session.user.user_metadata as UserResponseData;
  return (
    <div>
      <h2>Welcome - {user.full_name}</h2>
      <Avatar>
        <AvatarImage src={user.avatar_url} loading="lazy" />
        <AvatarFallback>user_name</AvatarFallback>
      </Avatar>
    </div>
  );
}
