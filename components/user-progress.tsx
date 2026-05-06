
import Image from "next/image";
import Link from "next/link";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { courses } from "@/db/schema";

type UserProgressProps = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
};

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
}: UserProgressProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      {/* Kurs bayrağı kaldırıldı (Single-language focus) */}

      <Button variant="ghost" className="text-green-500">
        <Star className="mr-2 h-6 w-6 fill-green-500" />
        {points}
      </Button>

      <Button variant="ghost" className="text-rose-500">
        <Image
          src="/heart.svg"
          height={22}
          width={22}
          alt="Hearts"
          className="mr-2"
        />
        {hearts}
      </Button>
    </div>
  );
};
