import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { Quests } from "@/components/quests";
import { getUserProgress } from "@/db/queries";
import { BOOKS } from "@/constants/library";

import { LibraryList } from "./list";

const LibraryPage = async () => {
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
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image src="/library-v2.svg" alt="Library" height={90} width={90} />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Kütüphane
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Seviyenize uygun Rusça hikayeler okuyarak dilinizi geliştirin.
          </p>

          <LibraryList books={BOOKS} userPoints={userProgress.points} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LibraryPage;
