"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[40vh] max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      {error.digest && (
        <p className="font-mono text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
