import { redirect } from "next/navigation";
import Image from "next/image";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Quests } from "@/components/quests";
import { getUnits, getUserProgress } from "@/db/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const GamesPage = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();

  const [userProgress, units] = await Promise.all([
    userProgressData,
    unitsData,
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
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/word-game.svg"
            alt="Kelime Oyunu"
            height={90}
            width={90}
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Kelime Oyunu
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Ünitelerdeki kelimeleri eşleştirin, hafızanızı tazeleyin!
          </p>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="flex flex-col items-center justify-between rounded-2xl border-2 border-b-4 p-6 active:border-b-2"
              >
                <div className="text-center">
                  <h2 className="text-xl font-bold text-neutral-700">
                    {unit.title}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {unit.description}
                  </p>
                </div>
                
                <Link href={`/games/${unit.id}`} className="mt-4 w-full">
                  <Button variant="primaryOutline" className="w-full">
                    Oyuna Başla
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default GamesPage;
