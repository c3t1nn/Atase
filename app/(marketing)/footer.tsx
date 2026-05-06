import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center text-slate-400 text-xs lg:text-sm">
        <p>© 2026 Rusça Sözünün Diplomatları Proje Yarışması</p>
        <p className="font-semibold">Çetin Karakulak & Sena Karakulak</p>
      </div>
    </div>
  );
};
