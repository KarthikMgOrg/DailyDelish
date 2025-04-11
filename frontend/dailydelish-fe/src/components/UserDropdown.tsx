import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

export default function UserDropDown() {
  const { logout } = useAuthStore();

  const router = useRouter();
  const handleLogout = async () => {
    // debugger;
    // Call your logout API
    await logout();
    router.push("/");
    toast.success("You have been logged out!");
    // Refresh or route back
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            className="object-cover w-2.5 h-2.5 rounded-full"
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount={true} sideOffset={8}>
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/orders")}>
          My Orders
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
