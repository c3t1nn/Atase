"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { addPoints } from "@/actions/user-progress";
import { speak } from "@/lib/speech";

type WordGameProps = {
  words: { question: string; answer: string }[];
  unitTitle: string;
};

type Card = {
  id: string;
  content: string;
  matchId: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const WORDS_PER_ROUND = 8; // Her turda 8 kelime (16 kart) 4x4 garantisi.

export const WordGame = ({ words, unitTitle }: WordGameProps) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  
  const [currentRound, setCurrentRound] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  // We keep a shuffled list of ALL unique words once at start so they never repeat.
  const [shuffledWords, setShuffledWords] = useState<{ question: string; answer: string }[]>([]);

  const totalRounds = Math.max(1, Math.ceil(words.length / WORDS_PER_ROUND));

  useEffect(() => {
    // Sadece oyunun en başında kelimeleri karıştır, böylece turlar tamamen disjoint olur.
    setShuffledWords([...words].sort(() => Math.random() - 0.5));
  }, [words]);

  useEffect(() => {
    if (shuffledWords.length > 0) {
      startRound(0);
    }
  }, [shuffledWords]);

  const startRound = (roundIndex: number) => {
    const start = roundIndex * WORDS_PER_ROUND;
    // Eğer kelime kalmazsa doğrudan oyunu bitir (güvenlik)
    if (start >= shuffledWords.length) {
      setGameCompleted(true);
      return;
    }
    
    const roundWords = shuffledWords.slice(start, start + WORDS_PER_ROUND);
    
    const gameCards: Card[] = [];
    roundWords.forEach((word, index) => {
      gameCards.push({
        id: `q-${roundIndex}-${index}`,
        content: word.question,
        matchId: `a-${roundIndex}-${index}`,
        isFlipped: false,
        isMatched: false,
      });
      gameCards.push({
        id: `a-${roundIndex}-${index}`,
        content: word.answer,
        matchId: `q-${roundIndex}-${index}`,
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(gameCards.sort(() => Math.random() - 0.5));
    setRoundCompleted(false);
    setFlippedCards([]);
  };

  const onNextRound = () => {
    if (currentRound + 1 < totalRounds) {
      // Award points for completing a round
      addPoints(15)
        .then(() => toast.success("+15 Yıldız!"))
        .catch(() => {});
        
      setCurrentRound(prev => prev + 1);
      startRound(currentRound + 1);
    } else {
      setGameCompleted(true);
      // Award a larger bonus for completing the entire unit
      addPoints(50)
        .then(() => toast.success("Tebrikler! +50 Yıldız Bonus Kazanıldı!"))
        .catch(() => toast.error("Puan güncellenirken hata oluştu."));
    }
  };

  const onCardClick = (id: string) => {
    if (flippedCards.length === 2 || roundCompleted || gameCompleted) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    if (/[а-яА-ЯёЁ]/.test(card.content)) {
      speak(card.content);
    }

    const newCards = cards.map(c => 
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const firstCard = cards.find(c => c.id === newFlipped[0])!;
      const secondCard = newCards.find(c => c.id === newFlipped[1])!;

      if (firstCard.matchId === secondCard.id) {
        setTimeout(() => {
          const matchedCards = newCards.map(c => 
            c.id === firstCard.id || c.id === secondCard.id 
              ? { ...c, isMatched: true } 
              : c
          );
          setCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(c => c.isMatched)) {
            setRoundCompleted(true);
          }
        }, 500);
      } else {
        setTimeout(() => {
          setCards(cards.map(c => 
            c.id === firstCard.id || c.id === secondCard.id 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  if (gameCompleted) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-8 py-20 text-center">
        <Confetti width={width} height={height} recycle={false} />
        <Star className="h-20 w-20 fill-green-500 text-green-500 animate-bounce" />
        <h1 className="text-3xl font-bold text-neutral-800">Harika İş! +50 Bonus</h1>
        <p className="text-xl text-muted-foreground">
          {unitTitle} kelimelerinin tamamını başarıyla pekiştirdiniz.
        </p>
        <div className="flex w-full max-w-sm flex-col gap-y-3 mt-4">
          <Button size="lg" className="w-full text-lg" onClick={() => router.push("/learn")}>
            Sonraki Üniteye Devam Et
          </Button>
          <Button size="lg" variant="secondary" className="w-full text-lg" onClick={() => router.push("/games")}>
            Menüye Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-y-8 w-full">
      <div className="flex w-full items-center justify-between px-2">
        <p className="text-sm font-bold text-neutral-500 bg-slate-100 px-3 py-1 rounded-full">
          Tur {currentRound + 1} / {totalRounds}
        </p>
        <p className="text-sm font-bold text-green-600 uppercase tracking-widest">
          {unitTitle}
        </p>
      </div>

      {!roundCompleted ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 w-full max-w-4xl mx-auto pb-10">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => onCardClick(card.id)}
              className={cn(
                "flex aspect-square w-full cursor-pointer items-center justify-center rounded-xl border-2 border-b-4 text-center font-bold transition-all active:border-b-2",
                card.isFlipped ? "bg-white border-green-500 text-green-600 shadow-sm" : "bg-green-500 border-green-600 text-white",
                card.isMatched && "bg-green-100 border-green-500 text-green-600 cursor-default opacity-50"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <span className="p-2 text-sm md:text-base leading-tight break-words">{card.content}</span>
              ) : (
                <Star className="h-8 w-8 fill-white text-white opacity-20" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-4 py-12 animate-in fade-in zoom-in duration-300">
          <div className="rounded-full bg-green-100 p-6">
            <Star className="h-12 w-12 fill-green-500 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-700">Harika! +15 Yıldız Kazandınız.</h2>
          <Button size="lg" onClick={onNextRound} className="flex items-center gap-x-2">
            {currentRound + 1 === totalRounds ? "Oyunu Bitir" : "Sonraki Tura Geç"} <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
