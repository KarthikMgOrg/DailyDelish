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
import { loginUser } from "@/services/authService";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handeLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await loginUser({ email, password });
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setIsOpen(false);
      router.push("/");
    } catch (error: any) {
      setError(error?.message || "Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="relative text-black p-0 m-0 bg-transparent"
          size={"sm"}
          variant="default"
        >
          Login
        </Button>
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
