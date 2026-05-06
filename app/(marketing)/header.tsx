"use client";
import { useState } from "react";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  Show,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/banner";
import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      <header
        className="h-20 w-full border-b-2 border-slate-200 px-4 mt-0"
      >
        <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
          <Link href="/" className="flex items-center gap-x-3 pb-5 pl-4 pt-5">
            <Image src="/atase-logo-v1.png" alt="Ataşe Logo" height={52} width={150} style={{ mixBlendMode: "multiply", objectFit: "contain" }} />
          </Link>

          <div className="flex gap-x-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </ClerkLoading>
            <ClerkLoaded>
              <Show when="signed-in">
                <UserButton />
              </Show>

              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button size="lg" variant="ghost">
                    Giriş Yap
                  </Button>
                </SignInButton>
              </Show>


            </ClerkLoaded>
          </div>
        </div>
      </header>
    </>
  );
};
