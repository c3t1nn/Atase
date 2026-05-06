import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Ataşe",
  description:
    "Interactive platform for language learning with lessons, quizzes, and progress tracking.",
  icons: [
    {
      url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐻</text></svg>",
      href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐻</text></svg>",
    },
  ],
  keywords: [
    "reactjs",
    "nextjs",
    "vercel",
    "react",
    "duolingo-clone",
    "learn-language",
    "shadcn",
    "shadcn-ui",
    "radix-ui",
    "cn",
    "clsx",
    "lingo",
    "postgresql",
    "sonner",
    "drizzle",
    "zustand",
    "mysql",
    "lucide-react",
    "clerk-themes",
    "clerk",
    "postcss",
    "prettier",
    "react-dom",
    "tailwindcss",
    "tailwindcss-animate",
    "ui/ux",
    "js",
    "javascript",
    "typescript",
    "eslint",
    "html",
    "css",
  ] as Array<string>,
  authors: {
    name: "Çetin Karakulak & Sena Karakulak",
    url: "https://atase.com",
  },
} as const;

export const links = {
  sourceCode: "https://atase.com",
  email: "iletisim@atase.com",
} as const;
