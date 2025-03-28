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

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);

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
          <DialogTitle>Login to DailyDelish</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            className="h-[60px] w-[60px] rounded-3xl"
            type="email"
            placeholder="Enter your email"
          />
          <Input
            className="h-[60px] w-[60px] rounded-3xl"
            type="password"
            placeholder="Enter your password"
          />
          <Button className="w-full h-[60px] rounded-3xl font-bold text-lg hover:shadow-md bg-primary-color">
            Login
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
