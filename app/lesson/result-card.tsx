import { InfinityIcon, Star } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ResultCardProps = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCard = ({ value, variant }: ResultCardProps) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border-2",
        variant === "points" && "border-green-400 bg-green-400",
        variant === "hearts" && "border-rose-500 bg-rose-500"
      )}
    >
      <div
        className={cn(
          "rounded-t-xl p-1.5 text-center text-xs font-bold uppercase text-white",
          variant === "points" && "bg-green-400",
          variant === "hearts" && "bg-rose-500"
        )}
      >
        {variant === "hearts" ? "Kalan Kalp" : "Toplam Yıldız"}
      </div>

      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-white p-6 text-lg font-bold",
          variant === "points" && "text-green-500",
          variant === "hearts" && "text-rose-500"
        )}
      >
        {variant === "points" ? (
          <Star className="mr-1.5 h-8 w-8 fill-green-500 text-green-500" />
        ) : (
          <Image
            src="/heart.svg"
            alt={variant}
            height={30}
            width={30}
            className="mr-1.5"
          />
        )}
        {value === Infinity ? (
          <InfinityIcon className="h-6 w-6 stroke-[3]" />
        ) : (
          value
        )}
      </div>
    </div>
  );
};
