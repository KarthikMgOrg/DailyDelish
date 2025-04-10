// components/LoginModal.tsx
"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { checkAuth, loginUser } from "@/services/authService";
import { toast } from "sonner";
import { useEffect } from "react";
import UserDropDown from "./UserDropdown";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { isAuthenticated, checkAuthStatus, loading } = useAuthStore();

  const handeLogin = async () => {
    try {
      await loginUser({ email, password });
      toast.success("Login successful");
      setIsOpen(false);
      await checkAuthStatus();
      router.push("/");
    } catch (e: any) {
      setError(e?.message || "Invalid email or password");
      toast.error(error);
    }
  };

  // const protectedCall = async () => {
  //   const response = await checkAuth();
  //   return response.logged_in;
  // };

  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);
  // useEffect(() => {
  //   const check = async () => {
  //     try {
  //       const data = await protectedCall();
  //       setIsAuthenticated(data); // Or however your response looks
  //     } catch (error) {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   check();
  // }, []);

  return isAuthenticated ? (
    <UserDropDown />
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="relative text-black p-0 m-0 bg-transparent"
          // size={"sm"}
          // variant="default"
        >
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            <span className="text-primary-color font-primary">Daily</span>
            <span className="text-secondary-color font-primary">Delish</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            className="h-[60px] w-[60px] rounded-2xl"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="h-[60px] w-[60px] rounded-2xl"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full h-[60px] rounded-3xl font-bold text-lg hover:shadow-md bg-primary-color"
            onClick={handeLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <p className="text-gray-400 text-sm">
            By continuing, you agree to our Terms of service & Privacy policy
          </p>
          <Button
            variant={"link"}
            className="font-bold text-lg w-full h-[60px]"
          >
            Register Here
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
