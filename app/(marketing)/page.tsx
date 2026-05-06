import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  Show,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero_bear_v3.png" alt="Ataşe Maskot" fill style={{objectFit: "contain", mixBlendMode: "multiply"}} />
      </div>

      <div className="flex flex-col items-center gap-y-4">
        <div className="relative bg-white border-2 border-neutral-200 rounded-3xl p-6 shadow-xl animate-float mb-6 max-w-[320px]">
          <p className="text-xl lg:text-2xl font-bold text-neutral-600 text-center leading-tight tracking-tight">
            Привет! Ben Ataşe, <br />
            haydi Rusça öğrenelim.
          </p>
          {/* Bubble tail - pointing left towards the bear */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l-2 border-b-2 border-neutral-200 rotate-45" />
        </div>

        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>

          <ClerkLoaded>
            <Show when="signed-in">
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">Öğrenmeye Devam Et</Link>
              </Button>
            </Show>

            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg" variant="secondary" className="w-full">
                  Hemen Başla
                </Button>
              </SignUpButton>

              <SignInButton mode="modal">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  Zaten hesabım var
                </Button>
              </SignInButton>
            </Show>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
