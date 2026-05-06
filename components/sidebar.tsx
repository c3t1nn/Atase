"use client";

import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn">
        <div className="flex items-center gap-x-3 pb-5 pl-4 pt-5">
          <Image src="/atase-logo-v1.png" alt="Ataşe Logo" height={52} width={150} style={{ mixBlendMode: "multiply", objectFit: "contain" }} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Öğrenme" href="/learn" iconSrc="/learn-v2.svg" />
        <SidebarItem label="Kelime Oyunu" href="/games" iconSrc="/word-game.svg" />
        <SidebarItem label="Kütüphane" href="/library" iconSrc="/library-v2.svg" />
        <SidebarItem label="Görevler" href="/quests" iconSrc="/quests-v2.svg" />
        <SidebarItem
          label="Sıralama"
          href="/leaderboard"
          iconSrc="/leaderboard-v2.svg"
        />
      </div>

      <div className="p-4 flex flex-col gap-y-4">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>

        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
