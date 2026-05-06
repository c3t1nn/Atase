"use client";

import { useState } from "react";
import Image from "next/image";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookModal } from "@/components/modals/book-modal";

type Book = {
  id: number;
  title: string;
  turkishTitle: string;
  description: string;
  unitRequired: number;
  content: { russian: string; turkish: string }[];
};

type LibraryListProps = {
  books: Book[];
  userPoints: number;
};

export const LibraryList = ({ books, userPoints }: LibraryListProps) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {books
          .sort((a, b) => a.unitRequired - b.unitRequired)
          .map((book) => {
          return (
            <div
              key={book.id}
              onClick={() => onOpen(book)}
              className="relative flex flex-col items-center rounded-2xl border-2 border-b-4 p-6 hover:bg-gray-100 transition cursor-pointer group"
            >
              <div className={cn(
                "mb-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter",
                book.unitRequired === 1 ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
              )}>
                {book.unitRequired === 1 ? "Başlangıç (A1.1)" : "Temel (A1.2)"}
              </div>

              <div className="mb-4 h-48 w-full bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm flex items-center justify-center overflow-hidden border-2 border-purple-200 group-hover:scale-[1.02] transition-transform">
                 <span className="text-7xl drop-shadow-sm">📖</span>
              </div>
              
              <h3 className="text-xl font-bold text-neutral-700">{book.title}</h3>
              <p className="text-sm text-neutral-500 font-semibold mb-2">{book.turkishTitle}</p>
              <p className="text-xs text-muted-foreground text-center line-clamp-2">
                {book.description}
              </p>
              
              <Button 
                className="mt-4 w-full" 
                variant="primary"
              >
                Şimdi Oku
              </Button>
            </div>
          );
        })}
      </div>

      <BookModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        book={selectedBook} 
      />
    </>
  );
};
