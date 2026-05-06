"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BookModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book: {
    title: string;
    content: { russian: string; turkish: string }[];
  } | null;
};

export const BookModal = ({ isOpen, onClose, book }: BookModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Reset page when book changes
  useEffect(() => {
    if (isOpen) setCurrentPage(0);
  }, [isOpen]);

  if (!book) return null;

  const totalPages = book.content.length;
  const progress = ((currentPage + 1) / totalPages) * 100;

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[85vh] p-0 overflow-hidden border-none bg-transparent shadow-none">
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-50 p-2 rounded-full bg-white/20 hover:bg-white/40 transition text-white"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Real Book UI */}
          <div className="w-full max-w-2xl bg-[#fdfbf7] rounded-lg shadow-2xl flex flex-col overflow-hidden border-8 border-[#e8e4d8] h-[70vh]">
            
            {/* Page Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <p className="text-2xl md:text-3xl font-serif text-neutral-800 leading-relaxed italic">
                   "{book.content[currentPage].russian}"
                </p>
                <div className="h-px w-20 bg-purple-200 mx-auto" />
                <p className="text-base md:text-lg text-neutral-500 font-medium leading-relaxed">
                  {book.content[currentPage].turkish}
                </p>
              </div>
            </div>

            {/* Footer / Controls */}
            <div className="h-20 border-t border-[#e8e4d8] bg-[#f7f3e8] flex items-center justify-between px-8">
              <Button 
                variant="ghost" 
                onClick={prevPage} 
                disabled={currentPage === 0}
                className="text-purple-600 disabled:opacity-30"
              >
                <ChevronLeft className="h-6 w-6 mr-2" />
                Geri
              </Button>

              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                   {currentPage + 1} / {totalPages}
                </span>
                <div className="w-32 h-1.5 bg-neutral-200 rounded-full mt-2 overflow-hidden">
                   <div 
                    className="h-full bg-purple-500 transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                   />
                </div>
              </div>

              <Button 
                variant="ghost" 
                onClick={currentPage === totalPages - 1 ? onClose : nextPage}
                className="text-purple-600"
              >
                {currentPage === totalPages - 1 ? "Bitir" : "İleri"}
                {currentPage !== totalPages - 1 && <ChevronRight className="h-6 w-6 ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
