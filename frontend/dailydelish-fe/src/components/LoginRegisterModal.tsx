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
import { checkAuth, loginUser, registerUser } from "@/services/authService";
import { toast } from "sonner";
import { useEffect } from "react";
import UserDropDown from "./UserDropdown";
import { useAuthStore } from "@/store/useAuthStore";
import { useUIStore } from "@/store/useUIStore";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function LoginModal() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { openLoginModal, closeLoginModal } = useUIStore();
  const isOpen = useUIStore((state) => state.isLoginModalOpen);
  const setIsOpen = (value: boolean) => {
    value ? openLoginModal() : closeLoginModal;
  };

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
      toast.error("Invalid email or password");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser({ email, password });
      handeLogin();
      toast.success("User registered succesfully!");
    } catch (e: any) {
      setError(
        e?.message || "Username/Email already registered. Try loggin in"
      );
      toast.error("Username/Email already registered. Try loggin in");
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return isAuthenticated ? (
    <UserDropDown />
  ) : (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openLoginModal() : closeLoginModal())}
    >
      <button
        className="relative text-black p-0 m-0 bg-transparent cursor-pointer"
        onClick={openLoginModal}
        // size={"sm"}
        // variant="default"
      >
        Login
      </button>

      <DialogContent className="max-w-xl rounded-3xl p-2 m-2">
        <DialogHeader>
          <DialogTitle>
            <span className="text-primary-color font-primary">Daily</span>
            <span className="text-secondary-color font-primary">Delish</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            className="h-[60px] w-[60px] rounded-3xl"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="h-[60px] w-[60px] rounded-3xl"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="w-full h-[60px] rounded-3xl font-bold text-lg hover:shadow-md bg-primary-color"
            onClick={isLoginMode ? handeLogin : handleRegister}
            disabled={loading}
          >
            {loading
              ? isLoginMode
                ? "Logging in..."
                : "Registering..."
              : isLoginMode
              ? "Login"
              : "Register"}
          </Button>

          <p className="text-gray-400 text-sm">
            {isLoginMode ? (
              <HoverCard>
                <HoverCardTrigger>
                  By continuing, you agree to our Terms of service & Privacy
                  policy
                </HoverCardTrigger>
                <HoverCardContent
                  style={{
                    height: "fit",
                    width: "200px",
                    margin: 0,
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  email: <strong>test@gmail.com</strong> <br></br> password:
                  <strong>test@123</strong>
                </HoverCardContent>
              </HoverCard>
            ) : (
              ""
            )}
          </p>
          <Button
            variant={"link"}
            className="font-bold text-lg w-full h-[60px] cursor-pointer"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Register Here" : "Already Registered? Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
