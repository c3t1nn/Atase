import { redirect } from "next/navigation";
import { getUnitWords, getUserProgress } from "@/db/queries";
import { WordGame } from "@/components/word-game";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";

type Props = {
  params: {
    unitId: string;
  };
};

const UnitGamePage = async ({ params }: Props) => {
  const { unitId: unitIdParam } = await params;
  const unitId = parseInt(unitIdParam);
  
  if (isNaN(unitId)) {
    redirect("/games");
  }

  const userProgressData = getUserProgress();
  const wordsData = getUnitWords(unitId);

  const [userProgress, { words, title }] = await Promise.all([
    userProgressData,
    wordsData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/learn");
  }

  if (words.length === 0) {
    redirect("/games");
  }

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
        <div className="flex w-full flex-col">
          <h1 className="mb-8 text-center text-3xl font-bold text-neutral-800">
            Kelime Eşleştirme
          </h1>
          
          <WordGame 
            words={words} 
            unitTitle={title} 
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default UnitGamePage;
