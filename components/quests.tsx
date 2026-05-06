import Link from "next/link";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUESTS } from "@/constants";

type QuestsProps = { points: number };

export const Quests = ({ points }: QuestsProps) => {
  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between space-y-2">
        <h3 className="text-lg font-bold">Görevler</h3>

        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            Tümünü gör
          </Button>
        </Link>
      </div>

      <ul className="w-full space-y-4">
        {QUESTS.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              className="flex w-full items-center gap-x-3 pb-4"
              key={quest.title}
            >
              <Star className="h-10 w-10 fill-green-500 text-green-500" />

              <div className="flex w-full flex-col gap-y-2">
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm font-bold text-neutral-700">
                    {quest.title}
                  </p>
                  <p className="text-xs font-bold text-green-600">
                    {points} / {quest.value}
                  </p>
                </div>

                <Progress value={progress} className="h-2" />
                
                {points < quest.value && (
                  <p className="text-[10px] text-neutral-500">
                    Hedefe {quest.value - points} yıldız kaldı
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
