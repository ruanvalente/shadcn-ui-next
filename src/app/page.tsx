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
    <div className="flex w-screen h-screen gap-8 items-center justify-center bg-slate-50">
      <Avatar className="w-[100px] h-[100px] hover:animate-pulse hover:cursor-pointer">
        <AvatarImage src={user.avatar_url} loading="lazy" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h2 className="text-2xl md:text-3xl">{user.full_name}</h2>
        <p className="italic text-balance text-base text-zinc-700">
          {user.user_name}
        </p>
      </div>
    </div>
  );
}
