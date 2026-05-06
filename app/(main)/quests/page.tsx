import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Progress } from "@/components/ui/progress";
import { UserProgress } from "@/components/user-progress";
import { QUESTS } from "@/constants";
import { getUserProgress } from "@/db/queries";

import { Star } from "lucide-react";

const QuestsPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([
    userProgressData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/learn");

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/quests-v2.svg" alt="Quests" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Görevler
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Yıldız kazanarak görevleri tamamlayın.
          </p>

          <ul className="w-full">
            {QUESTS.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  className="flex w-full items-center gap-x-4 border-t-2 p-4"
                  key={quest.title}
                >
                  <Star className="h-12 w-12 fill-green-500 text-green-500" />

                  <div className="flex w-full flex-col gap-y-2">
                    <div className="flex w-full items-center justify-between">
                      <p className="text-xl font-bold text-neutral-700">
                        {quest.title}
                      </p>
                      <p className="text-sm font-bold text-green-600">
                        {userProgress.points} / {quest.value}
                      </p>
                    </div>

                    <Progress value={progress} className="h-3" />

                    {userProgress.points < quest.value && (
                      <p className="text-xs text-neutral-500">
                        Hedefe {quest.value - userProgress.points} yıldız kaldı
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
