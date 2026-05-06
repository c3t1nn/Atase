import "dotenv/config";
import db from "../db/drizzle";
import { units, lessons, challenges, challengeOptions } from "../db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const allUnits = await db.query.units.findMany({
    with: {
      lessons: {
        with: {
          challenges: {
            with: {
              challengeOptions: {
                where: (challengeOptions, { eq }) => eq(challengeOptions.correct, true),
              },
            },
          },
        },
      },
    },
  });

  for (const unit of allUnits) {
    const rawWords = unit.lessons.flatMap((lesson) => 
      lesson.challenges.map((challenge) => {
        const match = challenge.question.match(/"([^"]+)"/);
        const coreQuestion = match ? match[1] : challenge.question;
        const coreAnswer = challenge.challengeOptions[0]?.text || "";

        return {
          question: coreQuestion.trim(),
          answer: coreAnswer.trim(),
        };
      })
    ).filter(word => word.answer !== "" && !word.question.includes("?"));

    const uniqueWordsMap = new Map();
    rawWords.forEach(word => {
      if (!uniqueWordsMap.has(word.question)) {
        uniqueWordsMap.set(word.question, word);
      }
    });

    const uniqueRawWords = Array.from(uniqueWordsMap.values());

    const singleWords = uniqueRawWords.filter(word => {
      const isSingleWordQuestion = !word.question.includes(" ") && !word.question.includes("\u00A0");
      const isSingleWordAnswer = !word.answer.includes(" ") && !word.answer.includes("\u00A0");
      return isSingleWordQuestion && isSingleWordAnswer;
    });

    console.log(`Unit ${unit.id} ("${unit.title}"):`);
    console.log(`  Total unique valid items: ${uniqueRawWords.length}`);
    console.log(`  Strict single words: ${singleWords.length}`);
    
    if (singleWords.length > 0) {
      console.log(`  Sample single words:`);
      singleWords.slice(0, 5).forEach(w => console.log(`    ${w.question} <-> ${w.answer}`));
    }
    
    const phrases = uniqueRawWords.filter(word => word.question.includes(" ") || word.answer.includes(" "));
    if (phrases.length > 0) {
      console.log(`  Sample phrases (filtered out):`);
      phrases.slice(0, 3).forEach(w => console.log(`    ${w.question} <-> ${w.answer}`));
    }
    console.log("---------------------------------------------------");
  }

  process.exit(0);
}

main().catch(console.error);
