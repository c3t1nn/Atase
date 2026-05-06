"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { upsertUserProgress } from "@/actions/user-progress";
import { Loader } from "lucide-react";

type AutoJoinCourseProps = {
  courseId: number;
};

export const AutoJoinCourse = ({ courseId }: AutoJoinCourseProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      upsertUserProgress(courseId)
        .catch(() => {
          // Buradaki hata genellikle redirect kaynaklıdır, kullanıcıya yansıtmaya gerek yok.
        });
    });
  }, [courseId, router]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader className="h-10 w-10 animate-spin text-muted-foreground" />
    </div>
  );
};
